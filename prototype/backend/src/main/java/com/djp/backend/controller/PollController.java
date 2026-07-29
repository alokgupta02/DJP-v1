package com.djp.backend.controller;

import com.djp.backend.dto.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.djp.backend.model.User;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.service.PollService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Tag(name = "4. Polls & Voting", description = "Polls and Voting Management")
@RequestMapping("/djp/api/v1/polls")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class PollController {

    private final PollService pollService;
    private final UserRepository userRepository;

    public PollController(PollService pollService, UserRepository userRepository) {
        this.pollService = pollService;
        this.userRepository = userRepository;
    }

    @Operation(summary = "Get All Polls", description = "Executes the getAllPolls operation")
    @GetMapping
    public ResponseEntity<ApiResponse<List<PollResponseDto>>> getAllPolls(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(pollService.getPolls(pageable), "Polls retrieved successfully."));
    }

    @Operation(summary = "Get Poll By Id", description = "Executes the getPollById operation")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PollResponseDto>> getPollById(@PathVariable UUID id) {
        return pollService.getPollById(id)
                .map(poll -> ResponseEntity.ok(ApiResponse.success(poll, "Poll fetched successfully.")))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Poll not found.")));
    }

    @Operation(summary = "Cast Vote", description = "Executes the castVote operation")
    @PostMapping("/{id}/vote")
    public ResponseEntity<ApiResponse<PollResponseDto>> castVote(
            @PathVariable UUID id,
            @Valid @RequestBody CastVoteRequest payload,
            Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "Authentication required."));
        }
        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), "User not found."));
        }
        try {
            PollResponseDto result = pollService.castVote(id, payload.optionIndex(), user);
            return ResponseEntity.ok(ApiResponse.success(result, "Vote cast successfully."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ApiResponse.error(HttpStatus.CONFLICT.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Create Poll", description = "Executes the createPoll operation")
    @PostMapping
    public ResponseEntity<ApiResponse<PollResponseDto>> createPoll(
            @Valid @RequestBody PollCreateRequestDto request,
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

        PollResponseDto saved = pollService.createPoll(request, author);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(saved, "Poll created successfully."));
    }

    @Operation(summary = "Update Poll", description = "Executes the updatePoll operation")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PollResponseDto>> updatePoll(
            @PathVariable UUID id,
            @Valid @RequestBody com.djp.backend.dto.PollUpdateRequestDto request,
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
            return ResponseEntity.ok(ApiResponse.success(pollService.updatePoll(id, request, author), "Poll updated successfully."));
        } catch (org.springframework.security.access.AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error(HttpStatus.FORBIDDEN.value(), "Not authorized to update this poll."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Poll not found."));
        }
    }

    @Operation(summary = "Delete Poll", description = "Executes the deletePoll operation")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePoll(@PathVariable UUID id, Authentication authentication) {
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
            pollService.deletePoll(id, author);
            return ResponseEntity.ok(ApiResponse.success((Void) null, "Poll deleted successfully."));
        } catch (org.springframework.security.access.AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error(HttpStatus.FORBIDDEN.value(), "Not authorized to delete this poll."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), "Poll not found."));
        }
    }
}
