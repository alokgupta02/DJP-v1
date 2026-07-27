package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;
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
@RequestMapping("/djp/api/v1/issues")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class IssueController {

    private final IssueService issueService;
    private final UserRepository userRepository;

    public IssueController(IssueService issueService, UserRepository userRepository) {
        this.issueService = issueService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<IssueResponseDto>>> getAllIssues(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(issueService.getIssues(pageable), "Issues retrieved successfully."));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<IssueResponseDto>> getIssueById(@PathVariable UUID id) {
        return issueService.getIssueById(id)
                .map(issue -> ResponseEntity.ok(ApiResponse.success(issue, "Issue fetched successfully.")))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Issue not found.")));
    }

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
