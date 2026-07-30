package com.djp.backend.mapper;

import com.djp.backend.dto.PetitionCreateRequestDto;
import com.djp.backend.dto.PetitionResponseDto;
import com.djp.backend.dto.PetitionUpdateRequestDto;
import com.djp.backend.model.Petition;
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
public class PetitionMapperImpl implements PetitionMapper {

    @Override
    public PetitionResponseDto toDto(Petition petition) {
        if ( petition == null ) {
            return null;
        }

        String author = null;
        UUID id = null;
        String title = null;
        String description = null;
        String category = null;
        String targetAuthority = null;
        int signatureGoal = 0;
        int signatureCount = 0;
        OffsetDateTime createdAt = null;
        OffsetDateTime expiresAt = null;

        author = petitionAuthorName( petition );
        id = petition.getId();
        title = petition.getTitle();
        description = petition.getDescription();
        category = petition.getCategory();
        targetAuthority = petition.getTargetAuthority();
        signatureGoal = petition.getSignatureGoal();
        signatureCount = petition.getSignatureCount();
        createdAt = petition.getCreatedAt();
        expiresAt = petition.getExpiresAt();

        PetitionResponseDto petitionResponseDto = new PetitionResponseDto( id, title, description, category, targetAuthority, signatureGoal, signatureCount, author, createdAt, expiresAt );

        return petitionResponseDto;
    }

    @Override
    public Petition toEntity(PetitionCreateRequestDto dto) {
        if ( dto == null ) {
            return null;
        }

        Petition petition = new Petition();

        petition.setTitle( dto.title() );
        petition.setDescription( dto.description() );
        petition.setCategory( dto.category() );
        petition.setTargetAuthority( dto.targetAuthority() );
        petition.setSignatureGoal( dto.signatureGoal() );

        return petition;
    }

    @Override
    public void updatePetitionFromDto(PetitionUpdateRequestDto dto, Petition entity) {
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
        if ( dto.targetAuthority() != null ) {
            entity.setTargetAuthority( dto.targetAuthority() );
        }
        if ( dto.signatureGoal() != null ) {
            entity.setSignatureGoal( dto.signatureGoal() );
        }
    }

    private String petitionAuthorName(Petition petition) {
        if ( petition == null ) {
            return null;
        }
        User author = petition.getAuthor();
        if ( author == null ) {
            return null;
        }
        String name = author.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }
}
