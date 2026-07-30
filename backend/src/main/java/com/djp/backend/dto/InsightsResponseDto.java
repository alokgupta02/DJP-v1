package com.djp.backend.dto;

import java.util.List;

public record InsightsResponseDto(
    int resolutionRate,
    double avgResponseTimeDays,
    double citizenSatisfaction,
    int issuesReported,
    List<Integer> resolutionTrends,
    List<CategoryBreakdown> categoryBreakdown,
    List<DepartmentEfficiency> departmentEfficiency,
    List<String> aiInsights,
    List<TopWard> topWards,
    int volunteerHours,
    int activeProjects
) {
    public record CategoryBreakdown(String label, int count, int pct) {}
    public record DepartmentEfficiency(String dept, int rate, String trend) {}
    public record TopWard(int rank, String name, String interactions) {}
}
