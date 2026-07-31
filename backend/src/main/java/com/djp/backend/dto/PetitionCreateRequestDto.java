package com.djp.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;

public record PetitionCreateRequestDto(
    @NotBlank(message = "Title is required")
    String title,

    @NotBlank(message = "Description is required")
    String description,

    String category,

    @Min(value = 1, message = "Signature goal must be at least 1")
    int signatureGoal,

    @NotBlank(message = "Target authority is required")
    String targetAuthority
) {}
