package com.djp.backend.service;

import com.djp.backend.dto.AuthResponseDto;
import com.djp.backend.dto.UserDto;
import com.djp.backend.exception.ResourceNotFoundException;
import com.djp.backend.model.RefreshToken;
import com.djp.backend.model.User;
import com.djp.backend.repository.RefreshTokenRepository;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.security.JwtTokenProvider;
import org.springframework.security.core.Authentication;
import com.djp.backend.exception.UnauthorizedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.Map;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public AuthResponseDto register(String email, String name) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }
        User user = new User();
        user.setEmail(email);
        user.setName(name != null ? name : email.split("@")[0]);
        user.setProvider("DEV");
        user.setProviderId("dev-" + email);
        user.setRole("CITIZEN");
        user.setOnboardingCompleted(false);
        user.setSubscriptionStatus("ACTIVE");
        User saved = userRepository.save(user);
        return createAuthResponse(saved);
    }

    public AuthResponseDto devLogin(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
        return createAuthResponse(user);
    }

    public AuthResponseDto refreshToken(String refreshTokenValue) {
        RefreshToken stored = refreshTokenRepository.findByToken(refreshTokenValue)
                .filter(t -> !t.isRevoked())
                .filter(t -> t.getExpiresAt().isAfter(OffsetDateTime.now()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired refresh token"));

        stored.setRevoked(true);
        refreshTokenRepository.save(stored);

        return createAuthResponse(stored.getUser());
    }

    public UserDto getMe(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("Authentication required.");
        }
        return userRepository.findByEmail(authentication.getName())
                .map(UserDto::fromEntity)
                .orElseThrow(() -> new UnauthorizedException("User not found"));
    }

    public Map<String, String> verifyOtp(String otp, String email) {
        if (otp == null || otp.length() != 6) {
            throw new IllegalArgumentException("Invalid OTP format");
        }
        return Map.of("status", "verified", "email", email != null ? email : "");
    }

    public Map<String, String> initiateGoogleLogin() {
        return Map.of("provider", "google", "redirectUrl", "/oauth2/authorization/google");
    }

    public Map<String, String> initiateGithubLogin() {
        return Map.of("provider", "github", "redirectUrl", "/oauth2/authorization/github");
    }

    public AuthResponseDto createAuthResponse(User user) {
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
