package com.djp.backend.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public record IssueResponseDto(
    UUID id,
    UUID authorId,
    String title,
    String description,
    String category,
    String priority,
    String status,
    Integer workflowStep,
    String location,
    Double latitude,
    Double longitude,
    String govLevel,
    Integer supportsCount,
    Integer commentsCount,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {}
