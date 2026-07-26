package com.djp.backend;

import com.djp.backend.model.User;
import com.djp.backend.repository.IssueRepository;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.security.JwtTokenProvider;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
public class IssueIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private com.djp.backend.repository.AuditLogRepository auditLogRepository;

    @Autowired
    private com.djp.backend.repository.DiscussionRepository discussionRepository;

    @Autowired
    private com.djp.backend.repository.PollRepository pollRepository;

    @Autowired
    private com.djp.backend.service.SqlFilePersistenceService sqlFilePersistenceService;


    @Test
    public void createIssue_invalidInput_returns400() throws Exception {
        User user = new User("jane.issue.invalid." + java.util.UUID.randomUUID() + "@example.com", "Jane Doe", "GOOGLE", java.util.UUID.randomUUID().toString());
        user = userRepository.save(user);
        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());

        // Empty body or missing fields should trigger validation error
        String invalidJson = "{\"title\":\"\", \"description\":\"\", \"category\":\"\", \"priority\":\"\"}";

        mockMvc.perform(post("/djp/api/v1/issues")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void createIssue_validInput_returns201() throws Exception {
        User user = new User("jane.issue.valid." + java.util.UUID.randomUUID() + "@example.com", "Jane Doe", "GOOGLE", java.util.UUID.randomUUID().toString());
        user = userRepository.save(user);
        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());

        String validJson = "{\n" +
                "  \"title\": \"Water leakage in ward 12\",\n" +
                "  \"description\": \"There is a broken pipeline causing water waste.\",\n" +
                "  \"category\": \"Water\",\n" +
                "  \"priority\": \"HIGH\",\n" +
                "  \"location\": \"Ward 12\"\n" +
                "}";

        mockMvc.perform(post("/djp/api/v1/issues")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(validJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.title").value("Water leakage in ward 12"))
                .andExpect(jsonPath("$.status").value("REPORTED"));

        // Assert that the mutation was audited
        org.junit.jupiter.api.Assertions.assertEquals(1, auditLogRepository.count());
        com.djp.backend.model.AuditLog auditLog = auditLogRepository.findAll().get(0);
        org.junit.jupiter.api.Assertions.assertEquals(user.getId().toString(), auditLog.getUserId());
        org.junit.jupiter.api.Assertions.assertEquals("CREATE_ISSUE", auditLog.getAction());
        org.junit.jupiter.api.Assertions.assertEquals("Issue", auditLog.getTargetType());
    }

    @Test
    public void createIssue_appendsToSqlFile() throws Exception {
        User user = new User("sql.issue." + java.util.UUID.randomUUID() + "@example.com", "SQL Tester", "GOOGLE", java.util.UUID.randomUUID().toString());
        user = userRepository.save(user);
        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());

        String uniqueTitle = "SQL Auto-Append Issue " + java.util.UUID.randomUUID();
        String validJson = "{\n" +
                "  \"title\": \"" + uniqueTitle + "\",\n" +
                "  \"description\": \"Testing SQL file persistence.\",\n" +
                "  \"category\": \"Water\",\n" +
                "  \"priority\": \"HIGH\",\n" +
                "  \"location\": \"Ward 12\"\n" +
                "}";

        // SqlFilePersistenceService now only writes to target/classes/data/ (never src/)
        java.nio.file.Path targetIssues = java.nio.file.Path.of("target/classes/data/issues.sql");
        java.nio.file.Path targetUsers = java.nio.file.Path.of("target/classes/data/users.sql");
        String origIssues = java.nio.file.Files.exists(targetIssues) ? java.nio.file.Files.readString(targetIssues) : "";
        String origUsers = java.nio.file.Files.exists(targetUsers) ? java.nio.file.Files.readString(targetUsers) : "";

        try {
            sqlFilePersistenceService.setEnabled(true);
            mockMvc.perform(post("/djp/api/v1/issues")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(validJson))
                    .andExpect(status().isCreated());

            String updatedContent = java.nio.file.Files.readString(targetIssues);
            org.junit.jupiter.api.Assertions.assertTrue(updatedContent.contains(uniqueTitle), "target/classes/data/issues.sql should contain the new issue title");
        } finally {
            sqlFilePersistenceService.setEnabled(false);
            // Restore original target files to avoid polluting other tests
            if (java.nio.file.Files.exists(targetIssues) && !origIssues.isEmpty()) {
                java.nio.file.Files.writeString(targetIssues, origIssues);
            }
            if (java.nio.file.Files.exists(targetUsers) && !origUsers.isEmpty()) {
                java.nio.file.Files.writeString(targetUsers, origUsers);
            }
        }
    }
}
