import React, { createContext, useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

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

const DEFAULT_DATA: OnboardingData = {
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

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (partial: Partial<OnboardingData>) => void;
  resetData: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const STORAGE_KEY = "djp_onboarding_draft";

export function OnboardingProvider({ children }: { children?: React.ReactNode }) {
  const [data, setData] = useState<OnboardingData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return { ...DEFAULT_DATA, ...JSON.parse(saved) };
      } catch (e) {
        console.warn("Could not parse saved onboarding draft", e);
      }
    }
    return DEFAULT_DATA;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(DEFAULT_DATA);
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, resetData }}>
      {children || <Outlet />}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
