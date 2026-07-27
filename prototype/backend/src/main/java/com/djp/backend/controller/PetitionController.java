package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;
import com.djp.backend.dto.PetitionCreateRequestDto;
import com.djp.backend.dto.PetitionResponseDto;
import com.djp.backend.dto.PetitionUpdateRequestDto;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.service.PetitionService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1/petitions")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class PetitionController {

    private final PetitionService petitionService;
    private final UserRepository userRepository;

    public PetitionController(PetitionService petitionService, UserRepository userRepository) {
        this.petitionService = petitionService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PetitionResponseDto>>> getAllPetitions(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(petitionService.getPetitions(pageable), "Petitions retrieved."));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PetitionResponseDto>> createPetition(
            @Valid @RequestBody PetitionCreateRequestDto payload,
            Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Auth required."));
        }
        User author = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (author == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "User not found."));
        }
        PetitionResponseDto result = petitionService.createPetition(payload, author);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(result, "Petition created."));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PetitionResponseDto>> updatePetition(
            @PathVariable UUID id,
            @Valid @RequestBody PetitionUpdateRequestDto request,
            Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Auth required."));
        }
        User author = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (author == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "User not found."));
        }
        try {
            return ResponseEntity.ok(ApiResponse.success(petitionService.updatePetition(id, request, author), "Petition updated."));
        } catch (org.springframework.security.access.AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error(HttpStatus.FORBIDDEN.value(), "Not authorized."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Petition not found."));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePetition(@PathVariable UUID id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Auth required."));
        }
        User author = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (author == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "User not found."));
        }
        try {
            petitionService.deletePetition(id, author);
            return ResponseEntity.ok(ApiResponse.success((Void) null, "Petition deleted."));
        } catch (org.springframework.security.access.AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error(HttpStatus.FORBIDDEN.value(), "Not authorized."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Petition not found."));
        }
    }

    @PostMapping("/{id}/sign")
    public ResponseEntity<ApiResponse<PetitionResponseDto>> signPetition(@PathVariable UUID id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Auth required."));
        }
        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "User not found."));
        }
        try {
            return ResponseEntity.ok(ApiResponse.success(petitionService.signPetition(id, user), "Petition signed."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), e.getMessage()));
        }
    }
}
