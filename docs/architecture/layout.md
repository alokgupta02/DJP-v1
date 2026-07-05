# Layout & Responsive Design

**Purpose**: Single source of truth for responsive breakpoints and layout behavior  
**Audience**: Developers, designers, agents  
**Dependencies**: [Colors & Typography](colors-typography.md)  
**Status**: Stable  
**Last Updated**: 2026-07-04

---

## Overview

DJ Dashboard uses a mobile-first responsive design with three breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## Breakpoints

### CSS Media Queries

```css
/* Mobile first (no media query needed for base) */
/* Default styles apply to mobile */

/* Tablet and up */
@media (min-width: 768px) {
    /* Tablet-specific styles */
}

/* Desktop and up */
@media (min-width: 1025px) {
    /* Desktop-specific styles */
}
```

### Breakpoint Values

| Device | Width | Breakpoint | Condition |
|--------|-------|-----------|----------|
| Mobile | < 768px | `max-width: 768px` | Phone, small tablet |
| Tablet | 768px - 1024px | `min-width: 768px` & `max-width: 1024px` | Tablet, iPad |
| Desktop | > 1024px | `min-width: 1025px` | Large screen, monitor |

---

## Container & Padding

### Container Width

```css
/* Mobile: Edge to edge */
.container {
    max-width: 100%;
    padding: 16px;
}

/* Tablet: Add padding */
@media (min-width: 768px) {
    .container {
        max-width: 100%;
        padding: 24px;
    }
}

/* Desktop: Centered with padding */
@media (min-width: 1025px) {
    .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 32px;
    }
}
```

### Content Area Padding

| Breakpoint | Padding | Usage |
|-----------|---------|-------|
| Mobile (< 768px) | 16px | Tight spacing |
| Tablet (768-1024px) | 24px | Balanced spacing |
| Desktop (> 1024px) | 32px | Generous spacing |

---

## Layout Patterns

### Sidebar + Content

**Structure**:
```html
<div class="container">
    <aside class="sidebar"><!-- 250px --></aside>
    <div class="main-content"><!-- Flex 1 --></div>
</div>
```

**Desktop (> 1024px)**:
```
┌─────────────────────────────────────┐
│ Header (64px)                       │
├──────────────┬─────────────────────┤
│ Sidebar      │ Main Content        │
│ 250px        │ Flex 1              │
│              │ (responsive grid)   │
└──────────────┴─────────────────────┘
```

**Tablet (768px - 1024px)**:
```
┌─────────────────────────────────┐
│ Header (toggle visible)         │
├──────────────┬──────────────────┤
│ Sidebar      │ Main Content     │
│ (collapsible)│ (2-col grid)     │
└──────────────┴──────────────────┘
```

**Mobile (< 768px)**:
```
┌──────────────────────┐
│ Header (toggle btn)  │
├──────────────────────┤
│ Main Content         │
│ (1-col grid)         │
│                      │
│ (Sidebar as overlay) │
└──────────────────────┘
```

### Sidebar Behavior

```css
/* Desktop: Always visible */
@media (min-width: 1025px) {
    .sidebar {
        width: 250px;
        position: relative;
    }
}

/* Tablet: Collapsible */
@media (max-width: 1024px) {
    .sidebar {
        width: 250px;
        position: relative;
    }
    .sidebar.collapsed {
        display: none;
    }
}

/* Mobile: Fixed overlay */
@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        width: 250px;
        height: 100vh;
        z-index: 999;
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
    }
    .sidebar.collapsed {
        transform: translateX(0);
    }
}
```

---

## Grid Layouts

### Metric Cards Grid

**Desktop (> 1024px): 3 columns**
```css
.metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}
```

**Tablet (768-1024px): 2 columns**
```css
@media (max-width: 1024px) {
    .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
}
```

**Mobile (< 768px): 1 column**
```css
@media (max-width: 768px) {
    .metrics-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }
}
```

### 2-Column Layout (Hotspots + Performers)

**Desktop: 2 columns, 50% each**
```css
.section-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}
```

**Tablet: 2 columns, narrower**
```css
@media (max-width: 1024px) {
    .section-grid {
        gap: 20px;
    }
}
```

**Mobile: 1 column, stacked**
```css
@media (max-width: 768px) {
    .section-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }
}
```

---

## Header Responsive Behavior

### Header Layout

**Desktop**:
- Left: Toggle (hidden), Search (300px), Logo
- Right: Notifications, Settings, Avatar
- Spacing: Comfortable

```css
@media (min-width: 1025px) {
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 32px;
    }
    .toggle-btn { display: none; }
    .search-box { min-width: 300px; }
}
```

**Tablet**:
- Left: Toggle (visible), Search (200px)
- Right: Notifications, Settings, Avatar (smaller gap)

```css
@media (max-width: 1024px) {
    .header {
        gap: 20px;
    }
    .toggle-btn { display: block; }
    .search-box { min-width: 200px; }
}
```

**Mobile**:
- Left: Toggle, Compact Search
- Right: Notifications, Avatar (Settings hidden or in menu)

```css
@media (max-width: 768px) {
    .header {
        gap: 12px;
        padding: 12px 16px;
    }
    .search-box { min-width: 120px; }
    .settings-btn { display: none; }
}
```

---

## Typography Scaling

### Heading Sizes

**Desktop**:
```css
h1 { font-size: 32px; }
h2 { font-size: 20px; }
h3 { font-size: 18px; }
```

**Tablet**:
```css
@media (max-width: 1024px) {
    h1 { font-size: 28px; }
    h2 { font-size: 18px; }
    h3 { font-size: 16px; }
}
```

**Mobile**:
```css
@media (max-width: 768px) {
    h1 { font-size: 24px; }
    h2 { font-size: 16px; }
    h3 { font-size: 14px; }
}
```

---

## Tables - Responsive Scrolling

**Desktop & Tablet**: Full width
```css
.table-container {
    width: 100%;
    overflow-x: auto;
}
```

**Mobile**: Horizontal scroll
```css
@media (max-width: 768px) {
    .table-container {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
    table {
        min-width: 500px;
    }
}
```

---

## Spacing Adjustments

### Margin & Padding

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Container padding | 32px | 24px | 16px |
| Section gap | 24px | 20px | 16px |
| Card padding | 24px | 20px | 16px |
| Component gap | 16px | 12px | 8px |

---

## Common Responsive Patterns

### Pattern 1: Collapse on Mobile

```css
/* Desktop */
.sidebar { display: block; }

/* Mobile */
@media (max-width: 768px) {
    .sidebar { display: none; }
    .sidebar.open { display: block; position: fixed; }
}
```

### Pattern 2: Grid to Stack

```css
/* Desktop */
.grid { grid-template-columns: repeat(3, 1fr); }

/* Tablet */
@media (max-width: 1024px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile */
@media (max-width: 768px) {
    .grid { grid-template-columns: 1fr; }
}
```

### Pattern 3: Text Reflow

```css
/* Desktop: inline */
.label { display: inline; margin-right: 8px; }

/* Mobile: block */
@media (max-width: 768px) {
    .label { display: block; margin-bottom: 4px; }
}
```

---

## Testing Responsive Design

### Breakpoints to Test

1. **Mobile**: 375px (iPhone SE), 414px (iPhone 12)
2. **Tablet**: 768px (iPad), 1024px (iPad Pro)
3. **Desktop**: 1366px (laptop), 1920px (monitor)

### Manual Testing

```bash
# Chrome DevTools
F12 → Click Device Toolbar (Ctrl+Shift+M)

# Toggle different devices:
# - iPhone SE (375px)
# - iPad (768px)
# - Desktop (1366px+)

# Check:
# - Layout shifts correctly
# - Text readable
# - Tap targets ≥ 44px
# - Images scale properly
# - Horizontal scroll avoided (except tables)
```

---

## Assumptions & Constraints

### Assumptions
- Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- CSS Grid and Flexbox supported
- All breakpoints in pixels (px)
- Mobile-first approach

### Constraints
- No CSS variables
- Breakpoints: 768px and 1024px only
- No responsive images (uses same images everywhere)
- No media query for print

---

## Related Documentation

**Prerequisites**:
- [Colors & Typography](colors-typography.md) — Typography scaling

**Related Concepts**:
- [Components](components.md) — Component responsive behavior
- [Navigation](navigation.md) — Sidebar responsive behavior
- [JavaScript](javascript.md) — Resize event handling

**Depending on This Doc**:
- All HTML pages — Breakpoint implementation
- [Agent Guide](../development/agent.md) — Development standards

---

*Last Updated*: 2026-07-04  
*Maintainer*: Design System  
*Version*: 1.0
