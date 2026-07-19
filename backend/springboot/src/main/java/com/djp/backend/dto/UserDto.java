package com.djp.backend.dto;

import java.util.UUID;

public record UserDto(
    UUID id,
    String email,
    String fullName,
    String avatarUrl,
    String role
) {}
