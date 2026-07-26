package com.djp.backend.dto;

import lombok.Data;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class IssueResponseDto {
    private UUID id;
    private UUID authorId;
    private String title;
    private String description;
    private String category;
    private String priority;
    private String status;
    private Integer workflowStep;
    private String location;
    private Double latitude;
    private Double longitude;
    private String govLevel;
    private Integer supportsCount;
    private Integer commentsCount;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}
