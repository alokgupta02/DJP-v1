package com.djp.backend.dto;

import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import java.util.List;

public record PollUpdateRequestDto(
        @Size(max = 255, message = "Question must not exceed 255 characters")
        String question,
        
        @Size(max = 2000, message = "Description must not exceed 2000 characters")
        String description,
        
        @Size(max = 50, message = "Category must not exceed 50 characters")
        String category,
        
        List<String> options,
        
        OffsetDateTime expiresAt,
        
        @Size(max = 150, message = "Location must not exceed 150 characters")
        String location,
        
        Double latitude,
        Double longitude,
        
        @Size(max = 50, message = "GovLevel must not exceed 50 characters")
        String govLevel
) {}
