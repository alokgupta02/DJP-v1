package com.djp.backend.mapper;

import com.djp.backend.dto.DiscussionResponseDto;
import com.djp.backend.model.Discussion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DiscussionMapper {
    @Mapping(source = "author.id", target = "authorId")
    DiscussionResponseDto toDto(Discussion discussion);
}
