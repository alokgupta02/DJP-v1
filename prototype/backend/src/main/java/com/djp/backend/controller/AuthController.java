package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;
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
    public ResponseEntity<ApiResponse<Map<String, Object>>> devLogin(@RequestParam(defaultValue = "citizen@djp.org") String email) {
        return userRepository.findByEmail(email)
                .map(user -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRole()));
                    response.put("user", UserDto.fromEntity(user));
                    return ResponseEntity.ok(ApiResponse.success(response, "Login successful."));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Invalid credentials.")));
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

}
