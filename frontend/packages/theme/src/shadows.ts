/** Shadow tokens — matches docs/architecture/colors-typography.md */
export const shadows = {
  /** Subtle card shadow */
  sm: "0 1px 3px rgba(0, 0, 0, 0.05)",
  /** Medium shadow for modals / dropdowns */
  md: "0 4px 12px rgba(0, 0, 0, 0.1)",
  /** Focus ring — brand primary */
  focus: "0 0 0 2px rgba(163, 22, 33, 0.2)",
  none: "none",
} as const;

export type ShadowKey = keyof typeof shadows;
