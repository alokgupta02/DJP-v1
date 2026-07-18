# Graph Report - .  (2026-07-15)

## Corpus Check
- 227 files · ~110,960 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 418 nodes · 459 edges · 50 communities (37 shown, 13 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- App Layout & Navigation
- Shared UI Components
- Authentication & Onboarding
- ESLint Config (Admin)
- Theme Module: Breakpoints
- ESLint Config (Citizen)
- TypeScript Config (Admin)
- TypeScript Config (Citizen)
- TypeScript Config (Admin)
- TypeScript Config (Citizen)
- Shared UI Components
- Package Module
- TypeScript Configuration
- Dependencies (Citizen)
- App Layout & Navigation
- App Layout & Navigation
- TypeScript Configuration
- Civic Feature: Issues
- Citizen Module
- Theme Package
- Shared UI Components
- Civic Feature: Issues
- webapp-testing Skill Module
- Civic Feature: Discussions
- Civic Feature: Notifications
- Civic Feature: Petitions
- Civic Feature: Polls
- TypeScript Config (Admin)
- Civic Feature: Discussions
- Insights & Stats Feature
- Civic Feature: Issues
- Citizen Features Representatives Representativespage Module
- TypeScript Config (Citizen)
- Prototype Pages
- Citizen Src Module
- Civic Feature: Issues

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `compilerOptions` - 16 edges
3. `compilerOptions` - 15 edges
4. `compilerOptions` - 15 edges
5. `compilerOptions` - 14 edges
6. `useSidebar()` - 12 edges
7. `scripts` - 8 edges
8. `compilerOptions` - 6 edges
9. `scripts` - 5 edges
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

## Communities (50 total, 13 thin omitted)

### Community 0 - "App Layout & Navigation"
Cohesion: 0.13
Nodes (16): AppLayout(), Topbar(), TopbarProps, createAction, sidebarItems, Sidebar(), SidebarItem, SidebarContext (+8 more)

### Community 1 - "Shared UI Components"
Cohesion: 0.10
Nodes (17): Avatar(), AvatarProps, AvatarSize, sizeClasses, BadgeProps, BadgeSize, BadgeVariant, sizeClasses (+9 more)

### Community 2 - "Authentication & Onboarding"
Cohesion: 0.11
Nodes (18): LoginPage(), INPUTS, OTPPage(), SignupPage(), Button, ButtonProps, ButtonSize, ButtonVariant (+10 more)

### Community 3 - "ESLint Config (Admin)"
Cohesion: 0.08
Nodes (25): dependencies, react, react-dom, devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+17 more)

### Community 4 - "Theme Module: Breakpoints"
Cohesion: 0.09
Nodes (15): BreakpointKey, breakpoints, colors, theme, motion, radius, RadiusKey, semantic (+7 more)

### Community 5 - "ESLint Config (Citizen)"
Cohesion: 0.09
Nodes (22): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/node, @types/react (+14 more)

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
Cohesion: 0.13
Nodes (14): devDependencies, tailwindcss, @tailwindcss/vite, name, private, scripts, build:admin, build:citizen (+6 more)

### Community 12 - "TypeScript Configuration"
Cohesion: 0.13
Nodes (14): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib, module (+6 more)

### Community 13 - "Dependencies (Citizen)"
Cohesion: 0.18
Nodes (11): dependencies, clsx, @hookform/resolvers, lucide-react, react, react-dom, react-hook-form, react-router-dom (+3 more)

### Community 14 - "App Layout & Navigation"
Cohesion: 0.24
Nodes (3): AuthLayout(), Step2Location(), NotFoundPage()

### Community 15 - "App Layout & Navigation"
Cohesion: 0.18
Nodes (6): OnboardingLayoutProps, StepInfo, STEPS, GENDERS, Step3About(), TOPICS

### Community 16 - "TypeScript Configuration"
Cohesion: 0.22
Nodes (8): compilerOptions, composite, declaration, declarationMap, outDir, rootDir, extends, include

### Community 17 - "Civic Feature: Issues"
Cohesion: 0.25
Nodes (5): categoryIcons, FILTER_TABS, Issue, ISSUES, priorityColors

### Community 18 - "Citizen Module"
Cohesion: 0.40
Nodes (4): Citizen App HTML Index, Main Module Script Reference, React Root DOM Element, router

### Community 19 - "Theme Package"
Cohesion: 0.33
Nodes (5): exports, name, private, type, version

### Community 20 - "Shared UI Components"
Cohesion: 0.40
Nodes (3): badgeVariantStyles, Discussion, DISCUSSIONS

### Community 21 - "Civic Feature: Issues"
Cohesion: 0.40
Nodes (5): Create Issue Prototype Page, Impact Scope Selector, Location Fields, Issue Priority/Impact Options, Similar Issues Automatic Check

### Community 22 - "webapp-testing Skill Module"
Cohesion: 0.67
Nodes (3): is_server_ready(), main(), Wait for server to be ready by polling the port.

## Knowledge Gaps
- **224 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+219 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AppLayout()` connect `App Layout & Navigation` to `App Layout & Navigation`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `Wait for server to be ready by polling the port.`, `name`, `private` to the rest of the system?**
  _227 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Layout & Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.12873563218390804 - nodes in this community are weakly interconnected._
- **Should `Shared UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.09852216748768473 - nodes in this community are weakly interconnected._
- **Should `Authentication & Onboarding` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `ESLint Config (Admin)` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Should `Theme Module: Breakpoints` be split into smaller, more focused modules?**
  _Cohesion score 0.08666666666666667 - nodes in this community are weakly interconnected._