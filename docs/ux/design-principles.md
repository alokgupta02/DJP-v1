# 🎨 **Design Principles & UX System**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Define the foundational UX philosophy and design system guiding the DJP platform |
| **👥 Audience** | Developers, Designers, Contributors |
| **📌 Status** | `Stable` |

---

## 🌟 Core UX Philosophy

The Digital Janata (DJ) platform is the **digital operating system of a political party**. Every design decision serves the mission of making political participation as simple, transparent, and accessible as sending a message.

---

### 💡 6 Core User-Centered Principles

| Principle | Icon | Definition & Civic Benefit |
| :--- | :-: | :--- |
| **1. Progressive Disclosure** | 🔍 | Gradually reveal information and functionality as users need it. *Reduces cognitive overload.* |
| **2. Conversational UI** | 💬 | Design interactions that mimic natural dialogue. *Makes civic workflows approachable.* |
| **3. Mobile-First Design** | 📱 | Design and optimize for mobile devices first. *Ensures democratic access across all screens.* |
| **4. Accessibility Compliance** | ♿ | Strict WCAG 2.1 AA compliance with keyboard & screen reader support. |
| **5. Consistent Design Language**| 🎨 | Maintain visual & interaction parity across all 9 core platform apps. |
| **6. Real-Time Feedback** | ⚡ | Immediate visual confirmation for all user actions (loaders, toasts, progress bars). |

---

## 🧱 Design System Tokens Summary

### 1️⃣ Core Palette Reference
* **🔴 Primary Brand Accent:** `#a31621`
* **⚫ Dark Primary Text:** `#333333`
* **🔘 Supporting Gray:** `#999999`
* **⚪ Canvas Background:** `#f5f6f8`
* **⬜ Component Border:** `#e8ecf1`

### 2️⃣ Status Indicator Colors
* **🟢 Success:** `#52c41a`
* **🔴 Error:** `#f5222d`
* **🟡 Warning:** `#faad14`
* **🔵 Info:** `#1890ff`

---

## ✅ Implementation & QA Checklist

* [ ] Consistently apply design tokens from `colors-typography.md`.
* [ ] Verify responsive reflow across Mobile (`<768px`), Tablet (`768-1024px`), and Desktop (`>1024px`).
* [ ] Validate keyboard focus visibility (`Tab` traversal) and contrast ratios (`>= 4.5:1`).
* [ ] Implement explicit Loading, Empty, and Error UI states.

---

## 📚 Related Documentation

* **[Colors & Typography](../architecture/colors-typography.md)** — Token specification
* **[UI Components](../architecture/components.md)** — UI library markup
* **[Onboarding](../architecture/onboarding.md)** — Progressive disclosure flow

---