import { getAuthToken } from "../issues/issuesApi";

export interface RepresentativeDto {
  id: string;
  name: string;
  position: string;
  ward: string;
  party: string;
  since: string;
  phone: string;
  email: string;
  imageInitials: string;
  avatarBg: string;
  avatarTextColor: string;
  issuesResolved: number;
  meetingsHeld: number;
  attendance: string;
  biography: string;
}

const BASE_URL = "/djp/api/v1";

export async function fetchRepresentatives(): Promise<RepresentativeDto[]> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/representatives`, { headers });
  if (!res.ok) throw new Error("Failed to fetch representatives");
  const responseJson = await res.json();
  if (responseJson.success) {
    return Array.isArray(responseJson.data) ? responseJson.data : [];
  }
  return [];
}
