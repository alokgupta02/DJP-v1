# 🏗️ **Frontend Directory & Monorepo Structure**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Canonical specification defining how all frontend source files, packages, and features are organized |
| **👥 Audience** | Developers, Designers, AI Agents |
| **📌 Status** | `Stable` |

---

## 🌟 Overview

Every feature, component, hook, API service, route, and utility MUST adhere to this directory structure.
> [!IMPORTANT]
> This document is the strict source of truth for project folder organization across the DJP frontend ecosystem.

---

## 💎 Core Organization Principles

1. **📁 Feature First**: Group code by business domain/feature rather than technical layer.
2. **🔁 Reuse Before Create**: Check shared `@djp/*` packages before creating new components.
3. **📦 Shared Before Duplicate**: Move cross-feature utilities into workspace packages.
4. **🧩 Small Components**: Keep components single-responsibility and well under 250 lines.
5. **🛡️ Typed Everything**: Strict TypeScript across all modules and interfaces.

---

## 🌳 Monorepo Workspace Hierarchy

```
frontend/
├── apps/
│   ├── citizen/              # Public-facing Citizen Web App
│   └── admin/                # Internal Operations & Governance App
│
└── packages/
    ├── api/                  # Shared Axios client & API services
    ├── auth/                 # Session, permissions & route guards
    ├── hooks/                # Framework-agnostic React hooks
    ├── theme/                # Design tokens & CSS variables
    ├── types/                # Core domain TypeScript interfaces
    ├── ui/                   # Reusable UI component library (shadcn/ui)
    └── utils/                # Pure helper & formatting utilities
```

---

## 📱 Application Internal Architecture (`apps/citizen/src`)

```
src/
├── app/                      # App-wide wiring (Layouts, Router, Providers)
├── features/                 # Domain-specific feature modules
├── shared/                   # App-scoped static assets & config
└── main.tsx                  # Application entry point
```

### 1️⃣ `/src/app` (Application Infrastructure)
Contains application bootstrap wiring only (`/layouts`, `/router`, `/providers`). Must not contain domain business logic.

### 2️⃣ `/src/features` (Feature Modules)
Every business capability is isolated as an autonomous feature folder:
```
features/
├── issues/
│   ├── api/                  # Feature-specific API endpoints
│   ├── components/           # UI components scoped to issues
│   ├── hooks/                # Hooks scoped to issues
│   ├── pages/                # Route views for issues
│   ├── types/                # Feature-scoped types
│   └── index.ts              # Public feature export barrel
├── discussions/
├── polls/
└── profile/
```

---

## 📦 Shared Workspace Packages Overview

| Package | Scope & Rules |
| :--- | :--- |
| **`packages/ui`** | Contains visual components (`Button`, `Card`, `Modal`, `Table`, `Skeleton`). Pure presentation only; **zero business logic**. |
| **`packages/theme`** | Design tokens (`colors`, `typography`, `spacing`, `radius`). No React components. |
| **`packages/api`** | HTTP client instance, auth interceptors, and error handling. Pages never call raw `fetch()` directly. |
| **`packages/auth`** | Session state, RBAC permissions, token persistence, and route protection guards. |
| **`packages/types`** | Shared domain entities (`Issue`, `User`, `Poll`, `Representative`, `Discussion`). |
| **`packages/utils`** | Pure functional helpers (`formatDate`, `slugify`). Must remain framework-agnostic. |

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

## 📚 Related Documentation

* **[Frontend Engineering Guide](frontend.md)** — Core engineering guide
* **[UI Components](components.md)** — UI component library

---
