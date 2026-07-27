package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;
import com.djp.backend.dto.PetitionResponseDto;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.service.PetitionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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
    public ResponseEntity<ApiResponse<List<PetitionResponseDto>>> getAllPetitions() {
        return ResponseEntity.ok(ApiResponse.success(petitionService.getPetitions(), "Petitions retrieved."));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PetitionResponseDto>> createPetition(
            @RequestBody Map<String, String> payload,
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
        String title = payload.get("title");
        String description = payload.get("description");
        String category = payload.getOrDefault("category", "General");
        int goal = Integer.parseInt(payload.getOrDefault("signatureGoal", "100"));
        String target = payload.get("targetAuthority");
        PetitionResponseDto result = petitionService.createPetition(title, description, category, goal, target, author);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(result, "Petition created."));
    }

    @PostMapping("/{id}/sign")
    public ResponseEntity<ApiResponse<PetitionResponseDto>> signPetition(@PathVariable UUID id) {
        try {
            return ResponseEntity.ok(ApiResponse.success(petitionService.signPetition(id), "Petition signed."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), e.getMessage()));
        }
    }
}
