package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;
import com.djp.backend.service.UserStatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class UserStatsController {

    private final UserStatsService userStatsService;

    public UserStatsController(UserStatsService userStatsService) {
        this.userStatsService = userStatsService;
    }

    @GetMapping("/users/{userId}/stats")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getUserStats(@PathVariable UUID userId) {
        return ResponseEntity.ok(ApiResponse.success(userStatsService.getUserStats(userId), "User stats retrieved."));
    }
}
