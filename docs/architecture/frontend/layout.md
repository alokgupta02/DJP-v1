# 📱 **Layout & Responsive Design Specification**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Single source of truth for responsive breakpoints and layout behavior |
| **👥 Audience** | Developers, Designers, AI Agents |
| **🔗 Dependencies** | [Colors & Typography](colors-typography.md) |
| **📌 Status** | `Stable` |

---

## 🌟 Overview

The Digital Janata (DJ) platform implements a **Mobile-First Responsive Design** strategy centered around three foundational breakpoints:
* 📱 **Mobile**: `< 768px`
* 📟 **Tablet**: `768px – 1024px`
* 💻 **Desktop**: `> 1024px`

---

## 📏 Breakpoint Specification Matrix

| Device Class | Screen Width | Media Query Condition | Target Devices |
| :--- | :--- | :--- | :--- |
| **📱 Mobile** | `< 768px` | Default (No query needed) | Smartphones, small tablets |
| **📟 Tablet** | `768px – 1024px` | `@media (min-width: 768px)` | Standard iPads, tablets |
| **💻 Desktop** | `> 1024px` | `@media (min-width: 1025px)` | Laptops, large desktop monitors |

### 🛠️ Core Media Query Pattern
```css
/* Mobile First Base Style */
.container { max-width: 100%; padding: 16px; }

/* Tablet Override */
@media (min-width: 768px) {
    .container { padding: 24px; }
}

/* Desktop Override */
@media (min-width: 1025px) {
    .container { max-width: 1400px; margin: 0 auto; padding: 32px; }
}
```

---

## 📐 Layout Patterns & Sidebar Transformations

### 1️⃣ Desktop Layout (`> 1024px`)
* **Header:** Full width (`64px` height)
* **Sidebar:** Fixed left column (`250px` width)
* **Main Content:** Flex `1` (Responsive Grid)

```
┌───────────────────────────────────────────────┐
│ 🔝 Header (64px)                              │
├───────────────┬───────────────────────────────┤
│ 🧭 Sidebar    │ 📊 Main Content               │
│    (250px)    │    (3-Column Grid Layout)     │
└───────────────┴───────────────────────────────┘
```

### 2️⃣ Tablet Layout (`768px – 1024px`)
* **Header:** Navigation Toggle visible
* **Sidebar:** Collapsible (`250px` width when open)
* **Main Content:** 2-Column Grid

### 3️⃣ Mobile Layout (`< 768px`)
* **Header:** Navigation Toggle button visible, compact search
* **Sidebar:** Fixed Off-Canvas Drawer Overlay (`z-index: 999`)
* **Main Content:** Single stacked column (`1fr`)

---

## 🗂️ Grid Layout Responsive Transformations

| Layout Component | Desktop (`> 1024px`) | Tablet (`768px - 1024px`) | Mobile (`< 768px`) |
| :--- | :--- | :--- | :--- |
| **KPI Metrics Grid** | 3 Columns (`repeat(3, 1fr)`) | 2 Columns (`repeat(2, 1fr)`) | 1 Stacked Column (`1fr`) |
| **Content Sections** | 2 Columns (`50% / 50%`) | 2 Columns (Narrower gap) | 1 Stacked Column (`1fr`) |
| **Data Tables** | Full Width | Full Width | Horizontal Touch Scroll (`overflow-x: auto`) |

---

## 🔡 Typography Responsive Scaling

```css
/* Desktop Base */
h1 { font-size: 32px; }
h2 { font-size: 20px; }
h3 { font-size: 18px; }

/* Tablet Scaling */
@media (max-width: 1024px) {
    h1 { font-size: 28px; }
    h2 { font-size: 18px; }
    h3 { font-size: 16px; }
}

/* Mobile Scaling */
@media (max-width: 768px) {
    h1 { font-size: 24px; }
    h2 { font-size: 16px; }
    h3 { font-size: 14px; }
}
```

---

## 🧪 Device Verification Checklist

When testing responsive layouts, verify against the following device dimensions in Chrome DevTools (`Ctrl+Shift+M`):
* [ ] **iPhone SE** (`375px`)
* [ ] **iPhone 12 / 14** (`390px` / `414px`)
* [ ] **iPad** (`768px`)
* [ ] **iPad Pro** (`1024px`)
* [ ] **Laptop Standard** (`1366px`)
* [ ] **Full HD Monitor** (`1920px`)

> [!IMPORTANT]
> Ensure interactive tap targets are at least **44px × 44px** on touch devices.

---

## 📚 Related Documentation

* **[Colors & Typography](colors-typography.md)** — Design tokens & font scale
* **[Components](components.md)** — Component responsive behavior
* **[Navigation](navigation.md)** — Sidebar collapse and overlay behavior

---
