package com.djp.backend.dto;

import lombok.Data;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class PollResponseDto {
    private UUID id;
    private UUID authorId;
    private String question;
    private String description;
    private String category;
    private String location;
    private Double latitude;
    private Double longitude;
    private String govLevel;
    private String optionsJson;
    private Integer votesCount;
    private Integer commentsCount;
    private OffsetDateTime expiresAt;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}
