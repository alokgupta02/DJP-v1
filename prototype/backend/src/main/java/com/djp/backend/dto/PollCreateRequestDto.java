package com.djp.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PollCreateRequestDto(
        @NotBlank(message = "Question is required")
        @Size(max = 255, message = "Question must not exceed 255 characters")
        String question,

        @NotBlank(message = "Description is required")
        @Size(max = 2000, message = "Description must not exceed 2000 characters")
        String description,

        @NotBlank(message = "Category is required")
        @Size(max = 50, message = "Category must not exceed 50 characters")
        String category,

        String optionsJson
) {}
