package com.djp.backend.mapper;

import com.djp.backend.dto.PollCreateRequestDto;
import com.djp.backend.dto.PollResponseDto;
import com.djp.backend.dto.PollUpdateRequestDto;
import com.djp.backend.model.Poll;
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
public class PollMapperImpl implements PollMapper {

    @Override
    public PollResponseDto toDto(Poll poll) {
        if ( poll == null ) {
            return null;
        }

        UUID authorId = null;
        UUID id = null;
        String question = null;
        String description = null;
        String category = null;
        String location = null;
        Double latitude = null;
        Double longitude = null;
        String govLevel = null;
        String optionsJson = null;
        Integer votesCount = null;
        Integer commentsCount = null;
        OffsetDateTime expiresAt = null;
        OffsetDateTime createdAt = null;
        OffsetDateTime updatedAt = null;

        authorId = pollAuthorId( poll );
        id = poll.getId();
        question = poll.getQuestion();
        description = poll.getDescription();
        category = poll.getCategory();
        location = poll.getLocation();
        latitude = poll.getLatitude();
        longitude = poll.getLongitude();
        govLevel = poll.getGovLevel();
        optionsJson = poll.getOptionsJson();
        votesCount = poll.getVotesCount();
        commentsCount = poll.getCommentsCount();
        expiresAt = poll.getExpiresAt();
        createdAt = poll.getCreatedAt();
        updatedAt = poll.getUpdatedAt();

        PollResponseDto pollResponseDto = new PollResponseDto( id, authorId, question, description, category, location, latitude, longitude, govLevel, optionsJson, votesCount, commentsCount, expiresAt, createdAt, updatedAt );

        return pollResponseDto;
    }

    @Override
    public Poll toEntity(PollCreateRequestDto dto) {
        if ( dto == null ) {
            return null;
        }

        Poll poll = new Poll();

        poll.setQuestion( dto.question() );
        poll.setDescription( dto.description() );
        poll.setCategory( dto.category() );
        poll.setLocation( dto.location() );
        poll.setLatitude( dto.latitude() );
        poll.setLongitude( dto.longitude() );
        poll.setGovLevel( dto.govLevel() );
        poll.setOptionsJson( dto.optionsJson() );

        return poll;
    }

    @Override
    public void updatePollFromDto(PollUpdateRequestDto dto, Poll entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.question() != null ) {
            entity.setQuestion( dto.question() );
        }
        if ( dto.description() != null ) {
            entity.setDescription( dto.description() );
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
        if ( dto.expiresAt() != null ) {
            entity.setExpiresAt( dto.expiresAt() );
        }
    }

    private UUID pollAuthorId(Poll poll) {
        if ( poll == null ) {
            return null;
        }
        User author = poll.getAuthor();
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
