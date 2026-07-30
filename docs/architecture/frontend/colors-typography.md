# 🎨 **Colors & Typography Design Tokens**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Single source of truth for foundational design tokens (colors, fonts, spacing, shadows) |
| **👥 Audience** | Developers, Designers, AI Agents |
| **🔗 Dependencies** | None (Foundational Token Reference) |
| **📌 Status** | `Stable` |

---

## 🌟 Overview

This document defines all visual design tokens used across the **Digital Janata Platform (DJP)**.
> [!IMPORTANT]
> **Use this document as the single source of truth**—never invent or hardcode arbitrary colors, font sizes, or spacing values outside these specifications.

---

## 🌈 Color Palette

### 1️⃣ Primary & Neutral Palette

| Token Name | Hex Code | RGB | Usage Description |
| :--- | :--- | :--- | :--- |
| **🔴 Primary Brand** | `#a31621` | `255, 107, 91` | Primary CTA buttons, active navigation states, highlights, focus rings |
| **⚫ Dark Primary** | `#333333` | `51, 51, 51` | Primary body text, headings, strong emphasis elements |
| **🔘 Gray Secondary** | `#999999` | `153, 153, 153` | Secondary text, form labels, captions, disabled UI states |
| **⚪ Page Background** | `#f5f6f8` | `245, 246, 248` | Page canvas background, secondary containers |
| **⬜ Card Border** | `#e8ecf1` | `232, 236, 241` | Component dividers, card outlines, table row borders |

---

### 2️⃣ Status Indicator Colors

| Token Name | Hex Code | RGB | Usage Description |
| :--- | :--- | :--- | :--- |
| **🟢 Success** | `#52c41a` | `82, 196, 26` | Positive trends, successful validations, approved badges |
| **🔴 Error / Danger** | `#f5222d` | `245, 34, 45` | Negative trends, destructive actions, error badges |
| **🟡 Warning** | `#faad14` | `250, 173, 20` | Cautionary states, pending validations, warning pills |
| **🔵 Info / Neutral** | `#1890ff` | `24, 144, 255` | Informational callouts, active processing indicators |

---

## 🔡 Typography System

### 1️⃣ Core Font Stack
```css
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
                 "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji";
}
```

### 2️⃣ Type Scale & Line Heights

| Hierarchy Level | Font Size | Weight | Line Height | Typical Application |
| :--- | :--- | :--- | :--- | :--- |
| **Large Title (`h1`)** | `32px` | `700` (Bold) | `1.2` | Major page titles, primary KPI values |
| **Section Title (`h2`)** | `20px` | `600` (Semibold) | `1.3` | Card headers, section headers |
| **Subsection Title (`h3`)** | `18px` | `600` (Semibold) | `1.4` | Group headings, modal titles |
| **Body Copy (`p`)** | `14px` | `400` (Normal) | `1.6` | Standard descriptive text |
| **Form Label (`label`)** | `13px` | `500` (Medium) | `1.5` | Input labels, action buttons |
| **Small Text (`.small`)** | `12px` | `400` (Normal) | `1.5` | Helper text, secondary captions |
| **Tiny Pill (`.tiny`)** | `11px` | `600` (Semibold) | `1.4` | Badges, status pills |

---

## 📐 Spacing & Border Radius Tokens

### 1️⃣ Spacing Scale Table

| Token Value | Purpose & Example Usage |
| :--- | :--- |
| **`4px`** | Micro-spacing (icon to text gaps, tiny inline margins) |
| **`8px`** | Extra small (compact button padding, chip intervals) |
| **`12px`** | Small (component internal gaps, stacked list spacing) |
| **`16px`** | Medium (standard button padding, mobile container padding) |
| **`20px`** | Medium-large (card internal padding on smaller screens) |
| **`24px`** | Large (card internal padding on desktop, section intervals) |
| **`32px`** | Extra large (desktop layout wrapper padding) |

---

### 2️⃣ Border Radius Tokens

| Radius Value | Component Application |
| :--- | :--- |
| **`4px`** | Status badges, tags, pills |
| **`6px`** | Input boxes, action buttons |
| **`8px`** | Content cards, metric cards, dropdown menus |
| **`12px`** | Large modals, section containers |
| **`50%`** | User profile avatars |

---

## 🌤️ Box Shadows & Animation Transitions

### 1️⃣ Shadow Hierarchy
```css
/* Card Elevation */
.card-shadow { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); }

/* Modal & Popover Elevation */
.modal-shadow { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }

/* Interactive Focus Ring */
.focus-ring { box-shadow: 0 0 0 2px rgba(255, 107, 91, 0.2); }
```

### 2️⃣ Animation Timing
```css
/* Quick Micro-interactions */
.transition-fast { transition: all 0.15s ease-in-out; }

/* Standard UI Transitions */
.transition-standard { transition: all 0.2s ease-in-out; }
```

---

## ✅ Best Practices for Developers & Designers

* [ ] Consistently copy these exact token values when crafting new UI components.
* [ ] Avoid creating custom hex colors or non-standard font sizes.
* [ ] When introducing a new design token, update this document before modifying UI implementations.

---

## 📚 Related Documentation

* **[Layout & Responsive Design](layout.md)** — Spacing at responsive breakpoints
* **[UI Components](components.md)** — How design tokens are applied to elements

---
