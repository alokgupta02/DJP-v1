/** Border radius tokens — matches docs/architecture/colors-typography.md */
export const radius = {
  none: "0px",
  sm: "4px",    // Badges, small elements
  md: "6px",    // Inputs, small buttons
  lg: "8px",    // Cards, large buttons, modals
  xl: "12px",   // Larger cards, sections
  full: "9999px", // Pills, avatars
} as const;

export type RadiusKey = keyof typeof radius;
