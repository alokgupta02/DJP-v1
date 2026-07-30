package com.djp.backend.controller;

import com.djp.backend.util.DjpConstant;
import com.djp.backend.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.djp.backend.dto.DiscussionCreateRequestDto;
import com.djp.backend.dto.DiscussionResponseDto;
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
@Tag(name = "3. Discussions", description = "Discussion Forums Management")
@RequestMapping("/djp/api/v1/discussions")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class DiscussionController {

    private final DiscussionService discussionService;

    public DiscussionController(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @Operation(summary = "Get All Discussions", description = "Executes the getAllDiscussions operation")
    @GetMapping
    public ResponseEntity<ApiResponse<List<DiscussionResponseDto>>> getAllDiscussions(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(discussionService.getDiscussions(pageable), DjpConstant.MSG_DISCUSSIONS_RETRIEVED_SUCCESSFULLY));
    }

    @Operation(summary = "Get Discussion By Id", description = "Executes the getDiscussionById operation")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DiscussionResponseDto>> getDiscussionById(@PathVariable UUID id) {
        return discussionService.getDiscussionById(id)
                .map(discussion -> ResponseEntity.ok(ApiResponse.success(discussion, DjpConstant.MSG_DISCUSSION_FETCHED_SUCCESSFULLY)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), DjpConstant.MSG_DISCUSSION_NOT_FOUND)));
    }

    @Operation(summary = "Create Discussion", description = "Executes the createDiscussion operation")
    @PostMapping
    public ResponseEntity<ApiResponse<DiscussionResponseDto>> createDiscussion(
            @Valid @RequestBody DiscussionCreateRequestDto request,
            Authentication authentication) {

        DiscussionResponseDto saved = discussionService.createDiscussion(request, authentication);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(saved, DjpConstant.MSG_DISCUSSION_CREATED_SUCCESSFULLY));
    }

    @Operation(summary = "Update Discussion", description = "Executes the updateDiscussion operation")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DiscussionResponseDto>> updateDiscussion(
            @PathVariable UUID id,
            @Valid @RequestBody com.djp.backend.dto.DiscussionUpdateRequestDto request,
            Authentication authentication) {
            
        return ResponseEntity.ok(ApiResponse.success(discussionService.updateDiscussion(id, request, authentication), "Discussion updated successfully."));
    }

    @Operation(summary = "Delete Discussion", description = "Executes the deleteDiscussion operation")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDiscussion(@PathVariable UUID id, Authentication authentication) {
        discussionService.deleteDiscussion(id, authentication);
        return ResponseEntity.ok(ApiResponse.success((Void) null, DjpConstant.MSG_DISCUSSION_DELETED_SUCCESSFULLY));
    }
}
