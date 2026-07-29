package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.djp.backend.dto.RepresentativeResponseDto;
import com.djp.backend.service.RepresentativeService;
import org.springframework.data.domain.Page;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "10. Representatives", description = "Representatives Management")
@RequestMapping("/djp/api/v1/representatives")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class RepresentativeController {

    private final RepresentativeService representativeService;

    public RepresentativeController(RepresentativeService representativeService) {
        this.representativeService = representativeService;
    }

    @Operation(summary = "Get All Representatives", description = "Executes the getAllRepresentatives operation")
    @GetMapping
    public ResponseEntity<ApiResponse<List<RepresentativeResponseDto>>> getAllRepresentatives(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(
                representativeService.getRepresentatives(pageable), "Representatives retrieved."));
    }
}
