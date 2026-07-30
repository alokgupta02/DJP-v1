package com.djp.backend.service;

import com.djp.backend.dto.OnboardingUpdateRequestDto;
import com.djp.backend.exception.ResourceNotFoundException;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.UUID;
import com.djp.backend.mapper.UserMapper;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final SqlFilePersistenceService sqlFilePersistenceService;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, SqlFilePersistenceService sqlFilePersistenceService, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
        this.userMapper = userMapper;
    }

    /**
     * Retrieves user by id from the system.
     */
    @Transactional(readOnly = true)
    public User getUserById(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    /**
     * Executes the complete operation for onboarding.
     */
    @Transactional
    public User completeOnboarding(UUID userId, OnboardingUpdateRequestDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        userMapper.updateUserFromDto(dto, user);
        
        if (dto.name() != null && !dto.name().isBlank()) {
            user.setName(dto.name().trim());
        }
        if (dto.topics() != null) {
            user.setTopics(String.join(", ", dto.topics()));
        }

        user.setOnboardingCompleted(true);
        if (Boolean.TRUE.equals(dto.privacyConsentGiven())) {
            user.setPrivacyConsentGiven(true);
            user.setPrivacyConsentTimestamp(OffsetDateTime.now());
        }

        User savedUser = userRepository.save(user);
        sqlFilePersistenceService.appendUser(savedUser);
        return savedUser;
    }

}
