package com.djp.backend.mapper;

import com.djp.backend.dto.PollResponseDto;
import com.djp.backend.model.Poll;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PollMapper {
    @Mapping(source = "author.id", target = "authorId")
    PollResponseDto toDto(Poll poll);
}
