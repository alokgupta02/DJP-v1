package com.djp.backend.service;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.dto.PetitionCreateRequestDto;
import com.djp.backend.dto.PetitionResponseDto;
import com.djp.backend.dto.PetitionUpdateRequestDto;
import com.djp.backend.exception.UnauthorizedException;
import com.djp.backend.model.Petition;
import com.djp.backend.model.User;
import com.djp.backend.repository.PetitionRepository;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.util.AuthUtils;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.djp.backend.mapper.PetitionMapper;
import java.util.UUID;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PetitionService {

    private final PetitionRepository petitionRepository;
    private final UserRepository userRepository;
    private final AuthUtils authUtils;
    private final PetitionMapper petitionMapper;

    public PetitionService(PetitionRepository petitionRepository, UserRepository userRepository, AuthUtils authUtils,
            PetitionMapper petitionMapper) {
        this.petitionRepository = petitionRepository;
        this.userRepository = userRepository;
        this.authUtils = authUtils;
        this.petitionMapper = petitionMapper;
    }

    /**
     * Retrieves petitions from the system.
     */
    @Transactional(readOnly = true)
    public Page<PetitionResponseDto> getPetitions(Pageable pageable) {
        return petitionRepository.findAll(pageable).map(PetitionResponseDto::fromEntity);
    }

    /**
     * Creates and persists new petition.
     */
    public PetitionResponseDto createPetition(PetitionCreateRequestDto dto, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Petition p = petitionMapper.toEntity(dto);
        p.setCategory(dto.category() != null ? dto.category() : "General");
        p.setSignatureGoal(dto.signatureGoal() > 0 ? dto.signatureGoal() : 100);
        p.setAuthor(author);
        return PetitionResponseDto.fromEntity(petitionRepository.save(p));
    }

    /**
     * Updates existing petition records.
     */
    public PetitionResponseDto updatePetition(UUID id, PetitionUpdateRequestDto request,
            Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Petition p = petitionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_PETITION_NOT_FOUND));
        if (!p.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED);
        }
        petitionMapper.updatePetitionFromDto(request, p);
        return PetitionResponseDto.fromEntity(petitionRepository.save(p));
    }

    /**
     * Deletes petition from the system.
     */
    public void deletePetition(UUID id, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Petition p = petitionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_PETITION_NOT_FOUND));
        if (!p.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED);
        }
        petitionRepository.delete(p);
    }

    /**
     * Executes the sign operation for petition.
     */
    public PetitionResponseDto signPetition(UUID petitionId, Authentication authentication) {
        User user = authUtils.getAuthenticatedUser(authentication);
        Petition p = petitionRepository.findById(petitionId)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_PETITION_NOT_FOUND));
        p.setSignatureCount(p.getSignatureCount() + 1);
        return PetitionResponseDto.fromEntity(petitionRepository.save(p));
    }
}
