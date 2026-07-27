package com.djp.backend.service;

import com.djp.backend.dto.RepresentativeResponseDto;
import com.djp.backend.repository.RepresentativeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RepresentativeService {

    private final RepresentativeRepository representativeRepository;

    public RepresentativeService(RepresentativeRepository representativeRepository) {
        this.representativeRepository = representativeRepository;
    }

    @Transactional(readOnly = true)
    public List<RepresentativeResponseDto> getRepresentatives() {
        return representativeRepository.findAll().stream()
                .map(RepresentativeResponseDto::fromEntity).toList();
    }
}
