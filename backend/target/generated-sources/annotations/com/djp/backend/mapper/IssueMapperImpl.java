package com.djp.backend.mapper;

import com.djp.backend.dto.IssueCreateRequestDto;
import com.djp.backend.dto.IssueResponseDto;
import com.djp.backend.dto.IssueUpdateRequestDto;
import com.djp.backend.model.Issue;
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
public class IssueMapperImpl implements IssueMapper {

    @Override
    public IssueResponseDto toDto(Issue issue) {
        if ( issue == null ) {
            return null;
        }

        UUID authorId = null;
        UUID id = null;
        String title = null;
        String description = null;
        String category = null;
        String priority = null;
        String status = null;
        Integer workflowStep = null;
        String location = null;
        Double latitude = null;
        Double longitude = null;
        String govLevel = null;
        Integer supportsCount = null;
        Integer commentsCount = null;
        OffsetDateTime createdAt = null;
        OffsetDateTime updatedAt = null;

        authorId = issueAuthorId( issue );
        id = issue.getId();
        title = issue.getTitle();
        description = issue.getDescription();
        category = issue.getCategory();
        priority = issue.getPriority();
        status = issue.getStatus();
        workflowStep = issue.getWorkflowStep();
        location = issue.getLocation();
        latitude = issue.getLatitude();
        longitude = issue.getLongitude();
        govLevel = issue.getGovLevel();
        supportsCount = issue.getSupportsCount();
        commentsCount = issue.getCommentsCount();
        createdAt = issue.getCreatedAt();
        updatedAt = issue.getUpdatedAt();

        IssueResponseDto issueResponseDto = new IssueResponseDto( id, authorId, title, description, category, priority, status, workflowStep, location, latitude, longitude, govLevel, supportsCount, commentsCount, createdAt, updatedAt );

        return issueResponseDto;
    }

    @Override
    public Issue toEntity(IssueCreateRequestDto dto) {
        if ( dto == null ) {
            return null;
        }

        Issue issue = new Issue();

        issue.setTitle( dto.title() );
        issue.setDescription( dto.description() );
        issue.setCategory( dto.category() );
        issue.setPriority( dto.priority() );
        issue.setLocation( dto.location() );
        issue.setLatitude( dto.latitude() );
        issue.setLongitude( dto.longitude() );
        issue.setGovLevel( dto.govLevel() );

        return issue;
    }

    @Override
    public void updateIssueFromDto(IssueUpdateRequestDto dto, Issue entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.title() != null ) {
            entity.setTitle( dto.title() );
        }
        if ( dto.description() != null ) {
            entity.setDescription( dto.description() );
        }
        if ( dto.category() != null ) {
            entity.setCategory( dto.category() );
        }
        if ( dto.priority() != null ) {
            entity.setPriority( dto.priority() );
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

    private UUID issueAuthorId(Issue issue) {
        if ( issue == null ) {
            return null;
        }
        User author = issue.getAuthor();
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
