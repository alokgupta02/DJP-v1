# Graph Report - .  (2026-07-13)

## Corpus Check
- 186 files · ~106,202 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 537 nodes · 638 edges · 68 communities (48 shown, 20 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- planning-with-files Skill Module
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
- planning-with-files Skill Module
- App Layout & Navigation
- App Layout & Navigation
- planning-with-files Skill Module
- planning-with-files Skill Module
- TypeScript Configuration
- Civic Feature: Issues
- planning-with-files Skill Module
- planning-with-files Skill Module
- Citizen Module
- Theme Package
- planning-with-files Skill Module
- Shared UI Components
- Civic Feature: Issues
- planning-with-files Skill Module
- webapp-testing Skill Module
- Civic Feature: Discussions
- Civic Feature: Notifications
- Civic Feature: Petitions
- Civic Feature: Polls
- planning-with-files Skill Module
- TypeScript Config (Admin)
- Civic Feature: Discussions
- Insights & Stats Feature
- Civic Feature: Issues
- Citizen Features Representatives Representativespage Module
- TypeScript Config (Citizen)
- Prototype Pages
- planning-with-files Skill Module
- planning-with-files Skill Module
- Citizen Src Module
- Civic Feature: Issues

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `compilerOptions` - 16 edges
3. `compilerOptions` - 15 edges
4. `compilerOptions` - 15 edges
5. `compilerOptions` - 14 edges
6. `useSidebar()` - 12 edges
7. `main()` - 8 edges
8. `scripts` - 8 edges
9. `is_codex_project_session()` - 7 edges
10. `get_codex_sessions()` - 7 edges

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

## Communities (68 total, 20 thin omitted)

### Community 0 - "planning-with-files Skill Module"
Cohesion: 0.12
Nodes (40): codex_meta_cwd(), codex_planning_update(), extract_messages_after(), find_current_codex_session(), find_last_planning_update(), _format_opencode_part(), get_claude_project_dir(), get_codex_sessions() (+32 more)

### Community 1 - "ESLint Config (Citizen)"
Cohesion: 0.06
Nodes (33): dependencies, clsx, @hookform/resolvers, lucide-react, react, react-dom, react-hook-form, react-router-dom (+25 more)

### Community 2 - "Shared UI Components"
Cohesion: 0.12
Nodes (17): AppLayout(), Topbar(), TopbarProps, createAction, sidebarItems, Sidebar(), SidebarItem, SidebarContext (+9 more)

### Community 3 - "Authentication & Onboarding"
Cohesion: 0.11
Nodes (18): LoginPage(), INPUTS, OTPPage(), SignupPage(), Button, ButtonProps, ButtonSize, ButtonVariant (+10 more)

### Community 4 - "Shared UI Components"
Cohesion: 0.10
Nodes (16): AvatarProps, AvatarSize, sizeClasses, BadgeProps, BadgeSize, BadgeVariant, sizeClasses, variantClasses (+8 more)

### Community 5 - "ESLint Config (Admin)"
Cohesion: 0.08
Nodes (25): dependencies, react, react-dom, devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+17 more)

### Community 6 - "Theme Module: Breakpoints"
Cohesion: 0.09
Nodes (15): BreakpointKey, breakpoints, colors, theme, motion, radius, RadiusKey, semantic (+7 more)

### Community 7 - "TypeScript Config (Admin)"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 8 - "TypeScript Config (Citizen)"
Cohesion: 0.11
Nodes (18): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+10 more)

### Community 9 - "TypeScript Config (Admin)"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 10 - "TypeScript Config (Citizen)"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 11 - "Shared UI Components"
Cohesion: 0.12
Nodes (7): CATEGORIES, CONTENT_TYPES, DISCUSSIONS, ISSUES, POLLS, TOPICS, TRENDING

### Community 12 - "Package Module"
Cohesion: 0.13
Nodes (14): devDependencies, tailwindcss, @tailwindcss/vite, name, private, scripts, build:admin, build:citizen (+6 more)

### Community 13 - "TypeScript Configuration"
Cohesion: 0.13
Nodes (14): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib, module (+6 more)

### Community 14 - "planning-with-files Skill Module"
Cohesion: 0.31
Nodes (8): apply_v3_mode(), create_files_in(), gen_nonce(), init-session.sh script, write_analytics_progress(), write_default_findings(), write_default_progress(), write_default_task_plan()

### Community 15 - "App Layout & Navigation"
Cohesion: 0.24
Nodes (3): AuthLayout(), Step2Location(), NotFoundPage()

### Community 16 - "App Layout & Navigation"
Cohesion: 0.18
Nodes (6): OnboardingLayoutProps, StepInfo, STEPS, GENDERS, Step3About(), TOPICS

### Community 18 - "planning-with-files Skill Module"
Cohesion: 0.47
Nodes (6): is_within_root(), resolve_from_active_file(), resolve_from_env(), resolve_latest_dir(), resolve-plan-dir.sh script, slug_is_valid()

### Community 19 - "TypeScript Configuration"
Cohesion: 0.22
Nodes (8): compilerOptions, composite, declaration, declarationMap, outDir, rootDir, extends, include

### Community 20 - "Civic Feature: Issues"
Cohesion: 0.25
Nodes (5): categoryIcons, FILTER_TABS, Issue, ISSUES, priorityColors

### Community 22 - "planning-with-files Skill Module"
Cohesion: 0.53
Nodes (4): do_write(), rewrite(), phase-status.sh script, usage()

### Community 23 - "Citizen Module"
Cohesion: 0.40
Nodes (4): Citizen App HTML Index, Main Module Script Reference, React Root DOM Element, router

### Community 24 - "Theme Package"
Cohesion: 0.33
Nodes (5): exports, name, private, type, version

### Community 27 - "Shared UI Components"
Cohesion: 0.40
Nodes (3): badgeVariantStyles, Discussion, DISCUSSIONS

### Community 28 - "Civic Feature: Issues"
Cohesion: 0.40
Nodes (5): Create Issue Prototype Page, Impact Scope Selector, Location Fields, Issue Priority/Impact Options, Similar Issues Automatic Check

### Community 31 - "webapp-testing Skill Module"
Cohesion: 0.67
Nodes (3): is_server_ready(), main(), Wait for server to be ready by polling the port.

## Knowledge Gaps
- **228 isolated node(s):** `attest-plan.sh script`, `gate-stop.sh script`, `ledger-summary.sh script`, `set-active-plan.sh script`, `name` (+223 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AppLayout()` connect `Shared UI Components` to `App Layout & Navigation`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `attest-plan.sh script`, `gate-stop.sh script`, `ledger-summary.sh script` to the rest of the system?**
  _243 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `planning-with-files Skill Module` be split into smaller, more focused modules?**
  _Cohesion score 0.11829268292682926 - nodes in this community are weakly interconnected._
- **Should `ESLint Config (Citizen)` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `Shared UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.12258064516129032 - nodes in this community are weakly interconnected._
- **Should `Authentication & Onboarding` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Shared UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.10317460317460317 - nodes in this community are weakly interconnected._