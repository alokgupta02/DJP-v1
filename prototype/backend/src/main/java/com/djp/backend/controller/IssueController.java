package com.djp.backend.controller;

import com.djp.backend.dto.IssueCreateRequestDto;
import com.djp.backend.model.Issue;
import com.djp.backend.model.User;
import com.djp.backend.repository.IssueRepository;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.service.AuditLogService;
import com.djp.backend.service.SqlFilePersistenceService;
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
public class IssueController {

    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final AuditLogService auditLogService;
    private final SqlFilePersistenceService sqlFilePersistenceService;

    public IssueController(IssueRepository issueRepository, UserRepository userRepository, AuditLogService auditLogService, SqlFilePersistenceService sqlFilePersistenceService) {
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
        this.auditLogService = auditLogService;
        this.sqlFilePersistenceService = sqlFilePersistenceService;
    }

    @GetMapping
    public ResponseEntity<List<Issue>> getAllIssues() {
        return ResponseEntity.ok(issueRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable UUID id) {
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

        auditLogService.logAction(
                author.getId().toString(),
                "CREATE_ISSUE",
                "Issue",
                saved.getId().toString(),
                "Title: " + saved.getTitle() + ", Category: " + saved.getCategory()
        );

        sqlFilePersistenceService.appendIssue(saved);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
