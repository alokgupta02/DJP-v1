package com.djp.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record AddCommentRequest(
    @NotBlank String content,
    @NotNull UUID entityId,
    @NotBlank String entityType,
    UUID parentId
) {}
