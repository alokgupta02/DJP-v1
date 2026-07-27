package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;
import com.djp.backend.dto.InsightsResponseDto;
import com.djp.backend.service.InsightsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/djp/api/v1/insights")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class InsightsController {

    private final InsightsService insightsService;

    public InsightsController(InsightsService insightsService) {
        this.insightsService = insightsService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<InsightsResponseDto>> getInsights() {
        return ResponseEntity.ok(ApiResponse.success(insightsService.getInsights(), "Insights retrieved."));
    }
}
