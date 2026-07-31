package com.djp.backend.dto;

import jakarta.validation.constraints.Size;

public record PetitionUpdateRequestDto(
    @Size(max = 255, message = "Title must not exceed 255 characters")
    String title,

    @Size(max = 10000, message = "Description must not exceed 10000 characters")
    String description,

    @Size(max = 50, message = "Category must not exceed 50 characters")
    String category,

    @Size(max = 150, message = "Target authority must not exceed 150 characters")
    String targetAuthority,

    Integer signatureGoal
) {}
