package com.djp.backend.controller;

import com.djp.backend.model.Comment;
import com.djp.backend.model.Follow;
import com.djp.backend.model.Vote;
import com.djp.backend.service.InteractionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1/interactions")
public class InteractionController {

    private final InteractionService interactionService;
    private final com.djp.backend.repository.UserRepository userRepository;

    public InteractionController(InteractionService interactionService, com.djp.backend.repository.UserRepository userRepository) {
        this.interactionService = interactionService;
        this.userRepository = userRepository;
    }

    private UUID getUserId(org.springframework.security.core.Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            throw new org.springframework.security.access.AccessDeniedException("Not authenticated");
        }
        com.djp.backend.model.User user = userRepository.findByEmail(authentication.getName())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getId();
    }

    @PostMapping("/comments")
    public ResponseEntity<Comment> addComment(
            @RequestBody Map<String, String> payload,
            org.springframework.security.core.Authentication authentication) {
        
        UUID userId = getUserId(authentication);
        String content = payload.get("content");
        UUID entityId = UUID.fromString(payload.get("entityId"));
        String entityType = payload.get("entityType");
        UUID parentId = payload.containsKey("parentId") && payload.get("parentId") != null ? 
                UUID.fromString(payload.get("parentId")) : null;

        Comment comment = interactionService.addComment(content, entityId, entityType, parentId, userId);
        return ResponseEntity.ok(comment);
    }

    @GetMapping("/comments")
    public ResponseEntity<List<Comment>> getComments(
            @RequestParam UUID entityId,
            @RequestParam String entityType) {
        return ResponseEntity.ok(interactionService.getComments(entityId, entityType));
    }

    @PostMapping("/votes")
    public ResponseEntity<Vote> toggleVote(
            @RequestBody Map<String, Object> payload,
            org.springframework.security.core.Authentication authentication) {
        
        UUID userId = getUserId(authentication);
        UUID entityId = UUID.fromString(payload.get("entityId").toString());
        String entityType = payload.get("entityType").toString();
        int value = Integer.parseInt(payload.get("value").toString());

        Vote vote = interactionService.toggleVote(entityId, entityType, value, userId);
        return ResponseEntity.ok(vote);
    }

    @PostMapping("/follows")
    public ResponseEntity<Follow> toggleFollow(
            @RequestBody Map<String, String> payload,
            org.springframework.security.core.Authentication authentication) {
        
        UUID userId = getUserId(authentication);
        UUID targetId = UUID.fromString(payload.get("targetId"));
        String targetType = payload.get("targetType");

        Follow follow = interactionService.toggleFollow(targetId, targetType, userId);
        return ResponseEntity.ok(follow);
    }
}
