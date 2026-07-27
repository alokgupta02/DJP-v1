package com.djp.backend.service;

import com.djp.backend.dto.PetitionCreateRequestDto;
import com.djp.backend.dto.PetitionResponseDto;
import com.djp.backend.model.Petition;
import com.djp.backend.model.User;
import com.djp.backend.repository.PetitionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class PetitionService {

    private final PetitionRepository petitionRepository;

    public PetitionService(PetitionRepository petitionRepository) {
        this.petitionRepository = petitionRepository;
    }

    @Transactional(readOnly = true)
    public List<PetitionResponseDto> getPetitions() {
        return petitionRepository.findAll().stream().map(PetitionResponseDto::fromEntity).toList();
    }

    public PetitionResponseDto createPetition(PetitionCreateRequestDto dto, User author) {
        Petition p = new Petition();
        p.setTitle(dto.title());
        p.setDescription(dto.description());
        p.setCategory(dto.category() != null ? dto.category() : "General");
        p.setSignatureGoal(dto.signatureGoal() > 0 ? dto.signatureGoal() : 100);
        p.setTargetAuthority(dto.targetAuthority());
        p.setAuthor(author);
        return PetitionResponseDto.fromEntity(petitionRepository.save(p));
    }

    public PetitionResponseDto signPetition(UUID petitionId) {
        Petition p = petitionRepository.findById(petitionId)
                .orElseThrow(() -> new IllegalArgumentException("Petition not found"));
        p.setSignatureCount(p.getSignatureCount() + 1);
        return PetitionResponseDto.fromEntity(petitionRepository.save(p));
    }
}
