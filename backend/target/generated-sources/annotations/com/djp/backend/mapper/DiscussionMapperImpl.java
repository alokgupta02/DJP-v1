package com.djp.backend.mapper;

import com.djp.backend.dto.DiscussionCreateRequestDto;
import com.djp.backend.dto.DiscussionResponseDto;
import com.djp.backend.dto.DiscussionUpdateRequestDto;
import com.djp.backend.model.Discussion;
import com.djp.backend.model.User;
import java.time.OffsetDateTime;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-31T01:04:23+0530",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class DiscussionMapperImpl implements DiscussionMapper {

    @Override
    public DiscussionResponseDto toDto(Discussion discussion) {
        if ( discussion == null ) {
            return null;
        }

        UUID authorId = null;
        UUID id = null;
        String title = null;
        String description = null;
        String category = null;
        String location = null;
        Double latitude = null;
        Double longitude = null;
        String govLevel = null;
        Integer votesCount = null;
        Integer participantCount = null;
        Integer proposalCount = null;
        String proposalPreview = null;
        String proposalBadge = null;
        String proposalBadgeVariant = null;
        Integer commentsCount = null;
        OffsetDateTime createdAt = null;
        OffsetDateTime updatedAt = null;

        authorId = discussionAuthorId( discussion );
        id = discussion.getId();
        title = discussion.getTitle();
        description = discussion.getDescription();
        category = discussion.getCategory();
        location = discussion.getLocation();
        latitude = discussion.getLatitude();
        longitude = discussion.getLongitude();
        govLevel = discussion.getGovLevel();
        votesCount = discussion.getVotesCount();
        participantCount = discussion.getParticipantCount();
        proposalCount = discussion.getProposalCount();
        proposalPreview = discussion.getProposalPreview();
        proposalBadge = discussion.getProposalBadge();
        proposalBadgeVariant = discussion.getProposalBadgeVariant();
        commentsCount = discussion.getCommentsCount();
        createdAt = discussion.getCreatedAt();
        updatedAt = discussion.getUpdatedAt();

        DiscussionResponseDto discussionResponseDto = new DiscussionResponseDto( id, authorId, title, description, category, location, latitude, longitude, govLevel, votesCount, participantCount, proposalCount, proposalPreview, proposalBadge, proposalBadgeVariant, commentsCount, createdAt, updatedAt );

        return discussionResponseDto;
    }

    @Override
    public Discussion toEntity(DiscussionCreateRequestDto dto) {
        if ( dto == null ) {
            return null;
        }

        Discussion discussion = new Discussion();

        discussion.setTitle( dto.title() );
        discussion.setDescription( dto.description() );
        discussion.setCategory( dto.category() );
        discussion.setLocation( dto.location() );
        discussion.setLatitude( dto.latitude() );
        discussion.setLongitude( dto.longitude() );
        discussion.setGovLevel( dto.govLevel() );
        discussion.setProposalPreview( dto.proposalPreview() );
        discussion.setProposalBadge( dto.proposalBadge() );

        return discussion;
    }

    @Override
    public void updateDiscussionFromDto(DiscussionUpdateRequestDto dto, Discussion entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.title() != null ) {
            entity.setTitle( dto.title() );
        }
        if ( dto.category() != null ) {
            entity.setCategory( dto.category() );
        }
        if ( dto.location() != null ) {
            entity.setLocation( dto.location() );
        }
        if ( dto.latitude() != null ) {
            entity.setLatitude( dto.latitude() );
        }
        if ( dto.longitude() != null ) {
            entity.setLongitude( dto.longitude() );
        }
        if ( dto.govLevel() != null ) {
            entity.setGovLevel( dto.govLevel() );
        }
    }

    private UUID discussionAuthorId(Discussion discussion) {
        if ( discussion == null ) {
            return null;
        }
        User author = discussion.getAuthor();
        if ( author == null ) {
            return null;
        }
        UUID id = author.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
