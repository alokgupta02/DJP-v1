import { getAuthToken } from "../issues/issuesApi";

export interface InsightsDto {
  resolutionRate: number;
  avgResponseTimeDays: number;
  citizenSatisfaction: number;
  issuesReported: number;
  resolutionTrends: number[];
  categoryBreakdown: { label: string; count: number; pct: number }[];
  departmentEfficiency: { dept: string; rate: number; trend: string }[];
  aiInsights: string[];
  topWards: { rank: number; name: string; interactions: string }[];
  volunteerHours: number;
  activeProjects: number;
}

const BASE_URL = "/djp/api/v1";

export async function fetchInsights(): Promise<InsightsDto> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/insights`, { headers });
  if (!res.ok) throw new Error("Failed to fetch insights");
  const responseJson = await res.json();
  return responseJson.data;
}
