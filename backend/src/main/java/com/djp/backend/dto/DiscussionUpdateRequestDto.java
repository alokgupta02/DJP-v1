package com.djp.backend.dto;

import jakarta.validation.constraints.Size;

public record DiscussionUpdateRequestDto(
        @Size(max = 255, message = "Title must not exceed 255 characters")
        String title,
        
        @Size(max = 5000, message = "Content must not exceed 5000 characters")
        String content,
        
        @Size(max = 50, message = "Category must not exceed 50 characters")
        String category,
        
        @Size(max = 150, message = "Location must not exceed 150 characters")
        String location,
        
        Double latitude,
        Double longitude,
        
        @Size(max = 50, message = "GovLevel must not exceed 50 characters")
        String govLevel
) {}
