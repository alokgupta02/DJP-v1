package com.djp.backend.mapper;

import com.djp.backend.dto.IssueResponseDto;
import com.djp.backend.model.Issue;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IssueMapper {
    @Mapping(source = "author.id", target = "authorId")
    IssueResponseDto toDto(Issue issue);
}
