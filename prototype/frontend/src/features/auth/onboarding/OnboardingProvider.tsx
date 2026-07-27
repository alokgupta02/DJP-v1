import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { OnboardingContext } from "./OnboardingContext";
import { type OnboardingData, DEFAULT_DATA } from "./OnboardingTypes";

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