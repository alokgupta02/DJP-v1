# Navigation System

**Purpose**: How the 9-page navigation system works  
**Audience**: Developers, contributors  
**Dependencies**: [Layout](layout.md), [JavaScript Patterns](javascript.md)  
**Status**: Stable  
**Last Updated**: 2026-07-04

---

## Overview

DJ Dashboard has 9 interconnected pages with a unified navigation system:
- **Sidebar menu**: 9 main pages + utilities
- **Header**: Toggle button, search, user controls
- **Active state**: Current page highlighted
- **Direct links**: No hash anchors, direct file links
- **Consistent**: Identical navigation on all 9 pages

---

## Navigation Structure

### 9 Main Menu Items

```
Dashboard        → overview.html
Judiciary        → judiciary.html
Legislatures     → legislatures.html
Governments      → governments.html
Representatives  → rep-index.html
States           → states.html
Municipalities   → municipalities.html
Parties          → parties.html
Elections        → elections.html
```

### Page Identifiers

Each page has unique `<body id>` for tracking and styling:

```html
<!-- overview.html -->
<body id="page-dashboard">

<!-- judiciary.html -->
<body id="page-judiciary">

<!-- etc. for all 9 pages -->
```

---

## HTML Structure

### Sidebar HTML

```html
<aside class="sidebar">
    <div class="sidebar-header">
        <div class="sidebar-logo">DJ</div>
        <div class="sidebar-title">Digital Janta</div>
    </div>

    <nav>
        <!-- Primary Menu (9 items) -->
        <ul class="sidebar-menu">
            <li><a href="overview.html" class="active">📊 Dashboard</a></li>
            <li><a href="judiciary.html">⚖️ Judiciary</a></li>
            <li><a href="legislatures.html">🏛️ Legislatures</a></li>
            <li><a href="governments.html">🏢 Governments</a></li>
            <li><a href="rep-index.html">👥 Representatives</a></li>
            <li><a href="states.html">🗺️ States</a></li>
            <li><a href="municipalities.html">🏙️ Municipalities</a></li>
            <li><a href="parties.html">🎯 Parties</a></li>
            <li><a href="elections.html">🗳️ Elections</a></li>
        </ul>

        <!-- Leadership Indices -->
        <div class="sidebar-section">Leadership Indices</div>
        <ul class="sidebar-menu">
            <li><a href="#senate">⭐ Senate Minister Index <span class="live-badge">LIVE</span></a></li>
            <li><a href="#chief">⭐ Chief Minister Index</a></li>
        </ul>

        <!-- Utilities -->
        <div class="sidebar-section">Utilities</div>
        <ul class="sidebar-menu">
            <li><a href="#support">💬 Support</a></li>
            <li><a href="#archive">📁 Archive</a></li>
        </ul>
    </nav>
</aside>
```

**Key Points**:
- Only ONE `.active` class (on current page)
- Direct file links (no anchors for pages)
- Hash links (#support, #archive) for utilities
- 9 main + 2 indices + 2 utilities = 13 items

---

## JavaScript Navigation Logic

### Active State Management

```javascript
// When page loads, set active state on current link
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Only update state for page links (not hash anchors)
        if (!link.href.includes('#')) {
            // Remove active from all
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add active to clicked
            link.classList.add('active');
        }
    });
});
```

### Sidebar Toggle

```javascript
// Toggle sidebar on button click
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});
```

---

## Navigation Rules

### ✅ Correct Practices

1. **Dashboard always links to `overview.html`**
   ```html
   <li><a href="overview.html">📊 Dashboard</a></li>
   ```

2. **Representatives always links to `rep-index.html`**
   ```html
   <li><a href="rep-index.html">👥 Representatives</a></li>
   ```

3. **Each page has unique body ID**
   ```html
   <!-- judiciary.html -->
   <body id="page-judiciary">
   ```

4. **Active state added via JavaScript**
   - Only ONE `.active` class per page
   - Updated when clicking sidebar items

### ❌ Wrong Practices

```html
<!-- WRONG: Hash for page navigation -->
<li><a href="#judiciary">⚖️ Judiciary</a></li>

<!-- WRONG: rep-index for Dashboard -->
<li><a href="rep-index.html">📊 Dashboard</a></li>

<!-- WRONG: overview for Representatives -->
<li><a href="overview.html">👥 Representatives</a></li>

<!-- WRONG: Duplicate active states -->
<li><a href="judiciary.html" class="active">...</a></li>
<li><a href="legislatures.html" class="active">...</a></li>
```

---

## Page Details

| Page | File | Body ID | Icon | Purpose |
|------|------|---------|------|----------|
| Dashboard | `overview.html` | `page-dashboard` | 📊 | Metrics overview |
| Judiciary | `judiciary.html` | `page-judiciary` | ⚖️ | Judicial data |
| Legislatures | `legislatures.html` | `page-legislatures` | 🏛️ | Parliament/Assembly |
| Governments | `governments.html` | `page-governments` | 🏢 | Multi-level admin |
| Representatives | `rep-index.html` | `page-representatives` | 👥 | Rep tracking |
| States | `states.html` | `page-states` | 🗺️ | State analytics |
| Municipalities | `municipalities.html` | `page-municipalities` | 🏙️ | Municipal data |
| Parties | `parties.html` | `page-parties` | 🎯 | Party data |
| Elections | `elections.html` | `page-elections` | 🗳️ | Election data |

---

## Responsive Navigation

### Desktop (> 1024px)
- Sidebar always visible (250px)
- No toggle button
- Active state visible

### Tablet (768-1024px)
- Sidebar visible or collapsible
- Toggle button available
- Smooth transitions

### Mobile (< 768px)
- Sidebar hidden by default
- Toggle button visible (☰)
- Fixed overlay when open
- Z-index: 999
- Click outside → closes (optional)

**CSS**:
```css
/* Desktop */
@media (min-width: 1025px) {
    .sidebar { width: 250px; }
    .toggle-btn { display: none; }
}

/* Tablet */
@media (max-width: 1024px) {
    .sidebar.collapsed { width: 0; }
    .toggle-btn { display: block; }
}

/* Mobile */
@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        z-index: 999;
        transform: translateX(-100%);
    }
    .sidebar.collapsed {
        transform: translateX(0);
    }
}
```

---

## Link Validation

### Checklist

- [ ] All 9 menu items link to correct `.html` files
- [ ] No hash anchors for page links
- [ ] Dashboard → `overview.html`
- [ ] Representatives → `rep-index.html`
- [ ] Body IDs are unique
- [ ] Active state updates on click
- [ ] Sidebar toggle works on all pages
- [ ] Mobile overlay closes on mobile
- [ ] Responsive breakpoints correct (768px, 1024px)

---

## Implementation Notes

### For Developers

✅ **DO**:
- Keep sidebar identical on all 9 pages
- Use direct file links only
- Add page ID to every new page
- Test active state on each page
- Verify links before committing

❌ **DON'T**:
- Use hash anchors for page navigation
- Change file names without updating all 9 pages
- Create broken links
- Duplicate active states

### Adding a New Page

1. Copy existing page HTML
2. Update `<body id="page-newname">`
3. Add new menu item to all 9 pages
4. Link to new file
5. Test navigation

(See [Agent Guide](../development/agent.md) for adding new pages)

---

## Related Documentation

**Prerequisites**:
- [Layout](layout.md) — Responsive behavior
- [JavaScript Patterns](javascript.md) — Event handling

**Related Concepts**:
- [Components](components.md) — Sidebar component
- [Agent Guide](../development/agent.md) — Registering new pages

**Depending on This Doc**:
- All HTML pages — Navigation implementation
- [Agent Guide](../development/agent.md) — Navigation standards

---

*Last Updated*: 2026-07-04  
*Maintainer*: Navigation System  
*Version*: 1.0
