/** Semantic color aliases — maps design intent to palette values */
import { colors } from "./colors";

export const semantic = {
  /** Primary brand interactions */
  brand: colors.primary,

  /** Page-level backgrounds */
  bg: {
    page: "#F8F9FA",        // App background (slightly lighter than prototype)
    surface: colors.background.surface,
    subtle: "#F2F4F7",       // Muted surface, sidebar
  },

  /** Text hierarchy */
  text: {
    primary: colors.text.primary,
    secondary: colors.text.secondary,
    disabled: "#BBBBBB",
    inverse: "#FFFFFF",
    brand: colors.primary,
  },

  /** Interactive borders */
  border: {
    default: colors.border,
    focus: colors.primary,
    subtle: "#F0F0F0",
  },

  /** Status aliases */
  status: {
    success: colors.status.success,
    error: colors.status.error,
    warning: colors.status.warning,
    info: colors.status.info,
  },
} as const;
