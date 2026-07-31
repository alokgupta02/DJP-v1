package com.djp.backend.dto;

import com.djp.backend.model.User;
import java.util.UUID;

public record UserDto(
    UUID id,
    String email,
    String fullName,
    String avatarUrl,
    String role,
    String dob,
    String gender,
    String phoneNumber,
    String location,
    String pincode,
    String country,
    String state,
    String district,
    String city,
    String locality,
    String ward,
    String constituency,
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
            user.getDob(),
            user.getGender(),
            user.getPhoneNumber(),
            user.getLocation(),
            user.getPincode(),
            user.getCountry(),
            user.getState(),
            user.getDistrict(),
            user.getCity(),
            user.getLocality(),
            user.getWard(),
            user.getConstituency(),
            user.getOccupation(),
            user.getBio(),
            user.getTopics(),
            user.getOnboardingCompleted(),
            user.getReputationScore()
        );
    }
}
