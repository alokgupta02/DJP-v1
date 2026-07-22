package com.djp.backend.service;

import com.djp.backend.dto.OnboardingUpdateRequestDto;
import com.djp.backend.exception.ResourceNotFoundException;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final SqlFilePersistenceService sqlFilePersistenceService;

    public UserService(UserRepository userRepository, SqlFilePersistenceService sqlFilePersistenceService) {
        this.userRepository = userRepository;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
    }

    @Transactional
    public User completeOnboarding(UUID userId, OnboardingUpdateRequestDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (dto.name() != null && !dto.name().isBlank()) {
            user.setName(dto.name().trim());
        }
        if (dto.location() != null) {
            user.setLocation(dto.location().trim());
        }
        if (dto.pincode() != null) {
            user.setPincode(dto.pincode().trim());
        }
        if (dto.occupation() != null) {
            user.setOccupation(dto.occupation().trim());
        }
        if (dto.bio() != null) {
            user.setBio(dto.bio().trim());
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
