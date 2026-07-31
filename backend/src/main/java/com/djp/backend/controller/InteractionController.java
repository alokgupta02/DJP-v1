package com.djp.backend.controller;

import com.djp.backend.util.DjpConstant;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.djp.backend.dto.AddCommentRequest;
import com.djp.backend.dto.ApiResponse;
import com.djp.backend.dto.ToggleFollowRequest;
import com.djp.backend.dto.ToggleVoteRequest;
import com.djp.backend.model.Comment;
import com.djp.backend.model.Follow;
import com.djp.backend.model.Vote;
import com.djp.backend.service.InteractionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@Tag(name = "8. Interactions", description = "User Interactions Management")
@RequestMapping("/djp/api/v1/interactions")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
@SuppressWarnings("null")
public class InteractionController {

    private final InteractionService interactionService;

    public InteractionController(InteractionService interactionService) {
        this.interactionService = interactionService;
    }

    @Operation(summary = "Add Comment", description = "Executes the addComment operation")
    @PostMapping("/comments")
    public ResponseEntity<ApiResponse<Comment>> addComment(
            @Valid @RequestBody AddCommentRequest payload,
            Authentication authentication) {
        Comment comment = interactionService.addComment(
            payload.content(), payload.entityId(), payload.entityType(),
            payload.parentId(), authentication);
        return ResponseEntity.ok(ApiResponse.success(comment, DjpConstant.MSG_COMMENT_ADDED_SUCCESSFULLY));
    }

    @Operation(summary = "Get Comments", description = "Executes the getComments operation")
    @GetMapping("/comments")
    public ResponseEntity<ApiResponse<List<Comment>>> getComments(
            @RequestParam UUID entityId,
            @RequestParam String entityType) {
        return ResponseEntity.ok(ApiResponse.success(
            interactionService.getComments(entityId, entityType), "Comments retrieved successfully."));
    }

    @Operation(summary = "Toggle Vote", description = "Executes the toggleVote operation")
    @PostMapping("/votes")
    public ResponseEntity<ApiResponse<Vote>> toggleVote(
            @Valid @RequestBody ToggleVoteRequest payload,
            Authentication authentication) {
        Vote vote = interactionService.toggleVote(
            payload.entityId(), payload.entityType(), payload.value(), authentication);
        return ResponseEntity.ok(ApiResponse.success(vote, DjpConstant.MSG_VOTE_TOGGLED_SUCCESSFULLY));
    }

    @Operation(summary = "Toggle Follow", description = "Executes the toggleFollow operation")
    @PostMapping("/follows")
    public ResponseEntity<ApiResponse<Follow>> toggleFollow(
            @Valid @RequestBody ToggleFollowRequest payload,
            Authentication authentication) {
        Follow follow = interactionService.toggleFollow(
            payload.targetId(), payload.targetType(), authentication);
        return ResponseEntity.ok(ApiResponse.success(follow, DjpConstant.MSG_FOLLOW_TOGGLED_SUCCESSFULLY));
    }
}
