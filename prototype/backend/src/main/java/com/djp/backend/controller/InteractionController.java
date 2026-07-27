package com.djp.backend.controller;

import com.djp.backend.dto.*;
import com.djp.backend.model.Comment;
import com.djp.backend.model.Follow;
import com.djp.backend.model.User;
import com.djp.backend.model.Vote;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.service.InteractionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1/interactions")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class InteractionController {

    private final InteractionService interactionService;
    private final UserRepository userRepository;

    public InteractionController(InteractionService interactionService, UserRepository userRepository) {
        this.interactionService = interactionService;
        this.userRepository = userRepository;
    }

    private User getUser(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            throw new AccessDeniedException("Not authenticated");
        }
        return userRepository.findByEmail(authentication.getName())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @PostMapping("/comments")
    public ResponseEntity<ApiResponse<Comment>> addComment(
            @Valid @RequestBody AddCommentRequest payload,
            Authentication authentication) {
        try {
            User user = getUser(authentication);
            Comment comment = interactionService.addComment(
                payload.content(), payload.entityId(), payload.entityType(),
                payload.parentId(), user.getId());
            return ResponseEntity.ok(ApiResponse.success(comment, "Comment added successfully."));
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(401).body(ApiResponse.error(401, "Not authenticated"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }

    @GetMapping("/comments")
    public ResponseEntity<ApiResponse<List<Comment>>> getComments(
            @RequestParam UUID entityId,
            @RequestParam String entityType) {
        return ResponseEntity.ok(ApiResponse.success(
            interactionService.getComments(entityId, entityType), "Comments retrieved successfully."));
    }

    @PostMapping("/votes")
    public ResponseEntity<ApiResponse<Vote>> toggleVote(
            @Valid @RequestBody ToggleVoteRequest payload,
            Authentication authentication) {
        try {
            User user = getUser(authentication);
            Vote vote = interactionService.toggleVote(
                payload.entityId(), payload.entityType(), payload.value(), user.getId());
            return ResponseEntity.ok(ApiResponse.success(vote, "Vote toggled successfully."));
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(401).body(ApiResponse.error(401, "Not authenticated"));
        }
    }

    @PostMapping("/follows")
    public ResponseEntity<ApiResponse<Follow>> toggleFollow(
            @Valid @RequestBody ToggleFollowRequest payload,
            Authentication authentication) {
        try {
            User user = getUser(authentication);
            Follow follow = interactionService.toggleFollow(
                payload.targetId(), payload.targetType(), user.getId());
            return ResponseEntity.ok(ApiResponse.success(follow, "Follow toggled successfully."));
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(401).body(ApiResponse.error(401, "Not authenticated"));
        }
    }
}
