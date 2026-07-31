package com.djp.backend.mapper;

import com.djp.backend.dto.IssueResponseDto;
import com.djp.backend.model.Issue;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.djp.backend.dto.IssueUpdateRequestDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface IssueMapper {
    @Mapping(source = "author.id", target = "authorId")
    IssueResponseDto toDto(Issue issue);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "author", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "supportsCount", ignore = true)
    @Mapping(target = "commentsCount", ignore = true)
    Issue toEntity(com.djp.backend.dto.IssueCreateRequestDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateIssueFromDto(IssueUpdateRequestDto dto, @MappingTarget Issue entity);
}
