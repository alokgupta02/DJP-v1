package com.djp.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record IssueCreateRequestDto(
        @NotBlank(message = "Title is required")
        @Size(max = 255, message = "Title must not exceed 255 characters")
        String title,

        @NotBlank(message = "Description is required")
        @Size(max = 2000, message = "Description must not exceed 2000 characters")
        String description,

        @NotBlank(message = "Category is required")
        @Size(max = 50, message = "Category must not exceed 50 characters")
        String category,

        @NotBlank(message = "Priority is required")
        @Size(max = 20, message = "Priority must not exceed 20 characters")
        String priority,

        @Size(max = 150, message = "Location must not exceed 150 characters")
        String location,

        Double latitude,
        Double longitude,

        @Size(max = 50, message = "GovLevel must not exceed 50 characters")
        String govLevel
) {}
