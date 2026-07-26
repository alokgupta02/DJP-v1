package com.djp.backend.controller;

import com.djp.backend.dto.IssueCreateRequestDto;
import com.djp.backend.dto.IssueResponseDto;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.service.IssueService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Page<IssueResponseDto>> getAllIssues(Pageable pageable) {
        return ResponseEntity.ok(issueService.getIssues(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<IssueResponseDto> getIssueById(@PathVariable UUID id) {
        return issueService.getIssueById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<IssueResponseDto> createIssue(
            @Valid @RequestBody IssueCreateRequestDto request,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        User author = userRepository.findByEmail(email).orElse(null);

        if (author == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        IssueResponseDto saved = issueService.createIssue(request, author);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
