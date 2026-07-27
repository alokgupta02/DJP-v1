import { getAuthToken } from "../issues/issuesApi";

export interface PetitionDto {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAuthority: string;
  signatureGoal: number;
  signatureCount: number;
  author: string;
  createdAt: string;
  expiresAt: string;
}

export interface CreatePetitionPayload {
  title: string;
  description: string;
  category?: string;
  signatureGoal?: number;
  targetAuthority?: string;
}

const BASE_URL = "/djp/api/v1";

export async function fetchPetitions(): Promise<PetitionDto[]> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/petitions`, { headers });
  if (!res.ok) throw new Error("Failed to fetch petitions");
  const responseJson = await res.json();
  if (responseJson.success) {
    return Array.isArray(responseJson.data) ? responseJson.data : [];
  }
  return [];
}

export async function createPetition(payload: CreatePetitionPayload): Promise<PetitionDto> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/petitions`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create petition (${res.status}): ${errorText}`);
  }

  const responseJson = await res.json();
  return responseJson.data;
}

export async function signPetition(petitionId: string): Promise<PetitionDto> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/petitions/${petitionId}/sign`, {
    method: "POST",
    headers,
  });

  if (!res.ok) throw new Error("Failed to sign petition");
  const responseJson = await res.json();
  return responseJson.data;
}
