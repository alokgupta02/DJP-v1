# Colors & Typography

**Purpose**: Single source of truth for design tokens (colors, fonts, spacing)  
**Audience**: Developers, designers, agents  
**Dependencies**: None (foundational)  
**Status**: Stable  
**Last Updated**: 2026-07-04

---

## Overview

This document defines all design tokens used across DJ Dashboard. **Use this as the single source of truth**—never duplicate these values elsewhere.

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Primary** | `#ff6b5b` | 255, 107, 91 | Active states, buttons, links, highlights |
| **Dark** | `#333` | 51, 51, 51 | Primary text, headings, strong elements |
| **Gray** | `#999` | 153, 153, 153 | Secondary text, labels, disabled |
| **Background** | `#f5f6f8` | 245, 246, 248 | Page background, section backgrounds |
| **Border** | `#e8ecf1` | 232, 236, 241 | Dividers, outlines, card borders |

### Status Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Success** | `#52c41a` | 82, 196, 26 | Positive metrics, success states |
| **Error** | `#f5222d` | 245, 34, 45 | Negative metrics, error states |
| **Warning** | `#faad14` | 250, 173, 20 | Caution, warning states |
| **Info** | `#1890ff` | 24, 144, 255 | Informational, neutral |

### CSS Usage

```css
/* Primary color */
.metric-label { color: #ff6b5b; }
.sidebar-menu a.active { background-color: #ff6b5b; color: white; }
button.primary { background-color: #ff6b5b; }

/* Text colors */
body { color: #333; }
.secondary-text { color: #999; }

/* Backgrounds */
body { background-color: #f5f6f8; }

/* Borders */
.card { border: 1px solid #e8ecf1; }

/* Status */
.metric-change.positive { color: #52c41a; }
.metric-change.negative { color: #f5222d; }
```

---

## Typography

### Font Stack

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
                 "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji";
}
```

**Why this order**:
- `-apple-system` — Native look on Apple devices
- `BlinkMacSystemFont` — macOS/iOS Safari
- `Segoe UI` — Windows native font
- `Roboto` — Android and web fallback
- `Helvetica Neue` — Older systems
- `Arial` — Universal fallback

### Font Sizes

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **Large Heading** | 32px | 700 | 1.2 | Page titles |
| **Heading** | 20px | 600 | 1.3 | Section titles |
| **Subheading** | 18px | 600 | 1.4 | Subsections |
| **Body** | 14px | 400 | 1.6 | Regular text |
| **Label** | 13px | 500 | 1.5 | Form labels, captions |
| **Small** | 12px | 400 | 1.5 | Help text, badges |
| **Tiny** | 11px | 600 | 1.4 | Tags, pills |

### Font Weights

| Weight | Name | Usage |
|--------|------|-------|
| **400** | Normal | Body text, descriptions |
| **500** | Medium | Labels, button text |
| **600** | Semibold | Section titles, emphasis |
| **700** | Bold | Page titles, strong emphasis |

### CSS Font Sizes

```css
h1 { font-size: 32px; font-weight: 700; }
h2 { font-size: 20px; font-weight: 600; }
h3 { font-size: 18px; font-weight: 600; }
p { font-size: 14px; font-weight: 400; }
label { font-size: 13px; font-weight: 500; }
.small { font-size: 12px; font-weight: 400; }
.tiny { font-size: 11px; font-weight: 600; }

.metric-value { font-size: 32px; font-weight: 700; }
.metric-label { font-size: 12px; font-weight: 600; }
```

---

## Spacing System

### Spacing Scale

| Value | Usage |
|-------|-------|
| **4px** | Micro-spacing (icon gaps, tiny margins) |
| **8px** | Extra small (icon+text gaps) |
| **12px** | Small (component internal spacing) |
| **16px** | Medium (button padding, small gaps) |
| **20px** | Medium-large (component gaps) |
| **24px** | Large (section gaps, container padding on tablet) |
| **32px** | Extra large (container padding on desktop) |
| **48px** | Page sections (rarely used) |

### Common Spacing Patterns

```css
/* Container padding */
.container {
    padding: 32px;  /* Desktop */
}

@media (max-width: 1024px) {
    .container { padding: 24px; }
}

@media (max-width: 768px) {
    .container { padding: 16px; }
}

/* Section gaps */
.section { margin-bottom: 24px; }

/* Component gaps */
.metric-card { padding: 24px; }
button { padding: 8px 16px; }
.sidebar-menu li { margin-bottom: 12px; }
```

---

## Border Radius

| Value | Usage |
|-------|-------|
| **4px** | Badges, small elements |
| **6px** | Input fields, small buttons |
| **8px** | Cards, large buttons, modals |
| **12px** | Larger cards, sections |

### CSS

```css
.metric-card { border-radius: 8px; }
.button { border-radius: 6px; }
.badge { border-radius: 4px; }
.user-avatar { border-radius: 50%; }
```

---

## Shadows

### Subtle Shadow (Cards)

```css
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
```

### Medium Shadow (Modals, Dropdowns)

```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
```

### Focus Shadow

```css
box-shadow: 0 0 0 2px rgba(255, 107, 91, 0.2);
```

---

## Transitions & Animations

### Timing

```css
/* Quick feedback */
transition: all 0.15s ease-in-out;

/* Standard animation */
transition: all 0.2s ease-in-out;

/* Smooth transitions */
transition: all 0.3s ease-in-out;
```

### Easing Functions

```css
/* Default */
easing: ease-in-out;

/* For opacity/visibility */
easing: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Breakpoints

**See [Layout Guide](layout.md) for detailed responsive behavior.**

```css
/* Mobile first */
@media (max-width: 768px) { /* Mobile */ }
@media (min-width: 768px) and (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1025px) { /* Desktop */ }
```

---

## Assumptions & Constraints

### Assumptions
- Hex colors supported in all target browsers
- System fonts available on user device
- Browser supports CSS Grid and Flexbox
- All values in pixels (px), not rem/em

### Constraints
- **No CSS variables** (for maximum compatibility)
- **No SASS/LESS** (vanilla CSS only)
- **Hex colors only** (no rgba/hsla in CSS)
- **Hardcoded values** (values duplicated intentionally for simplicity)

---

## Implementation Notes

### For Developers

✅ **DO**:
- Use this palette for all new styles
- Copy hex values directly into CSS
- Maintain consistency across all pages
- Reference this doc when unsure

❌ **DON'T**:
- Create new colors without approval
- Use different shades of primary color
- Use CSS variables or SASS
- Hardcode colors in inline styles

### For Designers

When proposing color/typography changes:
1. Document the change here first
2. Update all 9 HTML pages
3. Test on mobile, tablet, desktop
4. Update related docs

---

## Related Documentation

**Prerequisites**:
- [Architecture Overview](overview.md) — Project context

**Related Concepts**:
- [Components](components.md) — Where colors are applied
- [Layout](layout.md) — Spacing on different screens
- [Agent Guide](../development/agent.md) — Style guidelines

**Depending on This Doc**:
- [Components](components.md) — Color definitions
- [Agent Guide](../development/agent.md) — Style standards
- All HTML files — CSS color values

---

*Last Updated*: 2026-07-04  
*Maintainer*: Design System  
*Version*: 1.0
