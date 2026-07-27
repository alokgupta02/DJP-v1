package com.djp.backend.dto;

import com.djp.backend.model.Petition;
import java.util.UUID;

public record PetitionResponseDto(
    UUID id,
    String title,
    String description,
    String category,
    String targetAuthority,
    int signatureGoal,
    int signatureCount,
    String author,
    String createdAt,
    String expiresAt
) {
    public static PetitionResponseDto fromEntity(Petition p) {
        return new PetitionResponseDto(
            p.getId(), p.getTitle(), p.getDescription(), p.getCategory(),
            p.getTargetAuthority(), p.getSignatureGoal(), p.getSignatureCount(),
            p.getAuthor().getName(),
            p.getCreatedAt().toString(),
            p.getExpiresAt().toString()
        );
    }
}
