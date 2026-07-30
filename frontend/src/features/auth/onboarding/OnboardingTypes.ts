export interface OnboardingData {
  // Step 1
  username: string;
  displayName: string;
  email: string;
  dob: string;
  gender: string;
  // Step 2
  pincode: string;
  country: string;
  state: string;
  district: string;
  city: string;
  locality: string;
  ward: string;
  constituency: string;
  occupation: string;
  // Step 3
  bio: string;
  topics: string[];
  privacyAccepted: boolean;
}

export const DEFAULT_DATA: OnboardingData = {
  username: "alokgupta",
  displayName: "Alok Gupta",
  email: "citizen@djp.org",
  dob: "1990-01-01",
  gender: "Male",
  pincode: "462016",
  country: "India",
  state: "Madhya Pradesh",
  district: "Bhopal",
  city: "Bhopal",
  locality: "Arera Colony",
  ward: "Ward 53, Bhopal",
  constituency: "Bhopal South-West (Vidhan Sabha)",
  occupation: "Software Engineer",
  bio: "Civic enthusiast working towards digital transformation and cleaner public roads.",
  topics: ["Roads", "Water Supply", "Digital Governance", "Environment"],
  privacyAccepted: true,
};

export interface OnboardingContextType {
  data: OnboardingData;
  updateData: (partial: Partial<OnboardingData>) => void;
  resetData: () => void;
}