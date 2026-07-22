package com.djp.backend.dto;

import java.util.List;

public record OnboardingUpdateRequestDto(
    String name,
    String location,
    String pincode,
    String occupation,
    String bio,
    List<String> topics,
    Boolean privacyConsentGiven
) {}
