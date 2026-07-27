package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;
import com.djp.backend.dto.OnboardingUpdateRequestDto;
import com.djp.backend.dto.UserDto;
import com.djp.backend.exception.ResourceNotFoundException;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1/users")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return ResponseEntity.ok(ApiResponse.success(UserDto.fromEntity(user), "User fetched successfully."));
    }

    @PatchMapping("/{userId}/onboarding")
    public ResponseEntity<ApiResponse<UserDto>> completeOnboarding(
            @PathVariable UUID userId,
            @RequestBody OnboardingUpdateRequestDto dto
    ) {
        User updatedUser = userService.completeOnboarding(userId, dto);
        return ResponseEntity.ok(ApiResponse.success(UserDto.fromEntity(updatedUser), "Onboarding completed successfully."));
    }

}
