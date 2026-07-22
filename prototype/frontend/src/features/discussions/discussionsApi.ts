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
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDiscussionPayload {
  title: string;
  description: string;
  category: string;
  proposalPreview?: string;
  proposalBadge?: string;
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
  const data = await res.json();
  return Array.isArray(data) ? data : data.content || [];
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

  return await res.json();
}
