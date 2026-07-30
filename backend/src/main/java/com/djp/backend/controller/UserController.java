package com.djp.backend.controller;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.djp.backend.dto.OnboardingUpdateRequestDto;
import com.djp.backend.dto.UserDto;
import com.djp.backend.model.User;
import com.djp.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Tag(name = "1. Auth & Identity", description = "User Identity Management")
@RequestMapping("/djp/api/v1/users")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Get User By Id", description = "Executes the getUserById operation")
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable UUID userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(ApiResponse.success(UserDto.fromEntity(user), DjpConstant.MSG_USER_FETCHED_SUCCESSFULLY));
    }

    @Operation(summary = "Complete Onboarding", description = "Executes the completeOnboarding operation")
    @PatchMapping("/{userId}/onboarding")
    public ResponseEntity<ApiResponse<UserDto>> completeOnboarding(
            @PathVariable UUID userId,
            @RequestBody OnboardingUpdateRequestDto dto
    ) {
        User updatedUser = userService.completeOnboarding(userId, dto);
        return ResponseEntity.ok(ApiResponse.success(UserDto.fromEntity(updatedUser), DjpConstant.MSG_ONBOARDING_COMPLETED_SUCCESSFULLY));
    }
}
