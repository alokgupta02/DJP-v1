package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.djp.backend.dto.IssueCreateRequestDto;
import com.djp.backend.dto.IssueResponseDto;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
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
    private final UserRepository userRepository;

    public IssueController(IssueService issueService, UserRepository userRepository) {
        this.issueService = issueService;
        this.userRepository = userRepository;
    }

    @Operation(summary = "Get All Issues", description = "Executes the getAllIssues operation")
    @GetMapping
    public ResponseEntity<ApiResponse<List<IssueResponseDto>>> getAllIssues(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(issueService.getIssues(pageable), "Issues retrieved successfully."));
    }

    @Operation(summary = "Get Issue By Id", description = "Executes the getIssueById operation")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<IssueResponseDto>> getIssueById(@PathVariable UUID id) {
        return issueService.getIssueById(id)
                .map(issue -> ResponseEntity.ok(ApiResponse.success(issue, "Issue fetched successfully.")))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Issue not found.")));
    }

    @Operation(summary = "Create Issue", description = "Executes the createIssue operation")
    @PostMapping
    public ResponseEntity<ApiResponse<IssueResponseDto>> createIssue(
            @Valid @RequestBody IssueCreateRequestDto request,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Authentication required."));
        }

        String email = authentication.getName();
        User author = userRepository.findByEmail(email).orElse(null);

        if (author == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "User not found."));
        }

        IssueResponseDto saved = issueService.createIssue(request, author);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(saved, "Issue created successfully."));
    }

    @Operation(summary = "Update Issue", description = "Executes the updateIssue operation")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<IssueResponseDto>> updateIssue(
            @PathVariable UUID id,
            @Valid @RequestBody com.djp.backend.dto.IssueUpdateRequestDto request,
            Authentication authentication) {
            
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Authentication required."));
        }
        
        User author = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (author == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "User not found."));
        }
        
        try {
            return ResponseEntity.ok(ApiResponse.success(issueService.updateIssue(id, request, author), "Issue updated successfully."));
        } catch (org.springframework.security.access.AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error(HttpStatus.FORBIDDEN.value(), "Not authorized to update this issue."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Issue not found."));
        }
    }

    @Operation(summary = "Delete Issue", description = "Executes the deleteIssue operation")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteIssue(@PathVariable UUID id, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Authentication required."));
        }
        
        User author = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (author == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "User not found."));
        }
        
        try {
            issueService.deleteIssue(id, author);
            return ResponseEntity.ok(ApiResponse.success((Void) null, "Issue deleted successfully."));
        } catch (org.springframework.security.access.AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error(HttpStatus.FORBIDDEN.value(), "Not authorized to delete this issue."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Issue not found."));
        }
    }
}
