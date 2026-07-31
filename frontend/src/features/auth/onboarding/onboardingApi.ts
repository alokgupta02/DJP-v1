import { getAuthToken } from "../../issues/issuesApi";

export interface OnboardingUpdateRequest {
  name: string;
  location: string;
  pincode: string;
  occupation: string;
  bio: string;
  topics: string[];
  privacyConsentGiven: boolean;
}

export interface OnboardingResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  location: string;
  pincode: string;
  occupation: string;
  bio: string;
  topics: string[];
  privacyConsentGiven: boolean;
  onboardingCompleted: boolean;
}

export async function completeUserOnboarding(payload: OnboardingUpdateRequest): Promise<OnboardingResponse> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let userId = "";
  const cachedUserStr = localStorage.getItem("djp_user");
  if (cachedUserStr) {
    try {
      const u = JSON.parse(cachedUserStr);
      if (u.id) userId = u.id;
    } catch (e) {
      console.warn("Failed to parse cached djp_user", e);
    }
  }

  if (!userId) {
    const meRes = await fetch("/djp/api/v1/auth/me", { headers });
    if (meRes.ok) {
      const responseJson = await meRes.json();
      const u = responseJson.data;
      userId = u.id;
      localStorage.setItem("djp_user", JSON.stringify(u));
    } else {
      throw new Error("Could not determine user ID for onboarding");
    }
  }

  const res = await fetch(`/djp/api/v1/users/${userId}/onboarding`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Onboarding update failed: ${res.status} ${text}`);
  }

  const responseJson = await res.json();
  const updatedUser: OnboardingResponse = responseJson.data;
  localStorage.setItem("djp_user", JSON.stringify(updatedUser));
  return updatedUser;
}
