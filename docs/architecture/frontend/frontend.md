# 💻 **Frontend Engineering Guide**

---

| Metadata | Details |
| :--- | :--- |
| **👑 Document Owner** | Frontend Team |
| **👥 Audience** | Developers, Designers, AI Agents |
| **📌 Status** | `Stable` |
| **🏷️ Version** | `v2.0.0` |
| **🔗 Dependencies** | [decisions.md](../../vision/decisions.md) |

---

## 🎯 Purpose

This document defines the architecture, engineering standards, design principles, and implementation rules for the **Digital Janata Platform (DJP)** frontend.

> [!IMPORTANT]
> Every frontend contribution MUST comply with this guide. This document is the single source of truth for frontend engineering.

---

## 🏆 Objectives

The frontend must be:
* ✅ **Production Ready**
* 🧩 **Modular** (organized by features)
* 🛠️ **Maintainable**
* ♿ **Accessible**
* 🤖 **AI-Friendly**

---

## 💡 Frontend Philosophy

The frontend is built as a single, clean Single Page Application (SPA) structure per our **Lean Codebase Philosophy**, avoiding over-engineered multi-package monorepo workspaces for the MVP stage. All shared elements (UI components, hooks, constants) are co-located within the application structure under `src/shared/`.

---

## 🏗️ Architecture

```
frontend/apps/citizen/ (React SPA Root)
│
├── public/                    # Static public assets
├── src/
│   ├── app/                   # App-wide routing, layouts, and providers
│   ├── features/              # Feature modules (independent domains)
│   │   └── issues/            # Self-contained issue feature
│   │       ├── api/           # Feature API client / queries
│   │       ├── components/    # Feature-specific components
│   │       ├── hooks/         # Feature-specific hooks
│   │       ├── pages/         # Feature page routes
│   │       └── types/         # Feature type interfaces
│   ├── shared/                # App-scoped shared logic and UI components
│   │   ├── api/               # Central HTTP client configurations
│   │   ├── components/        # Reusable UI elements (Button, Card, Input)
│   │   ├── hooks/             # App-wide custom hooks
│   │   └── theme/             # Styling/theme configurations
│   ├── App.tsx                # App base layout & providers entry
│   ├── main.tsx               # App mounting entrypoint
│   └── index.css              # Global styles
├── package.json
└── vite.config.ts
```

> [!NOTE]
> The active staging playground sandbox lives at the project root workspace under `/prototype`.

---

## 🚦 Architectural Boundary Rules

```
✅ Allowed Dependency Flow:
   [ Feature Layer ]  ──►  [ Shared App Config / UI Components ]

❌ Prohibited Flow (No Cross-Feature Direct Imports):
   [ Feature A ]  ──X──►  [ Feature B ]
```

* Inter-feature communication must happen via shared application state or providers—never by directly importing files inside another feature's private directory.

---

## 📱 Applications

### 1️⃣ Citizen
* **🎯 Purpose:** Public-facing platform.
* **✨ Features:** Feed, Issues, Discussions, Polls, Representatives, Notifications, Profile, Onboarding.

---

## 📐 Engineering Principles

### 1. 👤 Citizen First
Every interface should reduce friction for citizen participation.

### 2. 🔁 Reuse Before Create
Always search existing shared components before creating a new component. Duplicate implementations are strictly prohibited.

### 3. 🧩 Composition Over Duplication
Small reusable pieces over large monolithic components.

### 4. 📁 Feature-Oriented Development
Organize code by feature, not by technical layer across the entire app:
```
✅ Preferred:  features/issues/
❌ Avoid:      components/ services/ hooks/ pages/ (at root level)
```

### 5. 🛡️ Strict Type Safety
TypeScript strict mode is mandatory. Avoid `any`. Prefer interfaces, discriminated unions, and generics.

---

## 🧱 Component Guidelines

Each component should:
* [ ] Have **one responsibility**
* [ ] Expose **typed props**
* [ ] Support **loading state**
* [ ] Support **disabled state**
* [ ] Ensure **accessibility (ARIA / keyboard navigation)**
* [ ] Avoid **unnecessary re-rendering**

> [!TIP]
> Keep components under **250 lines**. Split responsibilities when complexity increases.

---

## 🏷️ Naming Conventions

| Category | Convention | Example |
| :--- | :--- | :--- |
| **Components** | PascalCase | `IssueCard.tsx`, `RepresentativeCard.tsx` |
| **Hooks** | camelCase prefixed with `use` | `useIssue.ts` |
| **Utilities** | camelCase | `formatDate.ts` |
| **Types / Interfaces** | PascalCase | `Issue.ts` |
| **Constants** | camelCase / UPPER_SNAKE | `issueStatus.ts` |

---

## 📥 Import Rules

* ✅ **Preferred:** Absolute shared imports (`import { Button } from "@/shared/components";`)
* ❌ **Avoid:** Deeply nested relative imports (`../../../components/Button`)
* *Relative imports should remain strictly within the same feature folder.*

---

## 🎨 Styling & Responsive Design

* **Stack:** Tailwind CSS + shadcn/ui
* **Rules:** Never invent colors, spacing, or typography. Use `@/shared/theme` tokens or standard Tailwind utility classes.
* **Breakpoints:** Mobile-First → Tablet (`md`) → Desktop (`lg`) → Large Desktop (`xl`).

---

## ♿ Accessibility (WCAG 2.1 AA Mandatory)

* [ ] Semantic HTML5 elements
* [ ] Full keyboard navigation & visible focus indicators
* [ ] Screen reader labels (`aria-label`, `aria-describedby`)
* [ ] Proper color contrast ratio (minimum 4.5:1 for text)

---

## 🗃️ State Management, Forms & Routing

| Domain | Technology | Rules |
| :--- | :--- | :--- |
| **Server State** | TanStack Query | Caching, synchronization, background refetching |
| **Client State** | Zustand | Global UI preferences. *Never duplicate server state or cache APIs in Zustand.* |
| **Forms** | React Hook Form + Zod | Fully typed schema validation. Manual validation prohibited. |
| **Routing** | React Router | Application routing tree with page and layout routes. |

---

## ⚠️ Error Handling & Performance

Every asynchronous operation must explicitly support 4 UI states:
1. **⏳ Loading state** (skeleton or spinner)
2. **✅ Success state** (rendered data)
3. **📭 Empty state** (informative empty state UI)
4. **❌ Error state** (user-friendly error UI with retry action)

---

## 🖼️ Prototype Usage (`/prototype`)

For details on sandbox rules, staging servers, and the copy-port flow between production and prototype workspaces, refer to the **[Prototype Staging & Playground Guide](../../prototype/README.md)**.

---

## 🤖 AI Agent Rules

Before generating any code:
1. Search for existing implementations and reusable components.
2. Respect folder conventions, import rules, and naming standards.
3. Update documentation if architecture or APIs change.
4. Keep components focused and never duplicate business logic.

---

## 🧪 Testing

* **Unit Testing:** Vitest
* **Component Testing:** React Testing Library
* **E2E Testing:** Playwright

---

## ✅ Code Review & PR Checklist

Before merging any Pull Request:
* [ ] Build passes cleanly
* [ ] TypeScript compiler passes strictly
* [ ] Linter rules pass
* [ ] Responsive layouts verified across breakpoints
* [ ] Accessible via keyboard navigation and screen readers
* [ ] Uses shared components & theme design tokens
* [ ] Explicit Loading, Empty, and Error states implemented

---

## 🧭 Engineering Decision Matrix

When faced with multiple implementation options:
1. Prefer the **simplest maintainable solution**.
2. Prefer **reuse** over new code.
3. Prefer **composition** over inheritance.
4. Prefer **explicitness** over cleverness.
5. Optimize for **readability** before performance optimization.