package com.djp.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record ToggleVoteRequest(
    @NotNull UUID entityId,
    @NotBlank String entityType,
    int value
) {}
