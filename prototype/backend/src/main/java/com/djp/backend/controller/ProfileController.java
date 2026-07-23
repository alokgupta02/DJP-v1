package com.djp.backend.controller;

import com.djp.backend.dto.ProfileDto;
import com.djp.backend.dto.ProfileUpdateRequestDto;
import com.djp.backend.model.User;
import com.djp.backend.service.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1/profiles")
@Tag(name = "Profiles", description = "Operations related to user profiles")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{id}")
    @PreAuthorize("#id.toString() == authentication.principal or hasRole('ADMIN')")
    @Operation(summary = "Get a user profile by ID")
    public ResponseEntity<ProfileDto> getProfile(@PathVariable UUID id) {
        User user = profileService.getProfile(id);
        return ResponseEntity.ok(ProfileDto.fromEntity(user));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("#id.toString() == authentication.principal or hasRole('ADMIN')")
    @Operation(summary = "Update a user profile")
    public ResponseEntity<ProfileDto> updateProfile(@PathVariable UUID id, @RequestBody ProfileUpdateRequestDto request) {
        User updatedUser = profileService.updateProfile(id, request);
        return ResponseEntity.ok(ProfileDto.fromEntity(updatedUser));
    }
}
