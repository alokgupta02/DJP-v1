package com.djp.backend.controller;

import com.djp.backend.dto.UserDto;
import com.djp.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/djp/api/v1/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class AuthController {

    private final UserRepository userRepository;
    private final com.djp.backend.security.JwtTokenProvider jwtTokenProvider;

    public AuthController(UserRepository userRepository, com.djp.backend.security.JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/google")
    public ResponseEntity<Map<String, String>> initiateGoogleLogin() {
        Map<String, String> response = new HashMap<>();
        response.put("provider", "google");
        response.put("redirectUrl", "/oauth2/authorization/google");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/github")
    public ResponseEntity<Map<String, String>> initiateGithubLogin() {
        Map<String, String> response = new HashMap<>();
        response.put("provider", "github");
        response.put("redirectUrl", "/oauth2/authorization/github");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/dev-login")
    public ResponseEntity<Map<String, Object>> devLogin(@RequestParam(defaultValue = "citizen@djp.org") String email) {
        return userRepository.findByEmail(email)
                .map(user -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole()));
                    response.put("user", new UserDto(
                            user.getId(),
                            user.getEmail(),
                            user.getName(),
                            null,
                            user.getRole()
                    ));
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    com.djp.backend.model.User newUser = new com.djp.backend.model.User(
                            email,
                            "Prototype Dev User",
                            "DEV",
                            "dev-" + email
                    );
                    newUser.setRole("CITIZEN");
                    newUser.setOnboardingCompleted(true);
                    newUser.setSubscriptionStatus("ACTIVE");
                    newUser.setReputationScore(0);
                    userRepository.save(newUser);
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", jwtTokenProvider.createToken(newUser.getId(), newUser.getEmail(), newUser.getRole()));
                    response.put("user", new UserDto(
                            newUser.getId(),
                            newUser.getEmail(),
                            newUser.getName(),
                            null,
                            newUser.getRole()
                    ));
                    return ResponseEntity.ok(response);
                });
    }

    @GetMapping("/me")
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
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}
