package com.djp.backend;

import com.djp.backend.model.User;
import com.djp.backend.repository.*;
import com.djp.backend.security.JwtTokenProvider;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
public class DiscussionAndPollIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private com.djp.backend.service.SqlFilePersistenceService sqlFilePersistenceService;

    @AfterEach
    public void cleanup() {
        auditLogRepository.deleteAll();
        discussionRepository.deleteAll();
        pollRepository.deleteAll();
        issueRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    public void getAllDiscussions_returns200() throws Exception {
        mockMvc.perform(get("/djp/api/v1/discussions")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void createDiscussion_validInput_returns201() throws Exception {
        User user = new User("jane.discussion." + java.util.UUID.randomUUID() + "@example.com", "Jane Doe", "GOOGLE", java.util.UUID.randomUUID().toString());
        user = userRepository.save(user);
        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());

        String json = "{\n" +
                "  \"title\": \"Sustainable Multi-level Parking?\",\n" +
                "  \"description\": \"Let us discuss solutions for Ward 12.\",\n" +
                "  \"category\": \"Infrastructure\"\n" +
                "}";

        mockMvc.perform(post("/djp/api/v1/discussions")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.title").value("Sustainable Multi-level Parking?"));
    }

    @Test
    public void getAllPolls_returns200() throws Exception {
        mockMvc.perform(get("/djp/api/v1/polls")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void createPoll_validInput_returns201() throws Exception {
        User user = new User("jane.poll." + java.util.UUID.randomUUID() + "@example.com", "Jane Doe", "GOOGLE", java.util.UUID.randomUUID().toString());
        user = userRepository.save(user);
        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());

        String json = "{\n" +
                "  \"question\": \"Should Ward 12 implement No Car Sundays?\",\n" +
                "  \"description\": \"A 6-month pilot program.\",\n" +
                "  \"category\": \"Environment\",\n" +
                "  \"optionsJson\": \"[{\\\"label\\\":\\\"Yes\\\",\\\"pct\\\":50},{\\\"label\\\":\\\"No\\\",\\\"pct\\\":50}]\"\n" +
                "}";

        mockMvc.perform(post("/djp/api/v1/polls")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.question").value("Should Ward 12 implement No Car Sundays?"));
    }

    @Test
    public void createDiscussion_appendsToSqlFile() throws Exception {
        User user = new User("sql.disc." + java.util.UUID.randomUUID() + "@example.com", "SQL Tester", "GOOGLE", java.util.UUID.randomUUID().toString());
        user = userRepository.save(user);
        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());

        String uniqueTitle = "SQL Auto-Append Discussion " + java.util.UUID.randomUUID();
        String json = "{\n" +
                "  \"title\": \"" + uniqueTitle + "\",\n" +
                "  \"description\": \"Testing SQL file persistence.\",\n" +
                "  \"category\": \"Technology\"\n" +
                "}";

        java.nio.file.Path[] paths = {
                java.nio.file.Path.of("src/main/resources/data/discussions.sql"),
                java.nio.file.Path.of("target/classes/data/discussions.sql"),
                java.nio.file.Path.of("src/main/resources/data/users.sql"),
                java.nio.file.Path.of("target/classes/data/users.sql")
        };
        String[] origContents = new String[paths.length];
        for (int i = 0; i < paths.length; i++) {
            origContents[i] = java.nio.file.Files.exists(paths[i]) ? java.nio.file.Files.readString(paths[i]) : "";
        }

        try {
            sqlFilePersistenceService.setEnabled(true);
            mockMvc.perform(post("/djp/api/v1/discussions")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json))
                    .andExpect(status().isCreated());

            String updatedContent = java.nio.file.Files.readString(paths[0]);
            org.junit.jupiter.api.Assertions.assertTrue(updatedContent.contains(uniqueTitle), "discussions.sql should contain the new discussion title");
        } finally {
            sqlFilePersistenceService.setEnabled(false);
            for (int i = 0; i < paths.length; i++) {
                if (java.nio.file.Files.exists(paths[i]) && !origContents[i].isEmpty()) {
                    java.nio.file.Files.writeString(paths[i], origContents[i]);
                }
            }
        }
    }

    @Test
    public void createPoll_appendsToSqlFile() throws Exception {
        User user = new User("sql.poll." + java.util.UUID.randomUUID() + "@example.com", "SQL Tester", "GOOGLE", java.util.UUID.randomUUID().toString());
        user = userRepository.save(user);
        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());

        String uniqueQuestion = "SQL Auto-Append Poll " + java.util.UUID.randomUUID();
        String json = "{\n" +
                "  \"question\": \"" + uniqueQuestion + "\",\n" +
                "  \"description\": \"Testing SQL file persistence.\",\n" +
                "  \"category\": \"Technology\",\n" +
                "  \"optionsJson\": \"[{\\\"label\\\":\\\"Yes\\\",\\\"pct\\\":50},{\\\"label\\\":\\\"No\\\",\\\"pct\\\":50}]\"\n" +
                "}";

        java.nio.file.Path[] paths = {
                java.nio.file.Path.of("src/main/resources/data/polls.sql"),
                java.nio.file.Path.of("target/classes/data/polls.sql"),
                java.nio.file.Path.of("src/main/resources/data/users.sql"),
                java.nio.file.Path.of("target/classes/data/users.sql")
        };
        String[] origContents = new String[paths.length];
        for (int i = 0; i < paths.length; i++) {
            origContents[i] = java.nio.file.Files.exists(paths[i]) ? java.nio.file.Files.readString(paths[i]) : "";
        }

        try {
            sqlFilePersistenceService.setEnabled(true);
            mockMvc.perform(post("/djp/api/v1/polls")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json))
                    .andExpect(status().isCreated());

            String updatedContent = java.nio.file.Files.readString(paths[0]);
            org.junit.jupiter.api.Assertions.assertTrue(updatedContent.contains(uniqueQuestion), "polls.sql should contain the new poll question");
        } finally {
            sqlFilePersistenceService.setEnabled(false);
            for (int i = 0; i < paths.length; i++) {
                if (java.nio.file.Files.exists(paths[i]) && !origContents[i].isEmpty()) {
                    java.nio.file.Files.writeString(paths[i], origContents[i]);
                }
            }
        }
    }
}
