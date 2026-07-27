package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;
import com.djp.backend.dto.AuthResponseDto;
import com.djp.backend.dto.RefreshTokenRequestDto;
import com.djp.backend.dto.UserDto;
import com.djp.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/djp/api/v1/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/google")
    public ResponseEntity<ApiResponse<Map<String, String>>> initiateGoogleLogin() {
        return ResponseEntity.ok(ApiResponse.success(authService.initiateGoogleLogin(), "Google login initiated."));
    }

    @GetMapping("/github")
    public ResponseEntity<ApiResponse<Map<String, String>>> initiateGithubLogin() {
        return ResponseEntity.ok(ApiResponse.success(authService.initiateGithubLogin(), "Github login initiated."));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponseDto>> register(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            String name = payload.get("name");
            if (email == null || email.isBlank()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error(400, "Email is required"));
            }
            AuthResponseDto result = authService.register(email, name);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(result, "Registration successful."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ApiResponse.error(HttpStatus.CONFLICT.value(), e.getMessage()));
        }
    }

    @PostMapping("/dev-login")
    public ResponseEntity<ApiResponse<AuthResponseDto>> devLogin(@RequestParam(defaultValue = "citizen@djp.org") String email) {
        try {
            AuthResponseDto result = authService.devLogin(email);
            return ResponseEntity.ok(ApiResponse.success(result, "Login successful."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Invalid credentials."));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponseDto>> refreshToken(@Valid @RequestBody RefreshTokenRequestDto request) {
        try {
            AuthResponseDto result = authService.refreshToken(request.refreshToken());
            return ResponseEntity.ok(ApiResponse.success(result, "Token refreshed successfully."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> getMe(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Authentication required."));
        }
        try {
            UserDto result = authService.getMe(authentication.getName());
            return ResponseEntity.ok(ApiResponse.success(result, "User fetched successfully."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "User not found."));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<Map<String, String>>> verifyOtp(@RequestBody Map<String, String> payload) {
        try {
            Map<String, String> result = authService.verifyOtp(payload.get("otp"), payload.getOrDefault("email", ""));
            return ResponseEntity.ok(ApiResponse.success(result, "OTP verified."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(400, e.getMessage()));
        }
    }
}
