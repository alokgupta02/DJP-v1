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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SuppressWarnings("null")
public class ProfileIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    @Test
    public void getProfile_returnsProfileData() throws Exception {
        User user = new User("citizen1@djp.org", "Citizen", "DEV", UUID.randomUUID().toString());
        user.setRole("CITIZEN");
        user.setBio("Initial bio");
        user = userRepository.save(user);

        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());

        mockMvc.perform(get("/djp/api/v1/profiles/" + user.getId())
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(user.getId().toString()))
                .andExpect(jsonPath("$.data.bio").value("Initial bio"));
    }

    @Test
    public void updateProfile_withValidToken_updatesProfile() throws Exception {
        User user = new User("citizen2@djp.org", "Citizen", "DEV", UUID.randomUUID().toString());
        user.setRole("CITIZEN");
        user = userRepository.save(user);

        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());

        String requestJson = """
                {
                  "bio": "Updated bio text",
                  "occupation": "Teacher",
                  "topics": ["Education", "Roads"]
                }
                """;

        mockMvc.perform(patch("/djp/api/v1/profiles/" + user.getId())
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(user.getId().toString()))
                .andExpect(jsonPath("$.data.bio").value("Updated bio text"))
                .andExpect(jsonPath("$.data.occupation").value("Teacher"))
                .andExpect(jsonPath("$.data.topics").value("Education, Roads"));
    }
}
