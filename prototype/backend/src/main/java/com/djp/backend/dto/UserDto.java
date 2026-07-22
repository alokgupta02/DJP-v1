package com.djp.backend.dto;

import com.djp.backend.model.User;
import java.util.UUID;

public record UserDto(
    UUID id,
    String email,
    String fullName,
    String avatarUrl,
    String role,
    String location,
    String pincode,
    String occupation,
    String bio,
    String topics,
    Boolean onboardingCompleted,
    Integer reputationScore
) {
    public static UserDto fromEntity(User user) {
        if (user == null) return null;
        return new UserDto(
            user.getId(),
            user.getEmail(),
            user.getName(),
            null,
            user.getRole(),
            user.getLocation(),
            user.getPincode(),
            user.getOccupation(),
            user.getBio(),
            user.getTopics(),
            user.getOnboardingCompleted(),
            user.getReputationScore()
        );
    }
}
