import { getAuthToken } from "../issues/issuesApi";

export interface BackendDiscussionDto {
  id: string;
  title: string;
  description: string;
  category: string;
  votesCount: number;
  participantCount: number;
  proposalCount: number;
  proposalPreview?: string;
  proposalBadge?: string;
  proposalBadgeVariant?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  govLevel?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDiscussionPayload {
  title: string;
  description: string;
  category: string;
  proposalPreview?: string;
  proposalBadge?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  govLevel?: string;
}

const BASE_URL = "/djp/api/v1";

/**
 * Fetches all civic discussions from the Spring Boot backend (/djp/api/v1/discussions)
 */
export async function fetchDiscussions(): Promise<BackendDiscussionDto[]> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/discussions`, { headers });
  if (!res.ok) {
    throw new Error(`Failed to fetch discussions: Status ${res.status}`);
  }
  const responseJson = await res.json();
  if (responseJson.success) {
    return Array.isArray(responseJson.data) ? responseJson.data : [];
  }
  return [];
}

/**
 * Creates a new civic discussion via POST /djp/api/v1/discussions
 */
export async function createDiscussion(payload: CreateDiscussionPayload): Promise<BackendDiscussionDto> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/discussions`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create discussion (${res.status}): ${errorText}`);
  }

  const responseJson = await res.json();
  return responseJson.data;
}
