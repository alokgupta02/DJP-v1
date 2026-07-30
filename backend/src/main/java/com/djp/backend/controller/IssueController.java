package com.djp.backend.controller;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.djp.backend.dto.IssueCreateRequestDto;
import com.djp.backend.dto.IssueResponseDto;
import com.djp.backend.service.IssueService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Tag(name = "2. Civic Issues", description = "Civic Issues Management")
@RequestMapping("/djp/api/v1/issues")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @Operation(summary = "Get All Issues", description = "Executes the getAllIssues operation")
    @GetMapping
    public ResponseEntity<ApiResponse<List<IssueResponseDto>>> getAllIssues(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(issueService.getIssues(pageable), DjpConstant.MSG_ISSUES_RETRIEVED_SUCCESSFULLY));
    }

    @Operation(summary = "Get Issue By Id", description = "Executes the getIssueById operation")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<IssueResponseDto>> getIssueById(@PathVariable UUID id) {
        return issueService.getIssueById(id)
                .map(issue -> ResponseEntity.ok(ApiResponse.success(issue, DjpConstant.MSG_ISSUE_FETCHED_SUCCESSFULLY)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), DjpConstant.MSG_ISSUE_NOT_FOUND)));
    }

    @Operation(summary = "Create Issue", description = "Executes the createIssue operation")
    @PostMapping
    public ResponseEntity<ApiResponse<IssueResponseDto>> createIssue(
            @Valid @RequestBody IssueCreateRequestDto request,
            Authentication authentication) {

        IssueResponseDto saved = issueService.createIssue(request, authentication);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(saved, DjpConstant.MSG_ISSUE_CREATED_SUCCESSFULLY));
    }

    @Operation(summary = "Update Issue", description = "Executes the updateIssue operation")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<IssueResponseDto>> updateIssue(
            @PathVariable UUID id,
            @Valid @RequestBody com.djp.backend.dto.IssueUpdateRequestDto request,
            Authentication authentication) {
            
        return ResponseEntity.ok(ApiResponse.success(issueService.updateIssue(id, request, authentication), "Issue updated successfully."));
    }

    @Operation(summary = "Delete Issue", description = "Executes the deleteIssue operation")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteIssue(@PathVariable UUID id, Authentication authentication) {
        issueService.deleteIssue(id, authentication);
        return ResponseEntity.ok(ApiResponse.success((Void) null, DjpConstant.MSG_ISSUE_DELETED_SUCCESSFULLY));
    }
}
