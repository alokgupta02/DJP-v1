package com.djp.backend.controller;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.djp.backend.dto.InsightsResponseDto;
import com.djp.backend.service.InsightsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "11. Insights", description = "System Insights Management")
@RequestMapping("/djp/api/v1/insights")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class InsightsController {

    private final InsightsService insightsService;

    public InsightsController(InsightsService insightsService) {
        this.insightsService = insightsService;
    }

    @Operation(summary = "Get Insights", description = "Executes the getInsights operation")
    @GetMapping
    public ResponseEntity<ApiResponse<InsightsResponseDto>> getInsights() {
        return ResponseEntity.ok(ApiResponse.success(insightsService.getInsights(), DjpConstant.MSG_INSIGHTS_RETRIEVED));
    }
}
