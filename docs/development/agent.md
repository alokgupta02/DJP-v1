# 🤖 **AI Agent Interaction & Development Guide**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Canonical operational guide for AI agents and developers on reading, modifying, and navigating the DJP repository |
| **👥 Audience** | AI Agents, Developers, Contributors |
| **🔗 Dependencies** | [Architecture Overview](../architecture/overview.md) |
| **📌 Status** | `Stable` |

---

## 🌟 Overview

This guide establishes strict operational conventions for AI agents working within the Digital Janata Platform (DJP) repository. Following these rules ensures consistency, lean codebases, and zero accidental drift.

---

## 📁 Repository & Documentation Directory Tree

```
DJP-v1/
├── docs/
│   ├── architecture/          # Design tokens, components, layout, navigation, structure
│   ├── vision/                # Product vision, roadmap, architectural decision records (ADRs)
│   ├── ux/                    # UX philosophy, issues, discussions, polls
│   ├── development/           # AI agent operational guide
│   ├── deployment/            # Static hosting, CI/CD, servers
│   └── md-file/               # Markdown visual styling and SDLC teaching frameworks
├── prototype/                 # Prototype static HTML/CSS/JS visual references
└── todo.md                    # Living progress task list
```

---

## 🚦 Key Operating Rules for AI Agents

### 1️⃣ Lean Codebase & File Creation Rules
* **Modify Before Create:** Always determine whether a task can be completed by modifying an existing file.
* **No Boilerplate:** Never generate placeholder code, unused files, or speculative abstractions.
* **Keep `todo.md` Synchronized:** Always maintain accurate `[ ]`, `[/]`, and `[x]` task checkboxes.

### 2️⃣ Design System & Styling
* **Single Source of Truth:** Reference `docs/architecture/colors-typography.md` for design tokens.
* **No Arbitrary Tokens:** Never invent arbitrary hex colors, font sizes, or spacing values.
* **Responsive Verification:** Ensure all layout components work seamlessly across `<768px`, `768-1024px`, and `>1024px`.

---

## 📑 Documentation Navigation Matrix

| Topic Area | Primary Document Link | Core Scope |
| :--- | :--- | :--- |
| **Architecture Overview** | [`overview.md`](../architecture/overview.md) | High-level system topology & platform architecture |
| **Frontend Structure** | [`frontend-structure.md`](../architecture/frontend-structure.md) | Monorepo apps and workspace packages (`@djp/*`) |
| **Design Tokens** | [`colors-typography.md`](../architecture/colors-typography.md) | Colors, typography scales, spacing, shadows |
| **UI Components** | [`components.md`](../architecture/components.md) | Component library markup & structure |
| **Navigation System** | [`navigation.md`](../architecture/navigation.md) | 9-page navigation & active state rules |
| **JavaScript Patterns** | [`javascript.md`](../architecture/javascript.md) | Event delegation, DOM caching, Chart.js patterns |
| **UX Philosophy** | [`design-principles.md`](../ux/design-principles.md) | Progressive disclosure & mobile-first guidelines |
| **Deployment Guide** | [`deployment.md`](../deployment/deployment.md) | Hosting, local servers, and edge CDN rules |

---

## 🛠️ Standard Agent Task Workflows

### 1️⃣ Modifying or Creating Documentation
1. Follow the visual structure of `docs/md-file/improvedlearning.md`.
2. Include standard YAML/Markdown metadata table at the top.
3. Use structured tables, icons, and clear section dividers (`---`).

### 2️⃣ Adding or Updating Frontend Components
1. Check `packages/ui` before creating any new UI primitive.
2. Adhere strictly to existing directory ownership rules.
3. Remove unused imports and dead code before marking any task finished.

---

## 📚 Related Documentation

* **[Architecture Overview](../architecture/overview.md)** — Core architecture
* **[SDLC Standards](../md-file/sdlc.md)** — Documentation workflow

---
