package com.djp.backend.mapper;

import com.djp.backend.dto.DiscussionResponseDto;
import com.djp.backend.model.Discussion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.djp.backend.dto.DiscussionCreateRequestDto;
import com.djp.backend.dto.DiscussionUpdateRequestDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface DiscussionMapper {
    @Mapping(source = "author.id", target = "authorId")
    DiscussionResponseDto toDto(Discussion discussion);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "author", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "commentsCount", ignore = true)
    Discussion toEntity(DiscussionCreateRequestDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateDiscussionFromDto(DiscussionUpdateRequestDto dto, @MappingTarget Discussion entity);
}
