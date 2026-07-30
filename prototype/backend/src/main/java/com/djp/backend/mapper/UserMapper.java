package com.djp.backend.mapper;

import com.djp.backend.dto.OnboardingUpdateRequestDto;
import com.djp.backend.model.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "privacyConsentGiven", ignore = true)
    @Mapping(target = "privacyConsentTimestamp", ignore = true)
    @Mapping(target = "topics", ignore = true)
    @Mapping(target = "name", ignore = true)
    void updateUserFromDto(OnboardingUpdateRequestDto dto, @MappingTarget User entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "topics", ignore = true)
    @Mapping(target = "name", ignore = true)
    void updateProfileFromDto(com.djp.backend.dto.ProfileUpdateRequestDto dto, @MappingTarget User entity);

    default String map(String value) {
        return value != null ? value.trim() : null;
    }
}
