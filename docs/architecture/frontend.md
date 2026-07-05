# Frontend Engineering Guide

**Document Owner:** Frontend Team

**Audience:** Developers, Designers, AI Agents

**Status:** Stable

**Last Updated:** YYYY-MM-DD

---

# Purpose

This document defines the architecture, engineering standards, design principles, and implementation rules for the DJP frontend.

Every frontend contribution MUST comply with this guide.

This document is the single source of truth for frontend engineering.

---

# Objectives

The frontend must be:

- Production Ready
- Modular
- Maintainable
- Scalable
- Reusable
- Accessible
- AI-Friendly
- Independently Deployable

---

# Frontend Philosophy

The frontend is **a platform**, not a collection of pages.

Citizen and Admin are independent applications that share a common engineering foundation.

Everything reusable belongs in shared packages.

Applications should assemble reusable building blocks instead of implementing custom solutions repeatedly.

---

# Architecture

```
frontend/
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
├── prototype/
│
├── package.json
└── README.md
```

---

# Applications

## Citizen

Purpose

Public-facing platform.

Features

- Feed
- Issues
- Discussions
- Polls
- Representatives
- Notifications
- Profile
- Onboarding

Deployment

```
citizen.djp.org
```

---

## Admin

Purpose

Internal party operations.

Features

- Dashboard
- Analytics
- Moderation
- Issue Management
- Reports
- User Management
- Campaign Management

Deployment

```
admin.djp.org
```

---

# Shared Packages

## @djp/ui

Contains reusable UI components.

Examples

- Button
- Card
- Avatar
- Badge
- Modal
- Drawer
- Dialog
- Tabs
- Table
- Input
- Select
- TextArea
- Navbar
- Sidebar
- Toast
- Skeleton
- EmptyState
- ErrorState
- Loader

Rules

Must not contain business logic.

Must remain framework-agnostic except React.

No application-specific behavior.

---

## @djp/theme

Contains design tokens.

Examples

- Colors
- Typography
- Font Sizes
- Radius
- Shadows
- Spacing
- Breakpoints
- Z-index
- Motion

Never hardcode visual values.

---

## @djp/api

Contains

- Axios instance
- API services
- Authentication interceptors
- Retry policy
- Error mapping

Pages must never call fetch() directly.

---

## @djp/auth

Contains

- Session
- Token storage
- Permissions
- Route Guards
- Authentication utilities

---

## @djp/types

Contains shared TypeScript interfaces.

Examples

- User
- Issue
- Poll
- Discussion
- Representative
- Notification

---

## @djp/utils

Contains pure helper functions.

Examples

- formatDate()
- debounce()
- slugify()
- storage helpers

Must not depend on React.

---

## @djp/hooks

Contains reusable React hooks.

Examples

- useDebounce
- useInfiniteScroll
- useLocalStorage
- useWindowSize

Business-specific hooks belong inside features.

---

# Engineering Principles

## Citizen First

Every interface should reduce friction for citizen participation.

---

## Reuse Before Create

Always search existing packages before creating a new component.

Duplicate implementations are prohibited.

---

## Composition Over Duplication

Small reusable pieces.

Never large monolithic components.

---

## Feature-Oriented Development

Organize code by feature.

Not by technology.

Correct

```
features/issues/
```

Wrong

```
components/
services/
hooks/
pages/
```

for an entire application.

---

## Strict Type Safety

TypeScript strict mode is mandatory.

Avoid

```
any
```

Prefer

- interfaces
- discriminated unions
- generics

---

# Folder Convention

Example

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

# Component Guidelines

Each component should

- have one responsibility
- expose typed props
- support loading state
- support disabled state
- support accessibility
- avoid unnecessary re-rendering

Components should generally remain under 250 lines.

Split responsibilities when complexity increases.

---

# Naming Convention

Components

```
IssueCard.tsx
RepresentativeCard.tsx
```

Hooks

```
useIssue.ts
```

Utilities

```
formatDate.ts
```

Types

```
Issue.ts
```

Constants

```
issueStatus.ts
```

---

# Import Rules

Preferred

```tsx
import { Button } from "@djp/ui";
import { api } from "@djp/api";
```

Avoid

```tsx
../../../components/Button
```

Relative imports should remain within the same feature.

---

# Styling

Technology

- Tailwind CSS
- shadcn/ui

Rules

Never invent colors.

Never invent spacing.

Never invent typography.

Use theme tokens only.

Avoid custom CSS unless necessary.

No inline styles except dynamic calculations.

---

# Responsive Design

Target

- Mobile First
- Tablet
- Desktop
- Large Desktop

Breakpoints come only from the theme package.

---

# Accessibility

Minimum standard

WCAG 2.1 AA

Requirements

- Semantic HTML
- Keyboard navigation
- Focus visibility
- Screen reader labels
- Proper color contrast
- ARIA where necessary

Accessibility is not optional.

---

# State Management

Server State

TanStack Query

Client State

Zustand

Rules

Never duplicate server state inside Zustand.

Never use Zustand for API caching.

---

# Forms

Library

React Hook Form

Validation

Zod

Manual validation is prohibited.

---

# Routing

Technology

React Router

Citizen and Admin maintain independent routing trees.

Shared routing logic is prohibited.

---

# API Communication

Every request must go through

```
@djp/api
```

Never call APIs directly from components.

Business logic belongs in services or hooks.

---

# Error Handling

Every asynchronous operation must support

- Loading
- Success
- Empty
- Error

Silent failures are prohibited.

---

# Performance

Guidelines

- Lazy load routes
- Code splitting
- Memoize only when justified
- Virtualize large lists
- Optimize images
- Avoid unnecessary renders

Measure before optimizing.

---

# Prototype Usage

The prototype folder is a visual reference only.

Rules

Never modify prototype files.

Never copy HTML directly into React.

Extract reusable components first.

Then rebuild the page.

---

# AI Agent Rules

Before generating code

1. Search for existing implementation.
2. Reuse before creating.
3. Respect folder conventions.
4. Respect import rules.
5. Follow naming standards.
6. Update documentation if architecture changes.
7. Keep components focused.
8. Never duplicate business logic.
9. Never modify prototype files.
10. Follow this guide.

---

# Testing

Unit

Vitest

Component

React Testing Library

End-to-End

Playwright (future)

Every new feature should be testable.

---

# Code Review Checklist

Before merging

- Build passes
- TypeScript passes
- ESLint passes
- Responsive
- Accessible
- No duplicate components
- No dead code
- No console.log
- Uses shared packages
- Uses design tokens
- Loading state implemented
- Error state implemented
- Empty state implemented

---

# Future Roadmap

- Storybook
- Design Token Automation
- Dark Theme
- Multi-language Support
- Offline Support
- Progressive Web App
- Visual Regression Testing
- Component Documentation
- Performance Budget
- Bundle Analysis

---

# Engineering Decision

When faced with multiple implementation options:

1. Prefer the simplest maintainable solution.
2. Prefer reuse over new code.
3. Prefer composition over inheritance.
4. Prefer explicitness over cleverness.
5. Optimize for readability before optimization.
6. Build platform capabilities before feature-specific solutions.

The goal is to create a frontend platform that can support the DJP ecosystem for many years without large-scale rewrites.