package com.djp.backend.controller;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.dto.ApiResponse;
import com.djp.backend.dto.ProfileDto;
import com.djp.backend.dto.ProfileUpdateRequestDto;
import com.djp.backend.model.User;
import com.djp.backend.service.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1/profiles")
@Tag(name = "6. Profiles", description = "User Profile Management")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a user profile by ID")
    public ResponseEntity<ApiResponse<ProfileDto>> getProfile(@PathVariable UUID id) {
        User user = profileService.getProfile(id);
        return ResponseEntity.ok(ApiResponse.success(ProfileDto.fromEntity(user), DjpConstant.MSG_PROFILE_FETCHED_SUCCESSFULLY));
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Update a user profile")
    public ResponseEntity<ApiResponse<ProfileDto>> updateProfile(@PathVariable UUID id, @RequestBody ProfileUpdateRequestDto request, Authentication authentication) {
        User updatedUser = profileService.updateProfile(id, request, authentication);
        return ResponseEntity.ok(ApiResponse.success(ProfileDto.fromEntity(updatedUser), DjpConstant.MSG_PROFILE_UPDATED_SUCCESSFULLY));
    }
}
