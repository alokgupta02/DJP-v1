/** Motion / animation tokens — matches docs/architecture/colors-typography.md */
export const motion = {
  duration: {
    fast: "150ms",     // Quick feedback (hover, active)
    normal: "200ms",   // Standard animations
    slow: "300ms",     // Smooth transitions (sidebar, drawer)
  },

  easing: {
    default: "ease-in-out",
    spring: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  transition: {
    fast: "all 150ms ease-in-out",
    normal: "all 200ms ease-in-out",
    slow: "all 300ms ease-in-out",
  },
} as const;
