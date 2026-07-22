package com.djp.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Payload required to report a new civic issue across municipal wards.")
public record IssueCreateRequestDto(
    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    @Schema(description = "Concise summary of the civic issue", example = "Broken Streetlight near Ward 12 Market")
    String title,

    @NotBlank(message = "Description is required")
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    @Schema(description = "Detailed explanation of the issue, safety hazards, and impact", example = "Streetlight pillar #44 has been blinking and sparking at night, causing safety hazards.")
    String description,

    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category must not exceed 50 characters")
    @Schema(description = "Domain classification category", example = "Electricity")
    String category,

    @NotBlank(message = "Priority is required")
    @Size(max = 20, message = "Priority must not exceed 20 characters")
    @Schema(description = "Reported priority severity level", example = "HIGH")
    String priority,

    @Size(max = 150, message = "Location must not exceed 150 characters")
    @Schema(description = "Specific street, landmark, or ward location", example = "Ward 12 Market Square")
    String location
) {}
