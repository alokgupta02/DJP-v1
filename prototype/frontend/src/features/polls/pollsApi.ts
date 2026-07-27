import { getAuthToken } from "../issues/issuesApi";

export interface BackendPollDto {
  id: string;
  question: string;
  description: string;
  category: string;
  optionsJson?: string;
  votesCount: number;
  commentsCount: number;
  location?: string;
  latitude?: number;
  longitude?: number;
  govLevel?: string;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePollPayload {
  question: string;
  description: string;
  category: string;
  optionsJson?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  govLevel?: string;
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
  const responseJson = await res.json();
  if (responseJson.success) {
    return Array.isArray(responseJson.data) ? responseJson.data : [];
  }
  return [];
}

/**
 * Creates a new civic poll via POST /djp/api/v1/polls
 */
export async function castPollVote(pollId: string, optionIndex: number): Promise<BackendPollDto> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/polls/${pollId}/vote`, {
    method: "POST",
    headers,
    body: JSON.stringify({ optionIndex }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to cast vote (${res.status}): ${errorText}`);
  }

  const responseJson = await res.json();
  return responseJson.data;
}

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

  const responseJson = await res.json();
  return responseJson.data;
}
