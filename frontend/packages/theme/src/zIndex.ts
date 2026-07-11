/** Z-index scale */
export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  sidebar: 500,
  toast: 600,
  tooltip: 700,
} as const;

export type ZIndexKey = keyof typeof zIndex;
