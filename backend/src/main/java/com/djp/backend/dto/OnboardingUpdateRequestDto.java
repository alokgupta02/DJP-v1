package com.djp.backend.dto;

import java.util.List;

public record OnboardingUpdateRequestDto(
    String name,
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
    List<String> topics,
    Boolean privacyConsentGiven
) {}
