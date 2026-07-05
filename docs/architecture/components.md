# UI Components

**Purpose**: Catalog of reusable UI components and their structure  
**Audience**: Developers, designers, contributors  
**Dependencies**: [Colors & Typography](colors-typography.md), [Layout](layout.md)  
**Status**: Stable  
**Last Updated**: 2026-07-04

---

## Overview

DJ Dashboard uses a set of reusable components built with vanilla HTML/CSS. Each component is designed to be:
- **Simple**: Easy to understand and modify
- **Consistent**: Uses design tokens from [Colors & Typography](colors-typography.md)
- **Responsive**: Adapts to mobile, tablet, desktop (see [Layout](layout.md))
- **Accessible**: Semantic HTML, proper structure

---

## Component Library

### 1. Sidebar Navigation

**Purpose**: Main navigation menu for all pages  
**Location**: Left side of page (250px width on desktop)  
**Responsive**: Fixed overlay on mobile, collapses on toggle

**Structure**:
```html
<aside class="sidebar">
    <div class="sidebar-header">
        <div class="sidebar-logo">DJ</div>
        <div class="sidebar-title">Digital Janta</div>
    </div>
    <nav>
        <ul class="sidebar-menu">
            <li><a href="overview.html" class="active">📊 Dashboard</a></li>
            <!-- 8 more items -->
        </ul>
    </nav>
</aside>
```

**Styling**:
- Width: 250px (desktop), 0 collapsed
- Background: `#f5f6f8`
- Active state: `#ff6b5b` background, white text
- Z-index: 1000 (normal), 999 (mobile overlay)

**Responsive**:
- Desktop (> 1024px): Always visible, 250px
- Tablet (768-1024px): Collapsible
- Mobile (< 768px): Fixed overlay, toggle button visible

---

### 2. Header

**Purpose**: Top navigation and user controls  
**Location**: Top of page (fixed, 64px height)  
**Content**: Toggle button, search, notifications, user menu

**Structure**:
```html
<header class="header">
    <div class="header-left">
        <button id="sidebarToggle" class="toggle-btn">☰</button>
        <input type="search" class="search-box" placeholder="Search...">
    </div>
    <div class="header-right">
        <button class="icon-btn">🔔</button>
        <button class="icon-btn">⚙️</button>
        <div class="user-avatar">AG</div>
    </div>
</header>
```

**Styling**:
- Height: 64px
- Background: White
- Border-bottom: 1px solid `#e8ecf1`
- Padding: 16px 32px

**Responsive**:
- Desktop: Full spacing
- Tablet: Reduced gaps
- Mobile: Search box hidden or collapsed

---

### 3. Metric Card

**Purpose**: Display key performance indicator with trend  
**Usage**: Dashboard, overview pages, metrics grids  
**Layout**: Grid of 3 (desktop), 2 (tablet), 1 (mobile)

**Structure**:
```html
<div class="metric-card">
    <div class="metric-header">
        <span class="metric-label">AVG. Attendance</span>
        <span class="metric-icon">📊</span>
    </div>
    <div class="metric-value">88.4%</div>
    <div class="metric-change positive">↑ 5.2%</div>
</div>
```

**Styling**:
- Padding: 24px
- Border: 1px solid `#e8ecf1`
- Border-radius: 8px
- Box-shadow: 0 1px 3px rgba(0,0,0,0.05)
- Background: White

**Colors**:
- Label: `#999` (gray)
- Value: `#333` (dark)
- Change (↑): `#52c41a` (green) if positive
- Change (↓): `#f5222d` (red) if negative

---

### 4. Section Card

**Purpose**: Container for content sections  
**Usage**: Hotspots, performers, activity tables

**Structure**:
```html
<div class="section">
    <div class="section-header">
        <h2 class="section-title">Top Performers</h2>
        <a href="#" class="section-action">View Full</a>
    </div>
    <div class="section-content">
        <!-- Content here -->
    </div>
</div>
```

**Styling**:
- Padding: 24px
- Border: 1px solid `#e8ecf1`
- Border-radius: 8px
- Background: White
- Margin-bottom: 24px

---

### 5. Data Table

**Purpose**: Display tabular data (representatives, activities)  
**Columns**: Vary by page (see specific pages)

**Structure**:
```html
<table class="data-table">
    <thead>
        <tr>
            <th>Official</th>
            <th>Role</th>
            <th>Latest Project</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><span class="avatar">AK</span> Amit Kumar</td>
            <td>MP</td>
            <td>Road Development</td>
        </tr>
    </tbody>
</table>
```

**Styling**:
- Border-collapse: collapse
- Width: 100%
- Row borders: 1px solid `#e8ecf1`
- Hover state: Background `#f9f9f9`
- Padding: 16px per cell

**Responsive**:
- Desktop: Full width, all columns visible
- Tablet: Horizontal scroll if needed
- Mobile: Horizontal scroll, smaller padding (12px)

---

### 6. Button

**Purpose**: Primary and secondary actions  

**Primary Button**:
```html
<button class="button primary">Save Changes</button>
```

**Styling**:
- Background: `#ff6b5b`
- Color: White
- Padding: 8px 16px
- Border-radius: 6px
- Font-size: 13px
- Font-weight: 500
- Hover: Opacity 0.9

**Secondary Button**:
```html
<button class="button secondary">Cancel</button>
```

**Styling**:
- Background: White
- Color: `#333`
- Border: 1px solid `#e8ecf1`
- Padding: 8px 16px
- Hover: Background `#f9f9f9`

---

### 7. Badge / Pill

**Purpose**: Status labels, tags, indicators  

**Structure**:
```html
<span class="badge approved">Approved</span>
<span class="badge in-progress">In Progress</span>
<span class="badge pending">Pending</span>
```

**Styling**:
- Padding: 2px 8px
- Border-radius: 4px
- Font-size: 11px
- Font-weight: 600
- Display: inline-block

**Color Variants**:
- `.badge.approved` → Background `#52c41a`, color white
- `.badge.in-progress` → Background `#1890ff`, color white
- `.badge.pending` → Background `#faad14`, color white

---

### 8. Progress Bar

**Purpose**: Visual indicator of completion, budget usage  

**Structure**:
```html
<div class="progress-bar">
    <div class="progress-fill" style="width: 65%;"></div>
</div>
```

**Styling**:
- Height: 4px
- Background: `#e8ecf1` (container)
- Border-radius: 2px

**Fill Variants**:
- `.progress-fill.success` → `#52c41a`
- `.progress-fill.warning` → `#faad14`
- `.progress-fill.danger` → `#f5222d`
- `.progress-fill.info` → `#1890ff`

---

### 9. Avatar

**Purpose**: User profile picture or initials  

**Structure**:
```html
<div class="user-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">AK</div>
```

**Styling**:
- Width/Height: 40px (standard), 24px (small), 64px (large)
- Border-radius: 50%
- Display: flex, align-items: center, justify-content: center
- Font-weight: 600
- Font-size: 14px (standard), 12px (small)
- Color: White

**Gradient Backgrounds**:
- Use linear-gradient for visual distinction
- Different gradient per user (for mockup)

---

### 10. Chart Container

**Purpose**: Canvas for Chart.js visualizations  

**Structure**:
```html
<div class="chart-container">
    <canvas id="myChart"></canvas>
</div>
```

**Styling**:
- Position: relative
- Height: 300px
- Margin-bottom: 24px
- Padding: 16px

**Chart.js Configuration**:
- Custom colors: `#ff6b5b` (primary), `#13c2c2` (secondary)
- No legend (display: false)
- Responsive: true
- Maintain aspect: true

---

## Component Grid

| Component | Size | Use Case | Responsive |
|-----------|------|----------|------------|
| Sidebar | 250px × full | Navigation | Yes (overlay) |
| Header | full × 64px | Top controls | Yes |
| Metric Card | auto × auto | KPIs | Yes (grid) |
| Section | full × auto | Content blocks | Yes |
| Table | full × auto | Data | Yes (scroll) |
| Button | auto × auto | Actions | Yes |
| Badge | auto × auto | Labels | Yes |
| Progress | full × 4px | Indicators | Yes |
| Avatar | 40px × 40px | Users | Yes (scalable) |
| Chart | full × 300px | Visualizations | Yes |

---

## Implementation Notes

### For Developers

✅ **DO**:
- Reuse these components across pages
- Copy HTML structure exactly
- Use design tokens from [Colors & Typography](colors-typography.md)
- Test on all breakpoints

❌ **DON'T**:
- Create custom components without approval
- Modify component structure without reason
- Hardcode colors (use design tokens)
- Add unnecessary complexity

---

## Related Documentation

**Prerequisites**:
- [Colors & Typography](colors-typography.md) — Design tokens
- [Layout](layout.md) — Responsive behavior

**Related Concepts**:
- [Navigation System](navigation.md) — How components connect
- [JavaScript Patterns](javascript.md) — Interactivity
- [Agent Guide](../development/agent.md) — Development patterns

**Depending on This Doc**:
- All HTML pages — Component implementation
- [Agent Guide](../development/agent.md) — Component standards

---

*Last Updated*: 2026-07-04  
*Maintainer*: Design System  
*Version*: 1.0
