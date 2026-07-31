package com.djp.backend.dto;

import com.djp.backend.model.User;
import java.util.UUID;

public record ProfileDto(
    UUID id,
    String fullName,
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
    Boolean onboardingCompleted
) {
    public static ProfileDto fromEntity(User user) {
        if (user == null) return null;
        return new ProfileDto(
            user.getId(),
            user.getName(),
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
            user.getOnboardingCompleted()
        );
    }
}
