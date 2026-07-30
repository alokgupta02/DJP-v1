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

    /**
     * Retrieves user by id from the system.
     * Returns the appropriate response or status based on the operation.
     */
    @Transactional(readOnly = true)
    public User getUserById(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    /**
     * Executes the complete operation for onboarding.
     * Returns the appropriate response or status based on the operation.
     */
    @Transactional
    public User completeOnboarding(UUID userId, OnboardingUpdateRequestDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (dto.name() != null && !dto.name().isBlank()) {
            user.setName(dto.name().trim());
        }
        if (dto.dob() != null) user.setDob(dto.dob().trim());
        if (dto.gender() != null) user.setGender(dto.gender().trim());
        if (dto.phoneNumber() != null) user.setPhoneNumber(dto.phoneNumber().trim());
        if (dto.location() != null) user.setLocation(dto.location().trim());
        if (dto.pincode() != null) user.setPincode(dto.pincode().trim());
        if (dto.country() != null) user.setCountry(dto.country().trim());
        if (dto.state() != null) user.setState(dto.state().trim());
        if (dto.district() != null) user.setDistrict(dto.district().trim());
        if (dto.city() != null) user.setCity(dto.city().trim());
        if (dto.locality() != null) user.setLocality(dto.locality().trim());
        if (dto.ward() != null) user.setWard(dto.ward().trim());
        if (dto.constituency() != null) user.setConstituency(dto.constituency().trim());
        if (dto.occupation() != null) user.setOccupation(dto.occupation().trim());
        if (dto.bio() != null) user.setBio(dto.bio().trim());
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
