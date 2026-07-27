package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;
import com.djp.backend.dto.RepresentativeResponseDto;
import com.djp.backend.service.RepresentativeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/djp/api/v1/representatives")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class RepresentativeController {

    private final RepresentativeService representativeService;

    public RepresentativeController(RepresentativeService representativeService) {
        this.representativeService = representativeService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RepresentativeResponseDto>>> getAllRepresentatives() {
        return ResponseEntity.ok(ApiResponse.success(
                representativeService.getRepresentatives(), "Representatives retrieved."));
    }
}
