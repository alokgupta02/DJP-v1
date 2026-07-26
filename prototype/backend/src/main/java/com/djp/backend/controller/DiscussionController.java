package com.djp.backend.controller;

import com.djp.backend.dto.DiscussionCreateRequestDto;
import com.djp.backend.dto.DiscussionResponseDto;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.service.DiscussionService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1/discussions")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class DiscussionController {

    private final DiscussionService discussionService;
    private final UserRepository userRepository;

    public DiscussionController(DiscussionService discussionService, UserRepository userRepository) {
        this.discussionService = discussionService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<Page<DiscussionResponseDto>> getAllDiscussions(Pageable pageable) {
        return ResponseEntity.ok(discussionService.getDiscussions(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiscussionResponseDto> getDiscussionById(@PathVariable UUID id) {
        return discussionService.getDiscussionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DiscussionResponseDto> createDiscussion(
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

        DiscussionResponseDto saved = discussionService.createDiscussion(request, author);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
