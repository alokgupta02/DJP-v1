package com.djp.backend.controller;

import com.djp.backend.dto.IssueCreateRequestDto;
import com.djp.backend.model.Issue;
import com.djp.backend.model.User;
import com.djp.backend.repository.IssueRepository;
import com.djp.backend.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1/issues")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
@Tag(name = "2. Civic Issues", description = "Endpoints for reporting, querying, and inspecting civic issues across municipal wards.")
public class IssueController {

    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final com.djp.backend.service.AuditLogService auditLogService;

    public IssueController(IssueRepository issueRepository, UserRepository userRepository, com.djp.backend.service.AuditLogService auditLogService) {
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
        this.auditLogService = auditLogService;
    }

    @GetMapping
    @Operation(summary = "List all civic issues", description = "Retrieves public list of reported civic issues across all wards.")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved issues list")
    public ResponseEntity<List<Issue>> getAllIssues() {
        return ResponseEntity.ok(issueRepository.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get civic issue by UUID", description = "Retrieves specific civic issue details, location, and priority status.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Successfully retrieved issue"),
        @ApiResponse(responseCode = "404", description = "Civic issue not found")
    })
    public ResponseEntity<Issue> getIssueById(@Parameter(description = "UUID of the civic issue to retrieve") @PathVariable UUID id) {
        return issueRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(
        summary = "Create a new civic issue",
        description = "Reports a new civic issue. Requires a valid JWT Bearer token issued by `/djp/api/v1/auth/dev-login` or OAuth2 login.",
        security = @SecurityRequirement(name = "BearerAuth")
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Civic issue created successfully"),
        @ApiResponse(responseCode = "400", description = "Validation failure on title, description, or category"),
        @ApiResponse(responseCode = "401", description = "Unauthorized - Missing or invalid Bearer JWT token")
    })
    public ResponseEntity<Issue> createIssue(
            @Valid @RequestBody IssueCreateRequestDto request,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .map(author -> {
                    Issue issue = new Issue(
                            author,
                            request.title(),
                            request.description(),
                            request.category(),
                            request.priority()
                    );
                    issue.setLocation(request.location());

                    Issue saved = issueRepository.save(issue);

                    auditLogService.logAction(
                            author.getId().toString(),
                            "CREATE_ISSUE",
                            "Issue",
                            saved.getId().toString(),
                            "Title: " + saved.getTitle() + ", Category: " + saved.getCategory()
                    );

                    return ResponseEntity.status(HttpStatus.CREATED).body(saved);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}
