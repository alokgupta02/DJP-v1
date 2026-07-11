// @djp/theme — Design Token Package
// Single source of truth for all visual values.
// Never hardcode colors, spacing, or typography outside this package.

export * from "./breakpoints";
export * from "./colors";
export * from "./motion";
export * from "./radius";
export * from "./semantic";
export * from "./shadows";
export * from "./spacing";
export * from "./typography";
export * from "./zIndex";

export const theme = {
  name: "DJP Theme",
  version: "1.0.0",
};