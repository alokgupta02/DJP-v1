package com.djp.backend;

import com.djp.backend.model.User;
import com.djp.backend.repository.*;
import com.djp.backend.security.JwtTokenProvider;

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
@SuppressWarnings("null")
public class DiscussionAndPollIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private com.djp.backend.service.SqlFilePersistenceService sqlFilePersistenceService;


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
                .andExpect(jsonPath("$.data.id").exists())
                .andExpect(jsonPath("$.data.title").value("Sustainable Multi-level Parking?"));
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
                .andExpect(jsonPath("$.data.id").exists())
                .andExpect(jsonPath("$.data.question").value("Should Ward 12 implement No Car Sundays?"));
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

        // SqlFilePersistenceService now only writes to target/classes/data/ (never src/)
        java.nio.file.Path targetDisc = java.nio.file.Path.of("target/classes/data/discussions.sql");
        java.nio.file.Path targetUsers = java.nio.file.Path.of("target/classes/data/users.sql");
        String origDisc = java.nio.file.Files.exists(targetDisc) ? java.nio.file.Files.readString(targetDisc) : "";
        String origUsers = java.nio.file.Files.exists(targetUsers) ? java.nio.file.Files.readString(targetUsers) : "";

        try {
            sqlFilePersistenceService.setEnabled(true);
            mockMvc.perform(post("/djp/api/v1/discussions")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json))
                    .andExpect(status().isCreated());

            String updatedContent = java.nio.file.Files.readString(targetDisc);
            org.junit.jupiter.api.Assertions.assertTrue(updatedContent.contains(uniqueTitle), "target/classes/data/discussions.sql should contain the new discussion title");
        } finally {
            sqlFilePersistenceService.setEnabled(false);
            if (java.nio.file.Files.exists(targetDisc) && !origDisc.isEmpty()) {
                java.nio.file.Files.writeString(targetDisc, origDisc);
            }
            if (java.nio.file.Files.exists(targetUsers) && !origUsers.isEmpty()) {
                java.nio.file.Files.writeString(targetUsers, origUsers);
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

        // SqlFilePersistenceService now only writes to target/classes/data/ (never src/)
        java.nio.file.Path targetPolls = java.nio.file.Path.of("target/classes/data/polls.sql");
        java.nio.file.Path targetUsers = java.nio.file.Path.of("target/classes/data/users.sql");
        String origPolls = java.nio.file.Files.exists(targetPolls) ? java.nio.file.Files.readString(targetPolls) : "";
        String origUsers = java.nio.file.Files.exists(targetUsers) ? java.nio.file.Files.readString(targetUsers) : "";

        try {
            sqlFilePersistenceService.setEnabled(true);
            mockMvc.perform(post("/djp/api/v1/polls")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json))
                    .andExpect(status().isCreated());

            String updatedContent = java.nio.file.Files.readString(targetPolls);
            org.junit.jupiter.api.Assertions.assertTrue(updatedContent.contains(uniqueQuestion), "target/classes/data/polls.sql should contain the new poll question");
        } finally {
            sqlFilePersistenceService.setEnabled(false);
            if (java.nio.file.Files.exists(targetPolls) && !origPolls.isEmpty()) {
                java.nio.file.Files.writeString(targetPolls, origPolls);
            }
            if (java.nio.file.Files.exists(targetUsers) && !origUsers.isEmpty()) {
                java.nio.file.Files.writeString(targetUsers, origUsers);
            }
        }
    }
}
