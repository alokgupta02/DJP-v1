package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;
import com.djp.backend.dto.AuthResponseDto;
import com.djp.backend.dto.RefreshTokenRequestDto;
import com.djp.backend.dto.UserDto;
import com.djp.backend.model.RefreshToken;
import com.djp.backend.model.User;
import com.djp.backend.repository.RefreshTokenRepository;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.security.JwtTokenProvider;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class AuthController {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/google")
    public ResponseEntity<ApiResponse<Map<String, String>>> initiateGoogleLogin() {
        Map<String, String> response = new HashMap<>();
        response.put("provider", "google");
        response.put("redirectUrl", "/oauth2/authorization/google");
        return ResponseEntity.ok(ApiResponse.success(response, "Google login initiated."));
    }

    @GetMapping("/github")
    public ResponseEntity<ApiResponse<Map<String, String>>> initiateGithubLogin() {
        Map<String, String> response = new HashMap<>();
        response.put("provider", "github");
        response.put("redirectUrl", "/oauth2/authorization/github");
        return ResponseEntity.ok(ApiResponse.success(response, "Github login initiated."));
    }

    @PostMapping("/dev-login")
    public ResponseEntity<ApiResponse<AuthResponseDto>> devLogin(@RequestParam(defaultValue = "citizen@djp.org") String email) {
        return userRepository.findByEmail(email)
                .map(user -> {
                    AuthResponseDto authResponse = createAuthResponse(user);
                    return ResponseEntity.ok(ApiResponse.success(authResponse, "Login successful."));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Invalid credentials.")));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponseDto>> refreshToken(@Valid @RequestBody RefreshTokenRequestDto request) {
        return refreshTokenRepository.findByToken(request.refreshToken())
                .filter(refreshToken -> !refreshToken.isRevoked())
                .filter(refreshToken -> refreshToken.getExpiresAt().isAfter(OffsetDateTime.now()))
                .map(refreshToken -> {
                    User user = refreshToken.getUser();
                    // Revoke old refresh token (rotation)
                    refreshToken.setRevoked(true);
                    refreshTokenRepository.save(refreshToken);
                    // Issue new tokens
                    AuthResponseDto authResponse = createAuthResponse(user);
                    return ResponseEntity.ok(ApiResponse.success(authResponse, "Token refreshed successfully."));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Invalid or expired refresh token.")));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> getMe(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Authentication required."));
        }
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .map(user -> ResponseEntity.ok(ApiResponse.success(UserDto.fromEntity(user), "User fetched successfully.")))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "User not found.")));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<Map<String, String>>> verifyOtp(@RequestBody Map<String, String> payload) {
        String otp = payload.get("otp");
        String email = payload.getOrDefault("email", "");
        if (otp == null || otp.length() != 6) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(400, "Invalid OTP format."));
        }
        Map<String, String> data = new HashMap<>();
        data.put("status", "verified");
        data.put("email", email);
        return ResponseEntity.ok(ApiResponse.success(data, "OTP verified."));
    }

    private AuthResponseDto createAuthResponse(User user) {
        String accessToken = jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole());
        String refreshTokenValue = jwtTokenProvider.createRefreshToken(user.getId());

        RefreshToken refreshToken = new RefreshToken(
                refreshTokenValue,
                user,
                OffsetDateTime.now().plusSeconds(jwtTokenProvider.getRefreshTokenValidityInMilliseconds() / 1000)
        );
        refreshTokenRepository.save(refreshToken);

        return new AuthResponseDto(accessToken, refreshTokenValue, UserDto.fromEntity(user));
    }
}
