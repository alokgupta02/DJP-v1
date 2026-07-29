package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.djp.backend.dto.PetitionCreateRequestDto;
import com.djp.backend.dto.PetitionResponseDto;
import com.djp.backend.dto.PetitionUpdateRequestDto;
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
@Tag(name = "7. Petitions", description = "Petitions Management")
@RequestMapping("/djp/api/v1/petitions")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class PetitionController {

    private final PetitionService petitionService;

    public PetitionController(PetitionService petitionService) {
        this.petitionService = petitionService;
    }

    @Operation(summary = "Get All Petitions", description = "Executes the getAllPetitions operation")
    @GetMapping
    public ResponseEntity<ApiResponse<List<PetitionResponseDto>>> getAllPetitions(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(petitionService.getPetitions(pageable), "Petitions retrieved."));
    }

    @Operation(summary = "Create Petition", description = "Executes the createPetition operation")
    @PostMapping
    public ResponseEntity<ApiResponse<PetitionResponseDto>> createPetition(
            @Valid @RequestBody PetitionCreateRequestDto payload,
            Authentication authentication) {
        PetitionResponseDto result = petitionService.createPetition(payload, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(result, "Petition created."));
    }

    @Operation(summary = "Update Petition", description = "Executes the updatePetition operation")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PetitionResponseDto>> updatePetition(
            @PathVariable UUID id,
            @Valid @RequestBody PetitionUpdateRequestDto request,
            Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(petitionService.updatePetition(id, request, authentication), "Petition updated."));
    }

    @Operation(summary = "Delete Petition", description = "Executes the deletePetition operation")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePetition(@PathVariable UUID id, Authentication authentication) {
        petitionService.deletePetition(id, authentication);
        return ResponseEntity.ok(ApiResponse.success((Void) null, "Petition deleted."));
    }

    @Operation(summary = "Sign Petition", description = "Executes the signPetition operation")
    @PostMapping("/{id}/sign")
    public ResponseEntity<ApiResponse<PetitionResponseDto>> signPetition(@PathVariable UUID id, Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(petitionService.signPetition(id, authentication), "Petition signed."));
    }
}
