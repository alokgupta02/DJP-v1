package com.djp.backend.mapper;

import com.djp.backend.dto.PetitionResponseDto;
import com.djp.backend.dto.PetitionUpdateRequestDto;
import com.djp.backend.model.Petition;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface PetitionMapper {
    @Mapping(source = "author.name", target = "author")
    PetitionResponseDto toDto(Petition petition);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "author", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "signatureCount", ignore = true)
    Petition toEntity(com.djp.backend.dto.PetitionCreateRequestDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updatePetitionFromDto(PetitionUpdateRequestDto dto, @MappingTarget Petition entity);
}
