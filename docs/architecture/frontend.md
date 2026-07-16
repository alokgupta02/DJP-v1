# 💻 **Frontend Engineering Guide**

---

| Metadata | Details |
| :--- | :--- |
| **👑 Document Owner** | Frontend Team |
| **👥 Audience** | Developers, Designers, AI Agents |
| **📌 Status** | `Stable` |

---

## 🎯 Purpose

This document defines the architecture, engineering standards, design principles, and implementation rules for the **Digital Janata Platform (DJP)** frontend.

> [!IMPORTANT]
> Every frontend contribution MUST comply with this guide. This document is the single source of truth for frontend engineering.

---

## 🏆 Objectives

The frontend must be:
* ✅ **Production Ready**
* 🧩 **Modular**
* 🛠️ **Maintainable**
* 📈 **Scalable**
* 🔁 **Reusable**
* ♿ **Accessible**
* 🤖 **AI-Friendly**
* 🚀 **Independently Deployable**

---

## 💡 Frontend Philosophy

The frontend is **a platform**, not a collection of pages.

* **Citizen** and **Admin** are independent applications sharing a common engineering foundation.
* Everything reusable belongs in **shared packages**.
* Applications should assemble reusable building blocks instead of implementing custom solutions repeatedly.

---

## 🏗️ Architecture

```
frontend/ (Production monorepo root)
│
├── apps/
│   ├── citizen/
│   └── admin/
│
├── packages/
│   ├── api/
│   ├── auth/
│   ├── config/
│   ├── constants/
│   ├── hooks/
│   ├── theme/
│   ├── types/
│   ├── ui/
│   └── utils/
│
├── package.json
└── README.md
```

> [!NOTE]
> The active staging playground sandbox lives at the project root workspace under `/prototype`.

### 📱 Application Internal Architecture (`apps/citizen/src`)

```
src/
├── app/                      # App-wide wiring (Layouts, Router, Providers)
├── features/                 # Domain-specific feature modules
├── shared/                   # App-scoped static assets & config
└── main.tsx                  # Application entry point
```

* **`/src/app` (Application Infrastructure)**: Contains application bootstrap wiring only (`/layouts`, `/router`, `/providers`). Must not contain domain business logic.
* **`/src/features` (Feature Modules)**: Every business capability is isolated as an autonomous feature folder (e.g., `features/issues/`).

---

## 🚦 Architectural Boundary Rules

```
✅ Allowed Dependency Flow:
   [ Feature Layer ]  ──►  [ Shared App Config ]  ──►  [ Shared Workspace Packages (@djp/*) ]

❌ Prohibited Flow (No Cross-Feature Direct Imports):
   [ Feature A ]  ──X──►  [ Feature B ]
```

* Inter-feature communication must happen via shared packages, events, or state stores—never by directly importing files inside another feature's private directory.

---

## 📱 Applications

### 1️⃣ Citizen (`citizen.djp.org`)
* **🎯 Purpose:** Public-facing platform.
* **✨ Features:** Feed, Issues, Discussions, Polls, Representatives, Notifications, Profile, Onboarding.

### 2️⃣ Admin (`admin.djp.org`)
* **🎯 Purpose:** Internal party operations.
* **✨ Features:** Dashboard, Analytics, Moderation, Issue Management, Reports, User Management, Campaign Management.

---

## 📦 Shared Packages

| Package | Purpose | Core Contents & Rules |
| :--- | :--- | :--- |
| **`@djp/ui`** | Reusable UI Components | Button, Card, Avatar, Badge, Modal, Drawer, Table, Input, Toast, Skeleton, Empty/Error states. *No business logic. React-compatible.* |
| **`@djp/theme`** | Design Tokens | Colors, Typography, Font Sizes, Radius, Shadows, Spacing, Breakpoints, Motion. *Never hardcode visual values.* |
| **`@djp/api`** | HTTP Communication | Axios instance, API services, Auth interceptors, retry policy, error mapping. *Never call `fetch()` directly from UI.* |
| **`@djp/auth`** | Identity & Access | Session management, token storage, permissions, Route Guards, Auth utilities. |
| **`@djp/types`** | Shared TypeScript Interfaces | `User`, `Issue`, `Poll`, `Discussion`, `Representative`, `Notification`. |
| **`@djp/utils`** | Pure Helper Functions | `formatDate()`, `debounce()`, `slugify()`, storage helpers. *Must not depend on React.* |
| **`@djp/hooks`** | Reusable React Hooks | `useDebounce`, `useInfiniteScroll`, `useLocalStorage`, `useWindowSize`. |

---

## 📐 Engineering Principles

### 1. 👤 Citizen First
Every interface should reduce friction for citizen participation.

### 2. 🔁 Reuse Before Create
Always search existing packages before creating a new component. Duplicate implementations are strictly prohibited.

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

## 📂 Folder Convention

```
features/
└── issues/
    ├── api/
    ├── components/
    ├── hooks/
    ├── pages/
    ├── types/
    └── index.ts
```

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

* ✅ **Preferred:** Absolute shared imports (`import { Button } from "@djp/ui";`)
* ❌ **Avoid:** Deeply nested relative imports (`../../../components/Button`)
* *Relative imports should remain strictly within the same feature folder.*

---

## 🎨 Styling & Responsive Design

* **Stack:** Tailwind CSS + shadcn/ui
* **Rules:** Never invent colors, spacing, or typography. Use `@djp/theme` tokens only.
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
| **Routing** | React Router | Citizen and Admin maintain independent routing trees. |

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
* [ ] Uses shared `@djp/ui` components & `@djp/theme` design tokens
* [ ] Explicit Loading, Empty, and Error states implemented

---

## 🧭 Engineering Decision Matrix

When faced with multiple implementation options:
1. Prefer the **simplest maintainable solution**.
2. Prefer **reuse** over new code.
3. Prefer **composition** over inheritance.
4. Prefer **explicitness** over cleverness.
5. Optimize for **readability** before performance optimization.

---