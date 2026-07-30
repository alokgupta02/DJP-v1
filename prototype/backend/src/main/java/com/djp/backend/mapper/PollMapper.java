package com.djp.backend.mapper;

import com.djp.backend.dto.PollResponseDto;
import com.djp.backend.model.Poll;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.djp.backend.dto.PollUpdateRequestDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface PollMapper {
    @Mapping(source = "author.id", target = "authorId")
    PollResponseDto toDto(Poll poll);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "author", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "votesCount", ignore = true)
    @Mapping(target = "status", ignore = true)
    Poll toEntity(com.djp.backend.dto.PollCreateRequestDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "optionsJson", ignore = true)
    void updatePollFromDto(PollUpdateRequestDto dto, @MappingTarget Poll entity);
}
