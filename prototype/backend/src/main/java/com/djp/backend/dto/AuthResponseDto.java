package com.djp.backend.dto;

public record AuthResponseDto(
    String accessToken,
    String refreshToken,
    UserDto user
) {}
