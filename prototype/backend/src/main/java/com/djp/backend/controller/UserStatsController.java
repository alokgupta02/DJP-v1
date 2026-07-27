package com.djp.backend.controller;

import com.djp.backend.dto.ApiResponse;
import com.djp.backend.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/djp/api/v1")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class UserStatsController {

    private final IssueRepository issueRepository;
    private final DiscussionRepository discussionRepository;
    private final PollRepository pollRepository;

    public UserStatsController(IssueRepository issueRepository,
                               DiscussionRepository discussionRepository,
                               PollRepository pollRepository) {
        this.issueRepository = issueRepository;
        this.discussionRepository = discussionRepository;
        this.pollRepository = pollRepository;
    }

    @GetMapping("/users/{userId}/stats")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getUserStats(@PathVariable UUID userId) {
        long issuesCount = issueRepository.findAll().stream()
                .filter(i -> i.getAuthor() != null && userId.equals(i.getAuthor().getId())).count();
        long discussionsCount = discussionRepository.findAll().stream()
                .filter(d -> d.getAuthor() != null && userId.equals(d.getAuthor().getId())).count();
        long pollsCount = pollRepository.findAll().stream()
                .filter(p -> p.getAuthor() != null && userId.equals(p.getAuthor().getId())).count();
        Map<String, Long> stats = Map.of(
            "issuesReported", issuesCount,
            "discussionsCreated", discussionsCount,
            "pollsCreated", pollsCount
        );
        return ResponseEntity.ok(ApiResponse.success(stats, "User stats retrieved."));
    }
}
