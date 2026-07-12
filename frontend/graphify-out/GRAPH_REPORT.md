# Graph Report - .  (2026-07-12)

## Corpus Check
- 171 files · ~101,324 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 546 nodes · 665 edges · 65 communities (51 shown, 14 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- planning-with-files Skill Module
- ESLint Config (Citizen)
- Authentication & Onboarding
- App Layout & Navigation
- Shared UI Components
- ESLint Config (Admin)
- Theme Module: Breakpoints
- TypeScript Config (Admin)
- TypeScript Config (Citizen)
- TypeScript Config (Admin)
- Shared UI Components
- TypeScript Config (Citizen)
- Package Module
- TypeScript Configuration
- App Layout & Navigation
- planning-with-files Skill Module
- App Layout & Navigation
- planning-with-files Skill Module
- planning-with-files Skill Module
- Civic Feature: Issues
- TypeScript Configuration
- Civic Feature: Issues
- planning-with-files Skill Module
- planning-with-files Skill Module
- Citizen Module
- Shared UI Components
- Theme Package
- planning-with-files Skill Module
- Civic Feature: Discussions
- Civic Feature: Polls
- User Profile Feature
- planning-with-files Skill Module
- Authentication & Onboarding
- Civic Feature: Discussions
- Insights & Stats Feature
- Civic Feature: Issues
- Civic Feature: Notifications
- Civic Feature: Petitions
- planning-with-files Skill Module
- TypeScript Config (Admin)
- TypeScript Config (Citizen)
- Prototype Pages
- planning-with-files Skill Module
- planning-with-files Skill Module
- Citizen Src Module
- Civic Feature: Issues
- Community 64

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
- `LoginPage()` --implements--> `Login Prototype Page`  [EXTRACTED]
  apps/citizen/src/features/auth/LoginPage.tsx → url.md
- `OTPPage()` --implements--> `OTP Prototype Page`  [EXTRACTED]
  apps/citizen/src/features/auth/OTPPage.tsx → url.md
- `SignupPage()` --implements--> `Signup Prototype Page`  [EXTRACTED]
  apps/citizen/src/features/auth/SignupPage.tsx → url.md
- `Step1BasicInfo()` --implements--> `Onboarding Step 1 Prototype Page`  [EXTRACTED]
  apps/citizen/src/features/auth/onboarding/Step1BasicInfo.tsx → url.md
- `Step2Location()` --implements--> `Onboarding Location Prototype Page`  [EXTRACTED]
  apps/citizen/src/features/auth/onboarding/Step2Location.tsx → url.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **User Onboarding Flow** — apps_citizen_src_features_auth_onboarding_step1basicinfo_step1basicinfo, apps_citizen_src_features_auth_onboarding_step2location_step2location, apps_citizen_src_features_auth_onboarding_step3about_step3about [EXTRACTED 1.00]

## Communities (65 total, 14 thin omitted)

### Community 0 - "planning-with-files Skill Module"
Cohesion: 0.12
Nodes (40): codex_meta_cwd(), codex_planning_update(), extract_messages_after(), find_current_codex_session(), find_last_planning_update(), _format_opencode_part(), get_claude_project_dir(), get_codex_sessions() (+32 more)

### Community 1 - "ESLint Config (Citizen)"
Cohesion: 0.06
Nodes (33): dependencies, clsx, @hookform/resolvers, lucide-react, react, react-dom, react-hook-form, react-router-dom (+25 more)

### Community 2 - "Authentication & Onboarding"
Cohesion: 0.10
Nodes (21): LoginPage(), INPUTS, OTPPage(), SignupPage(), Button, ButtonProps, ButtonSize, ButtonVariant (+13 more)

### Community 3 - "App Layout & Navigation"
Cohesion: 0.13
Nodes (16): AppLayout(), Topbar(), TopbarProps, createAction, sidebarItems, Sidebar(), SidebarItem, SidebarContext (+8 more)

### Community 4 - "Shared UI Components"
Cohesion: 0.10
Nodes (17): Avatar(), AvatarProps, AvatarSize, sizeClasses, BadgeProps, BadgeSize, BadgeVariant, sizeClasses (+9 more)

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

### Community 10 - "Shared UI Components"
Cohesion: 0.12
Nodes (9): CATEGORIES, CONTENT_TYPES, DISCUSSIONS, FeedPage(), ISSUES, POLLS, TOPICS, TRENDING (+1 more)

### Community 11 - "TypeScript Config (Citizen)"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 12 - "Package Module"
Cohesion: 0.13
Nodes (14): devDependencies, tailwindcss, @tailwindcss/vite, name, private, scripts, build:admin, build:citizen (+6 more)

### Community 13 - "TypeScript Configuration"
Cohesion: 0.13
Nodes (14): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib, module (+6 more)

### Community 14 - "App Layout & Navigation"
Cohesion: 0.17
Nodes (8): OnboardingLayoutProps, StepInfo, STEPS, Step2Location(), Step3About(), TOPICS, Onboarding About Prototype Page, Onboarding Location Prototype Page

### Community 15 - "planning-with-files Skill Module"
Cohesion: 0.31
Nodes (8): apply_v3_mode(), create_files_in(), gen_nonce(), init-session.sh script, write_analytics_progress(), write_default_findings(), write_default_progress(), write_default_task_plan()

### Community 16 - "App Layout & Navigation"
Cohesion: 0.25
Nodes (6): AuthLayout(), NotFoundPage(), CreatePollPage(), RepresentativesPage(), REPS, Create Poll Prototype Page

### Community 18 - "planning-with-files Skill Module"
Cohesion: 0.47
Nodes (6): is_within_root(), resolve_from_active_file(), resolve_from_env(), resolve_latest_dir(), resolve-plan-dir.sh script, slug_is_valid()

### Community 19 - "Civic Feature: Issues"
Cohesion: 0.22
Nodes (7): categoryIcons, FILTER_TABS, Issue, ISSUES, IssuesPage(), priorityColors, Issues View Prototype Page

### Community 20 - "TypeScript Configuration"
Cohesion: 0.22
Nodes (8): compilerOptions, composite, declaration, declarationMap, outDir, rootDir, extends, include

### Community 21 - "Civic Feature: Issues"
Cohesion: 0.29
Nodes (6): CreateIssuePage(), Create Issue Prototype Page, Impact Scope Selector, Location Fields, Issue Priority/Impact Options, Similar Issues Automatic Check

### Community 23 - "planning-with-files Skill Module"
Cohesion: 0.53
Nodes (4): do_write(), rewrite(), phase-status.sh script, usage()

### Community 24 - "Citizen Module"
Cohesion: 0.40
Nodes (4): Citizen App HTML Index, Main Module Script Reference, React Root DOM Element, router

### Community 25 - "Shared UI Components"
Cohesion: 0.33
Nodes (5): badgeVariantStyles, Discussion, DISCUSSIONS, DiscussionsPage(), Discussions View Prototype Page

### Community 26 - "Theme Package"
Cohesion: 0.33
Nodes (5): exports, name, private, type, version

### Community 29 - "Civic Feature: Discussions"
Cohesion: 0.40
Nodes (4): DiscussionDetailPage(), DISCUSSIONS_DATA, tagVariantMap, Discussions Detail Prototype Files

### Community 30 - "Civic Feature: Polls"
Cohesion: 0.40
Nodes (4): FILTER_TABS, POLLS, PollsPage(), Polls View Prototype Page

### Community 34 - "Authentication & Onboarding"
Cohesion: 0.50
Nodes (3): GENDERS, Step1BasicInfo(), Onboarding Step 1 Prototype Page

### Community 35 - "Civic Feature: Discussions"
Cohesion: 0.50
Nodes (3): COMMUNITIES, CreateDiscussionPage(), Create Discussion Prototype Page

### Community 36 - "Insights & Stats Feature"
Cohesion: 0.50
Nodes (3): BARS, InsightsPage(), Insights View Prototype Page

### Community 37 - "Civic Feature: Issues"
Cohesion: 0.50
Nodes (3): IssueDetailPage(), ISSUES_DATA, Issues Detail Prototype Files

### Community 38 - "Civic Feature: Notifications"
Cohesion: 0.50
Nodes (3): FILTERS, NOTIFICATIONS, NotificationsPage()

### Community 39 - "Civic Feature: Petitions"
Cohesion: 0.50
Nodes (3): FILTER_TABS, PETITIONS, PetitionsPage()

## Knowledge Gaps
- **245 isolated node(s):** `attest-plan.sh script`, `gate-stop.sh script`, `ledger-summary.sh script`, `set-active-plan.sh script`, `name` (+240 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AppLayout()` connect `App Layout & Navigation` to `App Layout & Navigation`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `CreateIssuePage()` connect `Civic Feature: Issues` to `App Layout & Navigation`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **What connects `attest-plan.sh script`, `gate-stop.sh script`, `ledger-summary.sh script` to the rest of the system?**
  _259 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `planning-with-files Skill Module` be split into smaller, more focused modules?**
  _Cohesion score 0.11829268292682926 - nodes in this community are weakly interconnected._
- **Should `ESLint Config (Citizen)` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `Authentication & Onboarding` be split into smaller, more focused modules?**
  _Cohesion score 0.0967741935483871 - nodes in this community are weakly interconnected._
- **Should `App Layout & Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.12873563218390804 - nodes in this community are weakly interconnected._