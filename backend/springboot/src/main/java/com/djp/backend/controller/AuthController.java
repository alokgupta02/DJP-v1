package com.djp.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/djp/api/v1/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class AuthController {

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
}
