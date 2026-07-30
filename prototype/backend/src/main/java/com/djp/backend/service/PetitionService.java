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
import java.util.UUID;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PetitionService {

    private final PetitionRepository petitionRepository;
    private final UserRepository userRepository;
    private final AuthUtils authUtils;

    public PetitionService(PetitionRepository petitionRepository, UserRepository userRepository, AuthUtils authUtils) {
        this.petitionRepository = petitionRepository;
        this.userRepository = userRepository;
        this.authUtils = authUtils;
    }


    @Transactional(readOnly = true)
    public Page<PetitionResponseDto> getPetitions(Pageable pageable) {
        return petitionRepository.findAll(pageable).map(PetitionResponseDto::fromEntity);
    }

    public PetitionResponseDto createPetition(PetitionCreateRequestDto dto, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Petition p = new Petition();
        p.setTitle(dto.title());
        p.setDescription(dto.description());
        p.setCategory(dto.category() != null ? dto.category() : "General");
        p.setSignatureGoal(dto.signatureGoal() > 0 ? dto.signatureGoal() : 100);
        p.setTargetAuthority(dto.targetAuthority());
        p.setAuthor(author);
        return PetitionResponseDto.fromEntity(petitionRepository.save(p));
    }

    public PetitionResponseDto updatePetition(UUID id, PetitionUpdateRequestDto request, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Petition p = petitionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_PETITION_NOT_FOUND));
        if (!p.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED);
        }
        if (request.title() != null) p.setTitle(request.title());
        if (request.description() != null) p.setDescription(request.description());
        if (request.category() != null) p.setCategory(request.category());
        if (request.targetAuthority() != null) p.setTargetAuthority(request.targetAuthority());
        if (request.signatureGoal() != null) p.setSignatureGoal(request.signatureGoal());
        return PetitionResponseDto.fromEntity(petitionRepository.save(p));
    }

    public void deletePetition(UUID id, Authentication authentication) {
        User author = authUtils.getAuthenticatedUser(authentication);
        Petition p = petitionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_PETITION_NOT_FOUND));
        if (!p.getAuthor().getId().equals(author.getId()) && !author.getRole().equals("ADMIN")) {
            throw new org.springframework.security.access.AccessDeniedException(DjpConstant.MSG_NOT_AUTHORIZED);
        }
        petitionRepository.delete(p);
    }

    public PetitionResponseDto signPetition(UUID petitionId, Authentication authentication) {
        User user = authUtils.getAuthenticatedUser(authentication);
        Petition p = petitionRepository.findById(petitionId)
                .orElseThrow(() -> new IllegalArgumentException(DjpConstant.MSG_PETITION_NOT_FOUND));
        p.setSignatureCount(p.getSignatureCount() + 1);
        return PetitionResponseDto.fromEntity(petitionRepository.save(p));
    }
}
