package com.djp.backend;

import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.security.JwtTokenProvider;
import org.junit.jupiter.api.AfterEach;
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

    @AfterEach
    public void cleanup() {
        userRepository.deleteAll();
    }

    @Test
    public void getMe_withoutToken_returns401() throws Exception {
        mockMvc.perform(get("/djp/api/v1/auth/me")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void getMe_withValidToken_returnsUserDto() throws Exception {
        User user = new User("jane.doe@example.com", "Jane Doe", "GOOGLE", "12345");
        user.setRole("CITIZEN");
        user = userRepository.save(user);

        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());

        mockMvc.perform(get("/djp/api/v1/auth/me")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(user.getId().toString()))
                .andExpect(jsonPath("$.email").value("jane.doe@example.com"))
                .andExpect(jsonPath("$.fullName").value("Jane Doe"))
                .andExpect(jsonPath("$.role").value("CITIZEN"));
    }

    @Test
    public void initiateGoogleLogin_returnsRedirectDetails() throws Exception {
        mockMvc.perform(get("/djp/api/v1/auth/google")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.provider").value("google"))
                .andExpect(jsonPath("$.redirectUrl").value("/oauth2/authorization/google"));
    }

    @Test
    public void initiateGithubLogin_returnsRedirectDetails() throws Exception {
        mockMvc.perform(get("/djp/api/v1/auth/github")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.provider").value("github"))
                .andExpect(jsonPath("$.redirectUrl").value("/oauth2/authorization/github"));
    }

    @Test
    public void devLogin_returnsTokenAndUserDto() throws Exception {
        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post("/djp/api/v1/auth/dev-login?email=test.dev@djp.org")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.user.email").value("test.dev@djp.org"))
                .andExpect(jsonPath("$.user.role").value("CITIZEN"));
    }
}
