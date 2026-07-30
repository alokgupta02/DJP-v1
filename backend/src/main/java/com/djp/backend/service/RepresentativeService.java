package com.djp.backend.service;

import com.djp.backend.dto.RepresentativeResponseDto;
import com.djp.backend.repository.RepresentativeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RepresentativeService {

    private final RepresentativeRepository representativeRepository;

    public RepresentativeService(RepresentativeRepository representativeRepository) {
        this.representativeRepository = representativeRepository;
    }

    /**
     * Retrieves representatives from the system.
     */
    @Transactional(readOnly = true)
    public Page<RepresentativeResponseDto> getRepresentatives(Pageable pageable) {
        return representativeRepository.findAll(pageable).map(RepresentativeResponseDto::fromEntity);
    }
}
