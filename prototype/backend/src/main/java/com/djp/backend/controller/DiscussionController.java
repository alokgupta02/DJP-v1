package com.djp.backend.controller;

import com.djp.backend.dto.DiscussionCreateRequestDto;
import com.djp.backend.model.Discussion;
import com.djp.backend.model.User;
import com.djp.backend.repository.DiscussionRepository;
import com.djp.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1/discussions")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class DiscussionController {

    private final DiscussionRepository discussionRepository;
    private final UserRepository userRepository;
    private final com.djp.backend.service.AuditLogService auditLogService;

    public DiscussionController(DiscussionRepository discussionRepository, UserRepository userRepository, com.djp.backend.service.AuditLogService auditLogService) {
        this.discussionRepository = discussionRepository;
        this.userRepository = userRepository;
        this.auditLogService = auditLogService;
    }

    @GetMapping
    public ResponseEntity<List<Discussion>> getAllDiscussions() {
        return ResponseEntity.ok(discussionRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Discussion> getDiscussionById(@PathVariable UUID id) {
        return discussionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Discussion> createDiscussion(
            @Valid @RequestBody DiscussionCreateRequestDto request,
            Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        User author = userRepository.findByEmail(email).orElse(null);

        if (author == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Discussion discussion = new Discussion(
                author,
                request.getTitle(),
                request.getDescription(),
                request.getCategory()
        );
        if (request.getProposalPreview() != null) {
            discussion.setProposalPreview(request.getProposalPreview());
        }
        if (request.getProposalBadge() != null) {
            discussion.setProposalBadge(request.getProposalBadge());
        }

        Discussion saved = discussionRepository.save(discussion);

        auditLogService.logAction(
                author.getId().toString(),
                "CREATE_DISCUSSION",
                "Discussion",
                saved.getId().toString(),
                "Title: " + saved.getTitle() + ", Category: " + saved.getCategory()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
