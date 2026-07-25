package com.djp.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;

@Schema(description = "Citizen profile data transfer object returned on authentication and profile queries.")
public record UserDto(
    @Schema(description = "Unique citizen UUID", example = "990671fe-24d5-480f-9da5-76352b8cefd4")
    UUID id,

    @Schema(description = "Registered citizen or developer email address", example = "citizen@djp.org")
    String email,

    @Schema(description = "Full name of the citizen", example = "Citizen User")
    String fullName,

    @Schema(description = "Optional profile avatar image URL", example = "https://cdn.djp.org/avatars/citizen.png")
    String avatarUrl,

    @Schema(description = "Role inside DJP platform (`CITIZEN`, `LEADER`, `ADMIN`, `DEV`)", example = "CITIZEN")
    String role
) {}
