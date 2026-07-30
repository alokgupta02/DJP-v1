import { createContext } from "react";
import type { OnboardingContextType } from "./OnboardingTypes";

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);