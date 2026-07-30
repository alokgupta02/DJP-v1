import { getAuthToken } from "../issues/issuesApi"; // Resusing getAuthToken

const BASE_URL = "/djp/api/v1/interactions";

export interface CommentDto {
  id: string;
  author: { id: string; name: string };
  content: string;
  parentCommentId?: string | null;
  score: number;
  createdAt: string;
}

export async function addComment(
  content: string,
  entityId: string,
  entityType: string,
  parentId?: string
): Promise<CommentDto> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const body: { content: string; entityId: string; entityType: string; parentId?: string } = { content, entityId, entityType };
  if (parentId) body.parentId = parentId;

  const res = await fetch(`${BASE_URL}/comments`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to add comment");
  const responseJson = await res.json();
  return responseJson.data;
}

export async function getComments(entityId: string, entityType: string): Promise<CommentDto[]> {
  const res = await fetch(`${BASE_URL}/comments?entityId=${entityId}&entityType=${entityType}`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  const responseJson = await res.json();
  return responseJson.data;
}

export async function toggleVote(entityId: string, entityType: string, value: number): Promise<{ success: boolean }> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/votes`, {
    method: "POST",
    headers,
    body: JSON.stringify({ entityId, entityType, value }),
  });

  if (!res.ok) throw new Error("Failed to vote");
  const responseJson = await res.json();
  return responseJson.data;
}

export async function toggleFollow(targetId: string, targetType: string): Promise<{ following: boolean }> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/follows`, {
    method: "POST",
    headers,
    body: JSON.stringify({ targetId, targetType }),
  });

  if (!res.ok) throw new Error("Failed to follow");
  const responseJson = await res.json();
  return responseJson.data;
}
