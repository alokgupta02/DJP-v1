package com.djp.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class InteractionIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private com.djp.backend.repository.UserRepository userRepository;

    @Autowired
    private com.djp.backend.security.JwtTokenProvider jwtTokenProvider;

    private String getTestToken() {
        com.djp.backend.model.User user = new com.djp.backend.model.User("test.interaction." + java.util.UUID.randomUUID() + "@example.com", "Test User", "GOOGLE", java.util.UUID.randomUUID().toString());
        user = userRepository.save(user);
        return jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());
    }

    @Test
    public void testCreateCommentAndFetchThread() throws Exception {
        String token = getTestToken();

        String commentPayload = """
            {
                "entityId": "e0000000-0000-0000-0000-000000000001",
                "entityType": "ISSUE",
                "content": "This is a test comment"
            }
            """;

        // POST /api/v1/interactions/comments
        mockMvc.perform(post("/djp/api/v1/interactions/comments")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(commentPayload))
                .andExpect(status().isOk());
        
        // Fetch comments for issue
        mockMvc.perform(get("/djp/api/v1/interactions/comments?entityId=e0000000-0000-0000-0000-000000000001&entityType=ISSUE"))
                .andExpect(status().isOk());
    }

    @Test
    public void testVoteAndFollow() throws Exception {
        String token = getTestToken();

        String votePayload = """
            {
                "entityId": "e0000000-0000-0000-0000-000000000001",
                "entityType": "ISSUE",
                "value": 1
            }
            """;

        mockMvc.perform(post("/djp/api/v1/interactions/votes")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(votePayload))
                .andExpect(status().isOk());

        String followPayload = """
            {
                "targetId": "c82b82ab-e0e0-4182-b50a-f2d391fb3296",
                "targetType": "USER"
            }
            """;

        mockMvc.perform(post("/djp/api/v1/interactions/follows")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(followPayload))
                .andExpect(status().isOk());
    }
}
