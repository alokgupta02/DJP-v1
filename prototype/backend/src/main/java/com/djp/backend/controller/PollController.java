package com.djp.backend.controller;

import com.djp.backend.dto.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
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

    public PollController(PollService pollService) {
        this.pollService = pollService;
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
        PollResponseDto result = pollService.castVote(id, payload.optionIndex(), authentication);
        return ResponseEntity.ok(ApiResponse.success(result, "Vote cast successfully."));
    }

    @Operation(summary = "Create Poll", description = "Executes the createPoll operation")
    @PostMapping
    public ResponseEntity<ApiResponse<PollResponseDto>> createPoll(
            @Valid @RequestBody PollCreateRequestDto request,
            Authentication authentication) {

        PollResponseDto saved = pollService.createPoll(request, authentication);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(saved, "Poll created successfully."));
    }

    @Operation(summary = "Update Poll", description = "Executes the updatePoll operation")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PollResponseDto>> updatePoll(
            @PathVariable UUID id,
            @Valid @RequestBody com.djp.backend.dto.PollUpdateRequestDto request,
            Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(pollService.updatePoll(id, request, authentication), "Poll updated successfully."));
    }

    @Operation(summary = "Delete Poll", description = "Executes the deletePoll operation")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePoll(@PathVariable UUID id, Authentication authentication) {
        pollService.deletePoll(id, authentication);
        return ResponseEntity.ok(ApiResponse.success((Void) null, "Poll deleted successfully."));
    }
}
