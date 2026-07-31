package com.djp.backend.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public record PollResponseDto(
    UUID id,
    UUID authorId,
    String question,
    String description,
    String category,
    String location,
    Double latitude,
    Double longitude,
    String govLevel,
    String optionsJson,
    Integer votesCount,
    Integer commentsCount,
    OffsetDateTime expiresAt,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {}
