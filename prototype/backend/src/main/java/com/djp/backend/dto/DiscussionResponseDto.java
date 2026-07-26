package com.djp.backend.dto;

import lombok.Data;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class DiscussionResponseDto {
    private UUID id;
    private UUID authorId;
    private String title;
    private String description;
    private String category;
    private String location;
    private Double latitude;
    private Double longitude;
    private String govLevel;
    private Integer votesCount;
    private Integer participantCount;
    private Integer proposalCount;
    private String proposalPreview;
    private String proposalBadge;
    private String proposalBadgeVariant;
    private Integer commentsCount;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}
