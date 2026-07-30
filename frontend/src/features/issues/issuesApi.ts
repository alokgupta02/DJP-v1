export interface BackendIssueDto {
  id: string;
  authorId?: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  workflowStep: number;
  location?: string;
  latitude?: number;
  longitude?: number;
  govLevel?: string;
  supportsCount: number;
  commentsCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateIssuePayload {
  title: string;
  description: string;
  category: string;
  priority: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  govLevel?: string;
}

const BASE_URL = "/djp/api/v1";

/**
 * Acquires a valid JWT token. Checks localStorage or performs dev-login transparently.
 */
export async function getAuthToken(): Promise<string> {
  const existing = localStorage.getItem("djp_token");
  if (existing) return existing;

  try {
    const res = await fetch(`${BASE_URL}/auth/dev-login?email=citizen@djp.org`, {
      method: "POST",
    });
    if (res.ok) {
      const responseJson = await res.json();
      if (responseJson.data?.accessToken) {
        localStorage.setItem("djp_token", responseJson.data.accessToken);
        if (responseJson.data.user) {
          localStorage.setItem("djp_user", JSON.stringify(responseJson.data.user));
        }
        return responseJson.data.accessToken;
      }
    }
  } catch (err) {
    console.warn("Dev-login failed, proceeding without auth header:", err);
  }
  return "";
}

/**
 * Fetches all civic issues from the Spring Boot backend (/djp/api/v1/issues)
 */
export async function fetchIssues(): Promise<BackendIssueDto[]> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/issues`, { headers });
  if (!res.ok) {
    throw new Error(`Failed to fetch issues: Status ${res.status}`);
  }
  const responseJson = await res.json();
  if (responseJson.success) {
    return Array.isArray(responseJson.data) ? responseJson.data : [];
  }
  return [];
}

/**
 * Creates a new civic issue via POST /djp/api/v1/issues
 */
export async function createIssue(payload: CreateIssuePayload): Promise<BackendIssueDto> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/issues`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create issue (${res.status}): ${errorText}`);
  }

  const responseJson = await res.json();
  return responseJson.data;
}
