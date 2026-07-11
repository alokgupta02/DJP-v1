/** Spacing scale — matches docs/architecture/colors-typography.md */
export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  12: "48px",
  16: "64px",
} as const;

export type SpacingKey = keyof typeof spacing;
