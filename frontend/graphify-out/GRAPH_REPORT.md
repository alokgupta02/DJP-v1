# Graph Report - frontend  (2026-07-25)

## Corpus Check
- 105 files · ~73,993 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 461 nodes · 493 edges · 58 communities (44 shown, 14 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fbd0a323`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ESLint Config (Citizen)
- Shared UI Components
- Authentication & Onboarding
- Shared UI Components
- ESLint Config (Admin)
- Theme Module: Breakpoints
- TypeScript Config (Admin)
- TypeScript Config (Citizen)
- TypeScript Config (Admin)
- TypeScript Config (Citizen)
- Shared UI Components
- Package Module
- TypeScript Configuration
- App Layout & Navigation
- App Layout & Navigation
- TypeScript Configuration
- Civic Feature: Issues
- Citizen Module
- Theme Package
- Shared UI Components
- Civic Feature: Issues
- Civic Feature: Discussions
- Civic Feature: Notifications
- Civic Feature: Petitions
- Civic Feature: Polls
- TypeScript Config (Admin)
- Civic Feature: Discussions
- Insights & Stats Feature
- Civic Feature: Issues
- TypeScript Config (Citizen)
- Prototype Pages
- Citizen Src Module
- Civic Feature: Issues
- devDependencies
- Product
- DJPv1 FRONTEND ACTIVE STATE
- DJP Frontend Task Tracker (`frontend/fe-todo.md`)
- DJP Frontend Application
- React + TypeScript + Vite
- React + TypeScript + Vite
- DJPv1 FRONTEND IDENTITY
- DJPv1 FRONTEND OPERATIONAL RULES
- RepresentativesPage.tsx
- url.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `compilerOptions` - 16 edges
3. `compilerOptions` - 15 edges
4. `compilerOptions` - 15 edges
5. `compilerOptions` - 14 edges
6. `useSidebar()` - 12 edges
7. `Product` - 11 edges
8. `scripts` - 9 edges
9. `compilerOptions` - 6 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Topbar()` --calls--> `useSidebar()`  [EXTRACTED]
  apps/citizen/src/shared/components/navigation/Topbar.tsx → apps/citizen/src/shared/components/sidebar/SidebarContext.tsx
- `SidebarFooter()` --calls--> `useSidebar()`  [EXTRACTED]
  apps/citizen/src/shared/components/sidebar/SidebarFooter.tsx → apps/citizen/src/shared/components/sidebar/SidebarContext.tsx
- `SidebarHeader()` --calls--> `useSidebar()`  [EXTRACTED]
  apps/citizen/src/shared/components/sidebar/SidebarHeader.tsx → apps/citizen/src/shared/components/sidebar/SidebarContext.tsx
- `Sidebar()` --calls--> `useSidebar()`  [EXTRACTED]
  apps/citizen/src/shared/components/sidebar/Sidebar.tsx → apps/citizen/src/shared/components/sidebar/SidebarContext.tsx
- `SidebarNavItem()` --calls--> `useSidebar()`  [EXTRACTED]
  apps/citizen/src/shared/components/sidebar/SidebarNavItem.tsx → apps/citizen/src/shared/components/sidebar/SidebarContext.tsx

## Import Cycles
- None detected.

## Communities (58 total, 14 thin omitted)

### Community 0 - "ESLint Config (Citizen)"
Cohesion: 0.10
Nodes (20): dependencies, clsx, @hookform/resolvers, lucide-react, react, react-dom, react-hook-form, react-router-dom (+12 more)

### Community 1 - "Shared UI Components"
Cohesion: 0.12
Nodes (17): AppLayout(), Topbar(), TopbarProps, createAction, sidebarItems, Sidebar(), SidebarItem, SidebarContext (+9 more)

### Community 2 - "Authentication & Onboarding"
Cohesion: 0.11
Nodes (18): LoginPage(), INPUTS, OTPPage(), SignupPage(), Button, ButtonProps, ButtonSize, ButtonVariant (+10 more)

### Community 3 - "Shared UI Components"
Cohesion: 0.10
Nodes (16): AvatarProps, AvatarSize, sizeClasses, BadgeProps, BadgeSize, BadgeVariant, sizeClasses, variantClasses (+8 more)

### Community 4 - "ESLint Config (Admin)"
Cohesion: 0.08
Nodes (25): dependencies, react, react-dom, devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+17 more)

### Community 5 - "Theme Module: Breakpoints"
Cohesion: 0.09
Nodes (15): BreakpointKey, breakpoints, colors, theme, motion, radius, RadiusKey, semantic (+7 more)

### Community 6 - "TypeScript Config (Admin)"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 7 - "TypeScript Config (Citizen)"
Cohesion: 0.11
Nodes (18): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+10 more)

### Community 8 - "TypeScript Config (Admin)"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 9 - "TypeScript Config (Citizen)"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 10 - "Shared UI Components"
Cohesion: 0.12
Nodes (7): CATEGORIES, CONTENT_TYPES, DISCUSSIONS, ISSUES, POLLS, TOPICS, TRENDING

### Community 11 - "Package Module"
Cohesion: 0.12
Nodes (15): devDependencies, tailwindcss, @tailwindcss/vite, name, private, scripts, build:admin, build:citizen (+7 more)

### Community 12 - "TypeScript Configuration"
Cohesion: 0.13
Nodes (14): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib, module (+6 more)

### Community 13 - "App Layout & Navigation"
Cohesion: 0.24
Nodes (3): AuthLayout(), Step2Location(), NotFoundPage()

### Community 14 - "App Layout & Navigation"
Cohesion: 0.18
Nodes (6): OnboardingLayoutProps, StepInfo, STEPS, GENDERS, Step3About(), TOPICS

### Community 15 - "TypeScript Configuration"
Cohesion: 0.22
Nodes (8): compilerOptions, composite, declaration, declarationMap, outDir, rootDir, extends, include

### Community 16 - "Civic Feature: Issues"
Cohesion: 0.25
Nodes (5): categoryIcons, FILTER_TABS, Issue, ISSUES, priorityColors

### Community 17 - "Citizen Module"
Cohesion: 0.40
Nodes (4): Citizen App HTML Index, Main Module Script Reference, React Root DOM Element, router

### Community 18 - "Theme Package"
Cohesion: 0.33
Nodes (5): exports, name, private, type, version

### Community 19 - "Shared UI Components"
Cohesion: 0.40
Nodes (3): badgeVariantStyles, Discussion, DISCUSSIONS

### Community 20 - "Civic Feature: Issues"
Cohesion: 0.40
Nodes (5): Create Issue Prototype Page, Impact Scope Selector, Location Fields, Issue Priority/Impact Options, Similar Issues Automatic Check

### Community 44 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/node, @types/react (+5 more)

### Community 45 - "Product"
Cohesion: 0.17
Nodes (11): Accessibility & Inclusion, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product (+3 more)

### Community 46 - "DJPv1 FRONTEND ACTIVE STATE"
Cohesion: 0.33
Nodes (5): 2026-07-12 Session, Current Sprint, DJPv1 FRONTEND ACTIVE STATE, Session Delta Logs, Task Breakdown

### Community 47 - "DJP Frontend Task Tracker (`frontend/fe-todo.md`)"
Cohesion: 0.33
Nodes (5): 🚀 Active Sprint & Executing Tasks, 📋 Backlog & Planned Phases, DJP Frontend Task Tracker (`frontend/fe-todo.md`), Phase 6 — Live Backend Integration (Upcoming Sprint), 📝 Technical Notes & Architectural Reference

### Community 48 - "DJP Frontend Application"
Cohesion: 0.40
Nodes (4): Architecture Reference, DJP Frontend Application, DJPv1 Synchronization, Overview

### Community 49 - "React + TypeScript + Vite"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 50 - "React + TypeScript + Vite"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 51 - "DJPv1 FRONTEND IDENTITY"
Cohesion: 0.50
Nodes (3): Communication Guardrails, DJPv1 FRONTEND IDENTITY, Technical Profile

### Community 52 - "DJPv1 FRONTEND OPERATIONAL RULES"
Cohesion: 0.50
Nodes (3): Code Quality Standards, Context Allocation, DJPv1 FRONTEND OPERATIONAL RULES

## Knowledge Gaps
- **253 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+248 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AppLayout()` connect `Shared UI Components` to `App Layout & Navigation`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _255 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ESLint Config (Citizen)` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Shared UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.12258064516129032 - nodes in this community are weakly interconnected._
- **Should `Authentication & Onboarding` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Shared UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.10317460317460317 - nodes in this community are weakly interconnected._
- **Should `ESLint Config (Admin)` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._