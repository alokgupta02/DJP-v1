package com.djp.backend;

import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.security.JwtTokenProvider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.UUID;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
public class AuthIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private com.djp.backend.repository.IssueRepository issueRepository;

    @Autowired
    private com.djp.backend.repository.AuditLogRepository auditLogRepository;

    @Autowired
    private com.djp.backend.repository.DiscussionRepository discussionRepository;

    @Autowired
    private com.djp.backend.repository.PollRepository pollRepository;


    @Test
    public void getMe_withoutToken_returns401() throws Exception {
        mockMvc.perform(get("/djp/api/v1/auth/me")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void getMe_withValidToken_returnsUserDto() throws Exception {
        String email = "jane.auth." + java.util.UUID.randomUUID() + "@example.com";
        User user = new User(email, "Jane Doe", "GOOGLE", java.util.UUID.randomUUID().toString());
        user.setRole("CITIZEN");
        user = userRepository.save(user);

        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());

        mockMvc.perform(get("/djp/api/v1/auth/me")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(user.getId().toString()))
                .andExpect(jsonPath("$.data.email").value(email))
                .andExpect(jsonPath("$.data.fullName").value("Jane Doe"))
                .andExpect(jsonPath("$.data.role").value("CITIZEN"));
    }

    @Test
    public void initiateGoogleLogin_returnsRedirectDetails() throws Exception {
        mockMvc.perform(get("/djp/api/v1/auth/google")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.provider").value("google"))
                .andExpect(jsonPath("$.data.redirectUrl").value("/oauth2/authorization/google"));
    }

    @Test
    public void initiateGithubLogin_returnsRedirectDetails() throws Exception {
        mockMvc.perform(get("/djp/api/v1/auth/github")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.provider").value("github"))
                .andExpect(jsonPath("$.data.redirectUrl").value("/oauth2/authorization/github"));
    }
}
