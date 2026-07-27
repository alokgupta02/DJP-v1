package com.djp.backend;

import com.djp.backend.dto.OnboardingUpdateRequestDto;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.security.JwtTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
public class UserOnboardingIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private com.djp.backend.repository.IssueRepository issueRepository;

    @Autowired
    private com.djp.backend.repository.AuditLogRepository auditLogRepository;

    @Autowired
    private com.djp.backend.repository.DiscussionRepository discussionRepository;

    @Autowired
    private com.djp.backend.repository.PollRepository pollRepository;


    @Test
    public void completeOnboarding_withValidToken_updatesUserAndReturns200() throws Exception {
        User user = new User("citizen@djp.org", "Citizen", "DEV", "dev-citizen");
        user.setRole("CITIZEN");
        user = userRepository.save(user);

        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());

        OnboardingUpdateRequestDto dto = new OnboardingUpdateRequestDto(
                "Citizen Updated",
                "1990-01-01",
                "Male",
                "9876543210",
                "Ward 12, Indrapuri, Bhopal",
                "462021",
                "India",
                "Madhya Pradesh",
                "Bhopal",
                "Bhopal",
                "Indrapuri",
                "Ward 12",
                "Bhopal South",
                "Software Engineer",
                "Passionate about civic transparency and clean roads.",
                List.of("Roads", "Water Supply", "Digital Governance"),
                true
        );

        mockMvc.perform(patch("/djp/api/v1/users/" + user.getId() + "/onboarding")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(user.getId().toString()))
                .andExpect(jsonPath("$.data.fullName").value("Citizen Updated"))
                .andExpect(jsonPath("$.data.location").value("Ward 12, Indrapuri, Bhopal"))
                .andExpect(jsonPath("$.data.pincode").value("462021"))
                .andExpect(jsonPath("$.data.occupation").value("Software Engineer"))
                .andExpect(jsonPath("$.data.bio").value("Passionate about civic transparency and clean roads."))
                .andExpect(jsonPath("$.data.topics").value("Roads, Water Supply, Digital Governance"))
                .andExpect(jsonPath("$.data.onboardingCompleted").value(true));
    }

    @Test
    public void completeOnboarding_withoutToken_returns401() throws Exception {
        OnboardingUpdateRequestDto dto = new OnboardingUpdateRequestDto(
                "Citizen Updated",
                "1990-01-01",
                "Male",
                "9876543210",
                "Bhopal",
                "462021",
                "India",
                "Madhya Pradesh",
                "Bhopal",
                "Bhopal",
                "Indrapuri",
                "Ward 12",
                "Bhopal South",
                "Engineer",
                "Bio",
                List.of("Roads"),
                true
        );

        mockMvc.perform(patch("/djp/api/v1/users/" + UUID.randomUUID() + "/onboarding")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isUnauthorized());
    }
}
