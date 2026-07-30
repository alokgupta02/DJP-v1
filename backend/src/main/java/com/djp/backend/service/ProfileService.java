package com.djp.backend.service;

import com.djp.backend.dto.ProfileUpdateRequestDto;
import com.djp.backend.exception.ResourceNotFoundException;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import com.djp.backend.exception.UnauthorizedException;

import java.util.UUID;

@Service
public class ProfileService {

    private final UserRepository userRepository;
    private final SqlFilePersistenceService sqlFilePersistenceService;
    private final com.djp.backend.mapper.UserMapper userMapper;

    public ProfileService(UserRepository userRepository, SqlFilePersistenceService sqlFilePersistenceService, com.djp.backend.mapper.UserMapper userMapper) {
        this.userRepository = userRepository;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
        this.userMapper = userMapper;
    }

    /**
     * Retrieves profile from the system.
     */
    @Transactional(readOnly = true)
    public User getProfile(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User profile not found with id: " + userId));
    }

    /**
     * Updates existing profile records.
     */
    @Transactional
    public User updateProfile(UUID userId, ProfileUpdateRequestDto dto, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("Authentication required.");
        }
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (!user.getEmail().equals(authentication.getName()) && 
            !authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            throw new UnauthorizedException("Not authorized to update this profile.");
        }

        userMapper.updateProfileFromDto(dto, user);
        
        if (dto.name() != null && !dto.name().isBlank()) user.setName(dto.name().trim());
        if (dto.topics() != null) {
            user.setTopics(String.join(", ", dto.topics()));
        }

        User savedUser = userRepository.save(user);
        sqlFilePersistenceService.appendUser(savedUser);
        return savedUser;
    }
}
