# 🧭 **Navigation System Specification**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Complete architectural contract for the 9-page navigation system |
| **👥 Audience** | Developers, Designers, AI Agents |
| **🔗 Dependencies** | [Layout](layout.md), [JavaScript Patterns](javascript.md) |
| **📌 Status** | `Stable` |

---

## 🌟 Overview

The Digital Janata (DJ) platform connects **9 primary pages** via a unified navigation framework:
* 🧭 **Sidebar Menu**: 9 main domain pages + leadership indices + utilities
* 🔝 **Header Bar**: Off-canvas toggle button, global search box, user controls
* ✨ **Active State**: Current page highlighted cleanly (`.active`)
* 🔗 **Direct Links**: Direct HTML file references (no hash anchors for page switching)

---

## 📑 Page Registry & Identifier Matrix

Every page MUST declare its unique `<body id="...">` for state tracking, test automation, and targeted CSS styling.

| # | Page Name | HTML Filename | Required `<body id>` | Icon | Core Function |
| :-: | :--- | :--- | :--- | :-: | :--- |
| **1** | **Dashboard** | `overview.html` | `page-dashboard` | 📊 | Aggregated KPI dashboard |
| **2** | **Judiciary** | `judiciary.html` | `page-judiciary` | ⚖️ | Judicial performance & metrics |
| **3** | **Legislatures** | `legislatures.html` | `page-legislatures` | 🏛️ | Parliamentary & assembly tracking |
| **4** | **Governments** | `governments.html` | `page-governments` | 🏢 | Multi-level administration |
| **5** | **Representatives** | `rep-index.html` | `page-representatives` | 👥 | Elected official directories |
| **6** | **States** | `states.html` | `page-states` | 🗺️ | State-level analytical dashboards |
| **7** | **Municipalities** | `municipalities.html` | `page-municipalities` | 🏙️ | Urban & local civic tracking |
| **8** | **Parties** | `parties.html` | `page-parties` | 🎯 | Political party data |
| **9** | **Elections** | `elections.html` | `page-elections` | 🗳️ | Electoral records & outcomes |

---

## 🏗️ Standard Sidebar Markup

```html
<aside class="sidebar">
    <div class="sidebar-header">
        <div class="sidebar-logo">DJ</div>
        <div class="sidebar-title">Digital Janata</div>
    </div>

    <nav>
        <!-- 1. Primary Navigation (9 Pages) -->
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

        <!-- 2. Leadership Indices -->
        <div class="sidebar-section">Leadership Indices</div>
        <ul class="sidebar-menu">
            <li><a href="#senate">⭐ Senate Minister Index <span class="live-badge">LIVE</span></a></li>
            <li><a href="#chief">⭐ Chief Minister Index</a></li>
        </ul>

        <!-- 3. Utilities -->
        <div class="sidebar-section">Utilities</div>
        <ul class="sidebar-menu">
            <li><a href="#support">💬 Support</a></li>
            <li><a href="#archive">📁 Archive</a></li>
        </ul>
    </nav>
</aside>
```

---

## ⚡ JavaScript Active State Automation

```javascript
// Automatically sync navigation active state
document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!link.href.includes('#')) {
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
});
```

---

## ✅ Navigation Quality Checklist

* [ ] Does **Dashboard** link directly to `overview.html`?
* [ ] Does **Representatives** link directly to `rep-index.html`?
* [ ] Does every page have its unique `<body id>` assigned?
* [ ] Is there exactly **one** `.active` class active per page?
* [ ] Does the sidebar collapse/overlay work correctly on Mobile (`<768px`)?

---

## 📚 Related Documentation

* **[Layout & Breakpoints](layout.md)** — Sidebar collapse rules
* **[JavaScript Patterns](javascript.md)** — Navigation event listeners
* **[UI Components](components.md)** — Sidebar component styles

---
