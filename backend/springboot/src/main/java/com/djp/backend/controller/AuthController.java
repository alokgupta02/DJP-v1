package com.djp.backend.controller;

import com.djp.backend.dto.UserDto;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.security.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/djp/api/v1/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
@Tag(name = "1. Auth & Identity", description = "Authentication endpoints for developer login, OAuth2 redirection, and citizen profile verification.")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/dev-login")
    @Operation(
        summary = "Developer Authentication & JWT Issuance",
        description = "Issues a signed JWT token for local/dev testing. If the email does not exist, creates a local citizen profile automatically."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Successfully issued JWT token and user profile"),
        @ApiResponse(responseCode = "400", description = "Invalid email parameter")
    })
    public ResponseEntity<Map<String, Object>> devLogin(
            @Parameter(description = "Citizen or admin email to issue JWT for", example = "citizen@djp.org")
            @RequestParam(defaultValue = "citizen@djp.org") String email) {

        return userRepository.findByEmail(email)
                .map(user -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole()));
                    response.put("user", new UserDto(user.getId(), user.getEmail(), user.getName(), null, user.getRole()));
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    User newUser = new User(email, "Development Citizen", "DEV", "dev-" + email);
                    newUser.setRole("CITIZEN");
                    newUser.setOnboardingCompleted(true);
                    newUser.setSubscriptionStatus("ACTIVE");
                    newUser.setReputationScore(0);
                    userRepository.save(newUser);

                    Map<String, Object> response = new HashMap<>();
                    response.put("token", jwtTokenProvider.createToken(newUser.getId(), newUser.getEmail(), newUser.getRole()));
                    response.put("user", new UserDto(newUser.getId(), newUser.getEmail(), newUser.getName(), null, newUser.getRole()));
                    return ResponseEntity.ok(response);
                });
    }

    @GetMapping("/google")
    @Operation(summary = "Initiate Google OAuth2 Login", description = "Returns redirect details for Google OAuth2 authentication flow.")
    @ApiResponse(responseCode = "200", description = "Successfully returned OAuth2 provider redirect URL")
    public ResponseEntity<Map<String, String>> initiateGoogleLogin() {
        Map<String, String> response = new HashMap<>();
        response.put("provider", "google");
        response.put("redirectUrl", "/oauth2/authorization/google");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/github")
    @Operation(summary = "Initiate GitHub OAuth2 Login", description = "Returns redirect details for GitHub OAuth2 authentication flow.")
    @ApiResponse(responseCode = "200", description = "Successfully returned OAuth2 provider redirect URL")
    public ResponseEntity<Map<String, String>> initiateGithubLogin() {
        Map<String, String> response = new HashMap<>();
        response.put("provider", "github");
        response.put("redirectUrl", "/oauth2/authorization/github");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    @Operation(
        summary = "Get current authenticated citizen profile",
        description = "Returns the citizen user profile mapped to the Bearer JWT token provided in the Authorization header.",
        security = @SecurityRequirement(name = "BearerAuth")
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Successfully retrieved profile details"),
        @ApiResponse(responseCode = "401", description = "Unauthorized - Missing or expired JWT token")
    })
    public ResponseEntity<UserDto> getMe(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .map(user -> ResponseEntity.ok(new UserDto(
                        user.getId(),
                        user.getEmail(),
                        user.getName(),
                        null,
                        user.getRole()
                )))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}
