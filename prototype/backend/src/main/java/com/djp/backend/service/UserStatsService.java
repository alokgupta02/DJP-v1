package com.djp.backend.service;

import com.djp.backend.repository.DiscussionRepository;
import com.djp.backend.repository.IssueRepository;
import com.djp.backend.repository.PollRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class UserStatsService {

    private final IssueRepository issueRepository;
    private final DiscussionRepository discussionRepository;
    private final PollRepository pollRepository;

    public UserStatsService(IssueRepository issueRepository,
                            DiscussionRepository discussionRepository,
                            PollRepository pollRepository) {
        this.issueRepository = issueRepository;
        this.discussionRepository = discussionRepository;
        this.pollRepository = pollRepository;
    }

    /**
     * Retrieves user stats from the system.
     * Returns the appropriate response or status based on the operation.
     */
    public Map<String, Long> getUserStats(UUID userId) {
        long issuesCount = issueRepository.findAll().stream()
                .filter(i -> i.getAuthor() != null && userId.equals(i.getAuthor().getId())).count();
        long discussionsCount = discussionRepository.findAll().stream()
                .filter(d -> d.getAuthor() != null && userId.equals(d.getAuthor().getId())).count();
        long pollsCount = pollRepository.findAll().stream()
                .filter(p -> p.getAuthor() != null && userId.equals(p.getAuthor().getId())).count();
        return Map.of(
            "issuesReported", issuesCount,
            "discussionsCreated", discussionsCount,
            "pollsCreated", pollsCount
        );
    }
}
