# Frontend Structure

## Purpose

This document defines how all frontend code is organized.

Every feature, component, hook, API, route, and utility MUST follow this structure.

This document is the source of truth for project organization.

---

# Principles

1. Feature First
2. Reuse Before Create
3. Shared Before Duplicate
4. Small Components
5. Typed Everything

---

# Monorepo

frontend/
│
├── apps/
│   ├── citizen/
│   └── admin/
│
└── packages/
    ├── api/
    ├── auth/
    ├── hooks/
    ├── theme/
    ├── types/
    ├── ui/
    └── utils/

---

# Citizen

src/

app/
features/
shared/

main.tsx

---

# App

Contains application wiring.

app/

layouts/
router/
providers/

No business logic.

---

# Features

Every business capability is a feature.

Example

features/

issues/

discussions/

polls/

profile/

notifications/

Each feature owns its own:

components/

hooks/

api/

types/

routes/

pages/

---

# Shared

Contains application-specific reusable code.

shared/

assets/

constants/

config/

Never place business logic here.

---

# UI Package

packages/ui

Contains reusable visual components.

Button

Card

Modal

Drawer

Input

Sidebar

Navbar

Avatar

Badge

Table

Loader

Skeleton

EmptyState

ErrorState

No business logic.

---

# Theme Package

Contains design tokens only.

No React.

No Components.

---

# API Package

Owns every HTTP request.

Applications never call fetch() directly.

---

# Auth Package

Authentication

Permissions

Session

Route Guards

---

# Utils

Pure functions only.

No React.

No API calls.

---

# Types

Shared interfaces.

Issue

User

Poll

Representative

Discussion

---

# Rules

Never import across features.

Allowed

Feature

↓

Shared

↓

Packages

Not allowed

Feature A

↓

Feature B

Communication happens through packages or APIs.

---

# Folder Ownership

Feature owns business logic.

Packages own reusable infrastructure.

Apps compose features.
