package com.djp.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class NotificationIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private com.djp.backend.repository.UserRepository userRepository;

    @Autowired
    private com.djp.backend.security.JwtTokenProvider jwtTokenProvider;

    private String getTestToken() {
        com.djp.backend.model.User user = new com.djp.backend.model.User("test.notification." + java.util.UUID.randomUUID() + "@example.com", "Test User", "GOOGLE", java.util.UUID.randomUUID().toString());
        user = userRepository.save(user);
        return jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());
    }

    @Test
    public void testFetchNotifications() throws Exception {
        String token = getTestToken();

        // GET /api/v1/notifications
        mockMvc.perform(get("/djp/api/v1/notifications")
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
        
        // GET /api/v1/notifications/unread-count
        mockMvc.perform(get("/djp/api/v1/notifications/unread-count")
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }
}
