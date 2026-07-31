package com.djp.backend.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public record DiscussionResponseDto(
    UUID id,
    UUID authorId,
    String title,
    String description,
    String category,
    String location,
    Double latitude,
    Double longitude,
    String govLevel,
    Integer votesCount,
    Integer participantCount,
    Integer proposalCount,
    String proposalPreview,
    String proposalBadge,
    String proposalBadgeVariant,
    Integer commentsCount,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {}
