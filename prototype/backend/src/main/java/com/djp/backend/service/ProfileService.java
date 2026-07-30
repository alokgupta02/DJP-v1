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

    public ProfileService(UserRepository userRepository, SqlFilePersistenceService sqlFilePersistenceService) {
        this.userRepository = userRepository;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
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

        if (dto.name() != null && !dto.name().isBlank()) user.setName(dto.name().trim());
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

        User savedUser = userRepository.save(user);
        sqlFilePersistenceService.appendUser(savedUser);
        return savedUser;
    }
}
