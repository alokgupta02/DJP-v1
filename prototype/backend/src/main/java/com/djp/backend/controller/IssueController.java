package com.djp.backend.controller;

import com.djp.backend.dto.IssueCreateRequestDto;
import com.djp.backend.model.Issue;
import com.djp.backend.model.User;
import com.djp.backend.repository.IssueRepository;
import com.djp.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/djp/api/v1/issues")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
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
    public ResponseEntity<java.util.List<Issue>> getAllIssues() {
        return ResponseEntity.ok(issueRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable java.util.UUID id) {
        return issueRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Issue> createIssue(
            @Valid @RequestBody IssueCreateRequestDto request,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        User author = userRepository.findByEmail(email)
                .orElse(null);

        if (author == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Issue issue = new Issue(
                author,
                request.getTitle(),
                request.getDescription(),
                request.getCategory(),
                request.getPriority()
        );
        issue.setLocation(request.getLocation());

        Issue saved = issueRepository.save(issue);

        // Audit the mutation
        auditLogService.logAction(
                author.getId().toString(),
                "CREATE_ISSUE",
                "Issue",
                saved.getId().toString(),
                "Title: " + saved.getTitle() + ", Category: " + saved.getCategory()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
