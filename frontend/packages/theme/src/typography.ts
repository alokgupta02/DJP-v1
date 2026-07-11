/** Typography tokens — matches docs/architecture/colors-typography.md */
export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji"',
  },

  fontSize: {
    tiny: "11px",
    small: "12px",
    label: "13px",
    body: "14px",
    subheading: "18px",
    heading: "20px",
    largeHeading: "32px",
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    snug: 1.3,
    normal: 1.4,
    relaxed: 1.5,
    loose: 1.6,
  },
} as const;
