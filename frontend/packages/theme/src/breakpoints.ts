/** Breakpoints — matches docs/architecture/layout.md */
export const breakpoints = {
  mobile: "768px",   // max-width: 768px → mobile
  tablet: "1024px",  // 768–1024px → tablet
  desktop: "1025px", // min-width: 1025px → desktop
} as const;

export type BreakpointKey = keyof typeof breakpoints;
