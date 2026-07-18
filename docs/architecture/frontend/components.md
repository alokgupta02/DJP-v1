# 🧩 **UI Components Catalog**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Catalog of reusable UI components, HTML structure, and style contracts |
| **👥 Audience** | Developers, Designers, Contributors |
| **🔗 Dependencies** | [Colors & Typography](colors-typography.md), [Layout](layout.md) |
| **📌 Status** | `Stable` |

---

## 🌟 Overview

The Digital Janata (DJ) platform uses a modular set of reusable components built with clean HTML/CSS/React tokens. Each component is designed to be:
* 🎯 **Simple**: Easy to understand, inspect, and modify
* 🎨 **Consistent**: Strictly consumes design tokens from [Colors & Typography](colors-typography.md)
* 📱 **Responsive**: Fluidly adapts to mobile, tablet, and desktop (see [Layout](layout.md))
* ♿ **Accessible**: Semantic HTML elements with high-contrast accessibility

---

## 📚 Component Library

### 1️⃣ 🧭 Sidebar Navigation
* **🎯 Purpose:** Primary navigation menu for all pages
* **📍 Location:** Left side of screen (`250px` width on desktop)
* **📱 Responsive:** Fixed overlay on mobile screens; collapsible on tablet

```html
<aside class="sidebar">
    <div class="sidebar-header">
        <div class="sidebar-logo">DJ</div>
        <div class="sidebar-title">Digital Janata</div>
    </div>
    <nav>
        <ul class="sidebar-menu">
            <li><a href="overview.html" class="active">📊 Dashboard</a></li>
        </ul>
    </nav>
</aside>
```

---

### 2️⃣ 🔝 Header Bar
* **🎯 Purpose:** Top-level application bar and user profile controls
* **📍 Location:** Top of screen (`fixed`, `64px` height)
* **✨ Content:** Navigation toggle, global search box, notification badges, user profile menu

```html
<header class="header">
    <div class="header-left">
        <button id="sidebarToggle" class="toggle-btn" aria-label="Toggle Navigation">☰</button>
        <input type="search" class="search-box" placeholder="Search...">
    </div>
    <div class="header-right">
        <button class="icon-btn" aria-label="Notifications">🔔</button>
        <button class="icon-btn" aria-label="Settings">⚙️</button>
        <div class="user-avatar">AG</div>
    </div>
</header>
```

---

### 3️⃣ 📊 Metric Card (KPI Display)
* **🎯 Purpose:** Display key performance indicators along with trend arrows
* **📐 Layout:** Responsive Grid (3 columns on desktop → 2 on tablet → 1 on mobile)

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

* **🎨 Color Indicators:**
  * Positive trend (`↑`): `#52c41a` (Success Green)
  * Negative trend (`↓`): `#f5222d` (Danger Red)

---

### 4️⃣ 🗂️ Section Container Card
* **🎯 Purpose:** Structured container for content blocks, activity tables, or lists

```html
<div class="section">
    <div class="section-header">
        <h2 class="section-title">Top Performers</h2>
        <a href="#" class="section-action">View Full</a>
    </div>
    <div class="section-content">
        <!-- Section body content -->
    </div>
</div>
```

---

### 5️⃣ 📋 Data Table
* **🎯 Purpose:** Structured tabular data display (representatives, bills, issues)
* **📱 Responsive:** Full width on desktop; horizontal overflow scrolling on smaller screens

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

---

### 6️⃣ 🔘 Button Variants
* **🎯 Purpose:** Interactive triggers for primary actions and secondary dismissals

```html
<!-- Primary Action -->
<button class="button primary">Save Changes</button>

<!-- Secondary Action -->
<button class="button secondary">Cancel</button>
```

---

### 7️⃣ 🏷️ Status Badges & Pills
* **🎯 Purpose:** Concise status tags and categorization labels

```html
<span class="badge approved">Approved</span>
<span class="badge in-progress">In Progress</span>
<span class="badge pending">Pending</span>
```

---

### 8️⃣ 📈 Progress Bar
* **🎯 Purpose:** Visual indicator of completion percentage or budget utilization

```html
<div class="progress-bar">
    <div class="progress-fill success" style="width: 65%;"></div>
</div>
```

---

### 9️⃣ 👤 User Avatar
* **🎯 Purpose:** User profile initials with distinct gradient backgrounds

```html
<div class="user-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    AK
</div>
```

---

### 🔟 📈 Chart Container
* **🎯 Purpose:** Standardized canvas container for Chart.js / interactive graphics

```html
<div class="chart-container">
    <canvas id="myChart"></canvas>
</div>
```

---

## 📏 Component Summary Matrix

| Component | Dimensions | Primary Use Case | Responsive Behavior |
| :--- | :--- | :--- | :--- |
| **🧭 Sidebar** | `250px` × full height | Application navigation | Collapses / Mobile Overlay |
| **🔝 Header** | full width × `64px` | Global search & user controls | Adaptive spacing |
| **📊 Metric Card** | Auto × Auto | KPI metrics & trends | Fluid grid wrap |
| **🗂️ Section Card** | full width × Auto | Content blocks | Fluid padding |
| **📋 Data Table** | full width × Auto | Structured records | Horizontal scroll on overflow |
| **🔘 Button** | Auto × Auto | Action triggers | Touch-friendly hit target |
| **🏷️ Badge** | Auto × Auto | Inline status label | Inline block |
| **📈 Progress Bar** | full width × `4px` | Completion ratio | Responsive width |
| **👤 Avatar** | `40px` × `40px` | User identity | Scalable variants (`24px`, `64px`) |

---

## ✅ Best Practices for Implementation

* [ ] Always reuse these established components before writing custom UI markup.
* [ ] Consume design tokens (`@djp/theme` or token classes) rather than hardcoded hex values.
* [ ] Test component rendering across Mobile (`<768px`), Tablet (`768-1024px`), and Desktop (`>1024px`).

---

## 📚 Related Documentation

* **[Colors & Typography](colors-typography.md)** — Core design tokens
* **[Layout](layout.md)** — Responsive container rules
* **[Navigation System](navigation.md)** — Navigation patterns
* **[Agent Guide](../development/agent.md)** — Development guidelines

---
