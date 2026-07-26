import { getAuthToken } from "../issues/issuesApi";

const BASE_URL = "/djp/api/v1/notifications";

export interface NotificationDto {
  id: string;
  actor?: { id: string; name: string };
  type: string;
  entityId: string;
  isRead: boolean;
  createdAt: string;
}

export async function fetchNotifications(): Promise<NotificationDto[]> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}`, { headers });
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

export async function getUnreadCount(): Promise<number> {
  const token = await getAuthToken();
  if (!token) return 0; // Not logged in
  const headers: Record<string, string> = {
    "Authorization": `Bearer ${token}`,
  };

  const res = await fetch(`${BASE_URL}/unread-count`, { headers });
  if (!res.ok) return 0;
  
  const data = await res.json();
  return data.count;
}

export async function markAsRead(id: string): Promise<void> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/${id}/read`, { method: "POST", headers });
  if (!res.ok) throw new Error("Failed to mark as read");
}
