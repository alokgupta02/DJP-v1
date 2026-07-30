package com.djp.backend.service;

import com.djp.backend.dto.InsightsResponseDto;
import com.djp.backend.repository.IssueRepository;
import com.djp.backend.repository.UserRepository;
import com.djp.backend.repository.VoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class InsightsService {

    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final VoteRepository voteRepository;

    public InsightsService(IssueRepository issueRepository, UserRepository userRepository, VoteRepository voteRepository) {
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
        this.voteRepository = voteRepository;
    }

    /**
     * Retrieves insights from the system.
     * Returns the appropriate response or status based on the operation.
     */
    @Transactional(readOnly = true)
    public InsightsResponseDto getInsights() {
        long totalIssues = issueRepository.count();
        long totalUsers = userRepository.count();
        long totalVotes = voteRepository.count();

        var cats = issueRepository.findAll().stream()
                .collect(java.util.stream.Collectors.groupingBy(
                    i -> i.getCategory() != null ? i.getCategory() : "Other",
                    java.util.stream.Collectors.counting()
                ));

        long maxCatCount = cats.values().stream().max(Long::compare).orElse(1L);
        List<InsightsResponseDto.CategoryBreakdown> catBreakdown = cats.entrySet().stream()
                .map(e -> new InsightsResponseDto.CategoryBreakdown(
                    e.getKey(),
                    e.getValue().intValue(),
                    (int) (e.getValue() * 100 / maxCatCount)
                ))
                .toList();

        List<InsightsResponseDto.DepartmentEfficiency> deptEfficiency = List.of(
            new InsightsResponseDto.DepartmentEfficiency("Sanitation", 92, "up"),
            new InsightsResponseDto.DepartmentEfficiency("Public Works", 78, "flat"),
            new InsightsResponseDto.DepartmentEfficiency("Electricity", 85, "up")
        );

        List<String> aiInsights = List.of(
            "Sanitation response time improved by 24% following the new route optimization.",
            "Water supply issues in Ward 12 are trending upwards; check pump maintenance logs.",
            "Volunteer engagement is at an all-time high, perfect for a community cleanup event."
        );

        List<InsightsResponseDto.TopWard> topWards = List.of(
            new InsightsResponseDto.TopWard(1, "Central Ward", "2.4k"),
            new InsightsResponseDto.TopWard(2, "Lakeview East", "1.9k"),
            new InsightsResponseDto.TopWard(3, "Hillcrest Heights", "1.1k")
        );

        List<Integer> trends = List.of(24, 32, 40, 28, 52, 44, 60, 48, 36, 24, 40, 56);

        int resolutionRate = totalIssues > 0 ? (int) (issueRepository.findAll().stream()
                .filter(i -> "RESOLVED".equals(i.getStatus())).count() * 100 / totalIssues) : 84;

        return new InsightsResponseDto(
            Math.max(resolutionRate, 1),
            3.2,
            4.6,
            (int) totalIssues,
            trends,
            catBreakdown,
            deptEfficiency,
            aiInsights,
            topWards,
            4820,
            12
        );
    }
}
