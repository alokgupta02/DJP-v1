export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  role: string;
  dob: string | null;
  gender: string | null;
  phoneNumber: string | null;
  location: string | null;
  pincode: string | null;
  country: string | null;
  state: string | null;
  district: string | null;
  city: string | null;
  locality: string | null;
  ward: string | null;
  constituency: string | null;
  occupation: string | null;
  bio: string | null;
  topics: string | null;
  onboardingCompleted: boolean;
  reputationScore: number;
}

export interface ProfileUpdatePayload {
  name?: string;
  dob?: string;
  gender?: string;
  phoneNumber?: string;
  location?: string;
  pincode?: string;
  country?: string;
  state?: string;
  district?: string;
  city?: string;
  locality?: string;
  ward?: string;
  constituency?: string;
  occupation?: string;
  bio?: string;
  topics?: string[];
}

const BASE_URL = "/djp/api/v1";

export async function getAuthToken(): Promise<string> {
  const existing = localStorage.getItem("djp_token");
  if (existing) return existing;

  try {
    const res = await fetch(`${BASE_URL}/auth/dev-login?email=citizen@djp.org`, {
      method: "POST",
    });
    if (res.ok) {
      const responseJson = await res.json();
      if (responseJson.data?.token) {
        localStorage.setItem("djp_token", responseJson.data.token);
        if (responseJson.data.user) {
          localStorage.setItem("djp_user", JSON.stringify(responseJson.data.user));
        }
        return responseJson.data.token;
      }
    }
  } catch (err) {
    console.warn("Dev-login failed, proceeding without auth header:", err);
  }
  return "";
}

export async function fetchUser(userId: string): Promise<UserDto> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/profiles/${userId}`, { headers });
  if (!res.ok) {
    throw new Error(`Failed to fetch user: Status ${res.status}`);
  }
  const responseJson = await res.json();
  return responseJson.data;
}

export async function updateProfile(userId: string, payload: ProfileUpdatePayload): Promise<Partial<UserDto>> {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/profiles/${userId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update profile (${res.status}): ${errorText}`);
  }

  const responseJson = await res.json();
  return responseJson.data;
}
