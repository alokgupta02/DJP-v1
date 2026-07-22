import { getAuthToken } from "../issues/issuesApi";

export interface BackendPollDto {
  id: string;
  question: string;
  description: string;
  category: string;
  optionsJson?: string;
  votesCount: number;
  commentsCount: number;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePollPayload {
  question: string;
  description: string;
  category: string;
  optionsJson?: string;
}

const BASE_URL = "/djp/api/v1";

/**
 * Fetches all civic polls from the Spring Boot backend (/djp/api/v1/polls)
 */
export async function fetchPolls(): Promise<BackendPollDto[]> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/polls`, { headers });
  if (!res.ok) {
    throw new Error(`Failed to fetch polls: Status ${res.status}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.content || [];
}

/**
 * Creates a new civic poll via POST /djp/api/v1/polls
 */
export async function createPoll(payload: CreatePollPayload): Promise<BackendPollDto> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/polls`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create poll (${res.status}): ${errorText}`);
  }

  return await res.json();
}
