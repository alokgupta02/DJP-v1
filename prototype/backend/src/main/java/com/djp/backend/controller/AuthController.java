package com.djp.backend.controller;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.djp.backend.dto.AuthResponseDto;
import com.djp.backend.dto.RegisterRequest;
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
@Tag(name = "1. Auth & Identity", description = "Authentication and User Identity Management")
@RequestMapping("/djp/api/v1/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Initiate Google Login", description = "Executes the initiateGoogleLogin operation")
    @GetMapping("/google")
    public ResponseEntity<ApiResponse<Map<String, String>>> initiateGoogleLogin() {
        return ResponseEntity.ok(ApiResponse.success(authService.initiateGoogleLogin(), DjpConstant.MSG_GOOGLE_LOGIN_INITIATED));
    }

    @Operation(summary = "Initiate Github Login", description = "Executes the initiateGithubLogin operation")
    @GetMapping("/github")
    public ResponseEntity<ApiResponse<Map<String, String>>> initiateGithubLogin() {
        return ResponseEntity.ok(ApiResponse.success(authService.initiateGithubLogin(), DjpConstant.MSG_GITHUB_LOGIN_INITIATED));
    }

    @Operation(summary = "Register", description = "Executes the register operation")
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponseDto>> register(@Valid @RequestBody RegisterRequest payload) {
        AuthResponseDto result = authService.register(payload.email(), payload.name());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(result, DjpConstant.MSG_REGISTRATION_SUCCESSFUL));
    }

    @Operation(summary = "Dev Login", description = "Executes the devLogin operation")
    @PostMapping("/dev-login")
    public ResponseEntity<ApiResponse<AuthResponseDto>> devLogin(@RequestParam(defaultValue = "citizen@djp.org") String email) {
        AuthResponseDto result = authService.devLogin(email);
        return ResponseEntity.ok(ApiResponse.success(result, DjpConstant.MSG_LOGIN_SUCCESSFUL));
    }

    @Operation(summary = "Refresh Token", description = "Executes the refreshToken operation")
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponseDto>> refreshToken(@Valid @RequestBody RefreshTokenRequestDto request) {
        AuthResponseDto result = authService.refreshToken(request.refreshToken());
        return ResponseEntity.ok(ApiResponse.success(result, DjpConstant.MSG_TOKEN_REFRESHED_SUCCESSFULLY));
    }

    @Operation(summary = "Get Me", description = "Executes the getMe operation")
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> getMe(Authentication authentication) {
        UserDto result = authService.getMe(authentication);
        return ResponseEntity.ok(ApiResponse.success(result, DjpConstant.MSG_USER_FETCHED_SUCCESSFULLY));
    }

    @Operation(summary = "Verify Otp", description = "Executes the verifyOtp operation")
    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<Map<String, String>>> verifyOtp(@RequestBody Map<String, String> payload) {
        Map<String, String> result = authService.verifyOtp(payload.get("otp"), payload.getOrDefault("email", ""));
        return ResponseEntity.ok(ApiResponse.success(result, DjpConstant.MSG_OTP_VERIFIED));
    }
}
