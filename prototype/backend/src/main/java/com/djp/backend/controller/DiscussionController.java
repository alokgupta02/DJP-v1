package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;
import com.djp.backend.dto.DiscussionCreateRequestDto;
import com.djp.backend.dto.DiscussionResponseDto;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.service.DiscussionService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
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

    private final DiscussionService discussionService;
    private final UserRepository userRepository;

    public DiscussionController(DiscussionService discussionService, UserRepository userRepository) {
        this.discussionService = discussionService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DiscussionResponseDto>>> getAllDiscussions(Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.getDiscussions(pageable), "Discussions retrieved successfully."));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DiscussionResponseDto>> getDiscussionById(@PathVariable UUID id) {
        return discussionService.getDiscussionById(id)
                .map(discussion -> ResponseEntity.ok(ApiResponse.success(discussion, "Discussion fetched successfully.")))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Discussion not found.")));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<DiscussionResponseDto>> createDiscussion(
            @Valid @RequestBody DiscussionCreateRequestDto request,
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

        DiscussionResponseDto saved = discussionService.createDiscussion(request, author);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(saved, "Discussion created successfully."));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DiscussionResponseDto>> updateDiscussion(
            @PathVariable UUID id,
            @Valid @RequestBody com.djp.backend.dto.DiscussionUpdateRequestDto request,
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
            return ResponseEntity.ok(ApiResponse.success(discussionService.updateDiscussion(id, request, author), "Discussion updated successfully."));
        } catch (org.springframework.security.access.AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error(HttpStatus.FORBIDDEN.value(), "Not authorized to update this discussion."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Discussion not found."));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDiscussion(@PathVariable UUID id, Authentication authentication) {
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
            discussionService.deleteDiscussion(id, author);
            return ResponseEntity.ok(ApiResponse.success((Void) null, "Discussion deleted successfully."));
        } catch (org.springframework.security.access.AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error(HttpStatus.FORBIDDEN.value(), "Not authorized to delete this discussion."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Discussion not found."));
        }
    }
}
