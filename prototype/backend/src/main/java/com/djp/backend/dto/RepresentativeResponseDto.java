package com.djp.backend.dto;

import com.djp.backend.model.Representative;
import java.util.UUID;

public record RepresentativeResponseDto(
    UUID id,
    String name,
    String position,
    String ward,
    String party,
    String since,
    String phone,
    String email,
    String imageInitials,
    String avatarBg,
    String avatarTextColor,
    int issuesResolved,
    int meetingsHeld,
    String attendance,
    String biography
) {
    public static RepresentativeResponseDto fromEntity(Representative r) {
        return new RepresentativeResponseDto(
            r.getId(), r.getName(), r.getPosition(), r.getWard(), r.getParty(),
            r.getSince(), r.getPhone(), r.getEmail(), r.getImageInitials(),
            r.getAvatarBg(), r.getAvatarTextColor(), r.getIssuesResolved(),
            r.getMeetingsHeld(), r.getAttendance(), r.getBiography()
        );
    }
}
