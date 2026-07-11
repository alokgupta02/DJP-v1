# Graph Report - .  (2026-07-11)

## Corpus Check
- 160 files · ~156,545 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 615 nodes · 822 edges · 68 communities (59 shown, 9 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- ESLint Config (Admin)
- skill-creator Skill Module
- Authentication & Onboarding
- Shared UI Components
- analyze-project Skill Module
- Shared UI Components
- Dependencies (Admin)
- Shared UI Components
- skill-creator Skill Module
- Theme Module: Breakpoints
- TypeScript Config (Admin)
- TypeScript Config (Citizen)
- TypeScript Config (Admin)
- TypeScript Config (Citizen)
- App Layout & Navigation
- App Layout & Navigation
- Package Module
- TypeScript Configuration
- skill-creator Skill Module
- skill-creator Skill Module
- Boilerplate Code Guardrails
- brainstorming Skill Module
- TypeScript Configuration
- Stats & Insights Prototype
- Authentication & Onboarding
- brainstorming Skill Module
- Civic Feature: Issues
- Citizen Module
- Theme Package
- Ponytail Senior Dev Mode
- ESLint Config (Admin)
- Civic Feature: Discussions
- Shared UI Components
- App Layout & Navigation
- ESLint Config (Citizen)
- Civic Feature: Issues
- Civic Feature: Notifications
- Civic Feature: Petitions
- Civic Feature: Polls
- User Profile Feature
- brainstorming Skill Module
- TypeScript Config (Admin)
- TypeScript Config (Citizen)
- Civic Feature: Issues
- Prototype Pages
- Graphify Customization Rules
- Graphify Customization Rules
- Theme Module: Colors
- Civic Feature: Discussions

## God Nodes (most connected - your core abstractions)
1. `analyze_repo()` - 20 edges
2. `compilerOptions` - 18 edges
3. `compilerOptions` - 16 edges
4. `compilerOptions` - 15 edges
5. `compilerOptions` - 15 edges
6. `compilerOptions` - 14 edges
7. `useSidebar()` - 12 edges
8. `run_loop()` - 10 edges
9. `scripts` - 8 edges
10. `Elections Feed | CivicPulse Institutional Intelligence` - 8 edges

## Surprising Connections (you probably didn't know these)
- `DiscussionsPage()` --implements--> `Digital Janta - Discussions (Desktop)`  [EXTRACTED]
  apps/citizen/src/features/discussions/DiscussionsPage.tsx → prototype/user/view/discussion.html
- `InsightsPage()` --implements--> `Civic Insights | Digital Janta`  [EXTRACTED]
  apps/citizen/src/features/insights/InsightsPage.tsx → prototype/user/view/insights.html
- `PollsPage()` --implements--> `CivicPortal | Digital Janta Polls Dashboard`  [EXTRACTED]
  apps/citizen/src/features/polls/PollsPage.tsx → prototype/user/view/polls.html
- `ProfilePage()` --implements--> `Digital Janta | Arjun Malhotra Profile`  [EXTRACTED]
  apps/citizen/src/features/profile/ProfilePage.tsx → prototype/user/view/profile.html
- `LoginPage()` --implements--> `Login | Digital Janta`  [EXTRACTED]
  apps/citizen/src/features/auth/LoginPage.tsx → prototype/login.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Ponytail Core Tenets** — _agents_rules_ponytail_ponytail_rule, _agents_rules_ponytail_decision_ladder, _agents_rules_ponytail_bug_fixing_philosophy, _agents_rules_ponytail_testing_philosophy [EXTRACTED 1.00]
- **User Onboarding Flow** — apps_citizen_src_features_auth_onboarding_step1basicinfo_step1basicinfo, apps_citizen_src_features_auth_onboarding_step2location_step2location, apps_citizen_src_features_auth_onboarding_step3about_step3about [EXTRACTED 1.00]
- **Core Content Features** — apps_citizen_src_features_feed_feedpage_feedpage, apps_citizen_src_features_issues_issuespage_issuespage, apps_citizen_src_features_discussions_discussionspage_discussionspage [EXTRACTED 1.00]

## Communities (68 total, 9 thin omitted)

### Community 0 - "ESLint Config (Admin)"
Cohesion: 0.05
Nodes (35): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/node, @types/react (+27 more)

### Community 1 - "skill-creator Skill Module"
Cohesion: 0.11
Nodes (27): generate_html(), main(), Generate HTML report from loop output data. If auto_refresh is True, adds a meta, _call_claude(), improve_description(), main(), Path, Run `claude -p` with the prompt on stdin and return the text response.      Prom (+19 more)

### Community 2 - "Authentication & Onboarding"
Cohesion: 0.10
Nodes (22): LoginPage(), INPUTS, OTPPage(), SignupPage(), Button, ButtonProps, ButtonSize, ButtonVariant (+14 more)

### Community 3 - "Shared UI Components"
Cohesion: 0.10
Nodes (21): CATEGORIES, CONTENT_TYPES, DISCUSSIONS, FeedPage(), ISSUES, POLLS, TOPICS, TRENDING (+13 more)

### Community 4 - "analyze-project Skill Module"
Cohesion: 0.19
Nodes (29): analyze_repo(), build_change_map(), build_eval_contract(), build_research_map(), collect_candidates(), collect_config_binding_hints(), collect_data_interface_files(), collect_metric_files() (+21 more)

### Community 5 - "Shared UI Components"
Cohesion: 0.10
Nodes (16): AvatarProps, AvatarSize, sizeClasses, BadgeProps, BadgeSize, BadgeVariant, sizeClasses, variantClasses (+8 more)

### Community 6 - "Dependencies (Admin)"
Cohesion: 0.08
Nodes (23): dependencies, react, react-dom, dependencies, clsx, @hookform/resolvers, lucide-react, react (+15 more)

### Community 7 - "Shared UI Components"
Cohesion: 0.15
Nodes (13): Topbar(), TopbarProps, Sidebar(), SidebarContext, SidebarContextType, SidebarProvider(), useSidebar(), SidebarFooter() (+5 more)

### Community 8 - "skill-creator Skill Module"
Cohesion: 0.15
Nodes (19): build_run(), embed_file(), find_runs(), _find_runs_recursive(), generate_html(), get_mime_type(), _kill_port(), load_previous_iteration() (+11 more)

### Community 9 - "Theme Module: Breakpoints"
Cohesion: 0.09
Nodes (14): BreakpointKey, breakpoints, theme, motion, radius, RadiusKey, semantic, ShadowKey (+6 more)

### Community 10 - "TypeScript Config (Admin)"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 11 - "TypeScript Config (Citizen)"
Cohesion: 0.11
Nodes (18): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+10 more)

### Community 12 - "TypeScript Config (Admin)"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 13 - "TypeScript Config (Citizen)"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 14 - "App Layout & Navigation"
Cohesion: 0.15
Nodes (11): OnboardingLayoutProps, StepInfo, STEPS, GENDERS, Step1BasicInfo(), Step2Location(), Step3About(), TOPICS (+3 more)

### Community 15 - "App Layout & Navigation"
Cohesion: 0.19
Nodes (9): AuthLayout(), CreateDiscussionPage(), BARS, InsightsPage(), CreatePollPage(), RepresentativesPage(), REPS, DJ - Create Discussion (+1 more)

### Community 16 - "Package Module"
Cohesion: 0.13
Nodes (14): devDependencies, tailwindcss, @tailwindcss/vite, name, private, scripts, build:admin, build:citizen (+6 more)

### Community 17 - "TypeScript Configuration"
Cohesion: 0.13
Nodes (14): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib, module (+6 more)

### Community 18 - "skill-creator Skill Module"
Cohesion: 0.23
Nodes (12): aggregate_results(), calculate_stats(), generate_benchmark(), generate_markdown(), load_run_results(), main(), Path, Aggregate run results into summary statistics.      Returns run_summary with sta (+4 more)

### Community 19 - "skill-creator Skill Module"
Cohesion: 0.29
Nodes (8): main(), package_skill(), Path, Check if a path should be excluded from packaging., Package a skill folder into a .skill file.      Args:         skill_path: Path t, should_exclude(), Basic validation of a skill, validate_skill()

### Community 20 - "Boilerplate Code Guardrails"
Cohesion: 0.22
Nodes (9): Boilerplate Code Guardrail Rule, Component Creation Rules, Custom Hook Rules, Dependency Guidelines, Lean Codebase Rule, Refactoring Rules, State Management Principles, Styling Guidelines (+1 more)

### Community 21 - "brainstorming Skill Module"
Cohesion: 0.42
Nodes (7): connect(), nextReconnectDelay(), reloadAfterRecovery(), sessionKey(), setStatus(), showTombstone(), websocketUrl()

### Community 22 - "TypeScript Configuration"
Cohesion: 0.22
Nodes (8): compilerOptions, composite, declaration, declarationMap, outDir, rootDir, extends, include

### Community 23 - "Stats & Insights Prototype"
Cohesion: 1.00
Nodes (9): Elections Feed | CivicPulse Institutional Intelligence, Governments Feed - Digital Janta, Digital Janta | Judiciary Analytics, Digital Janta | Legislative Data Grid, Digital Janta | Municipalities Analytics, Digital Janta | Overview Dashboard, Digital Janta | Political Parties Overview, Digital Janta | Representatives Dashboard (+1 more)

### Community 24 - "Authentication & Onboarding"
Cohesion: 0.25
Nodes (8): Migration Dashboard and Project Tasks, Phase 0 — Foundation Tasks, Phase 1 — Core Pages Tasks, Phase 2 — Supporting Pages Tasks, Phase 3 — Detail & Creation Pages Tasks, Phase 4 — Auth & Onboarding Tasks, Phase 5 — Missing Routes Tasks, URL Map — DJP Citizen App

### Community 25 - "brainstorming Skill Module"
Cohesion: 0.43
Nodes (4): command_has_server_id(), is_brainstorm_server(), mark_stopped(), stop-server.sh script

### Community 26 - "Civic Feature: Issues"
Cohesion: 0.29
Nodes (6): CreateIssuePage(), Create Issue Prototype Page, Impact Scope Selector, Location Fields, Issue Priority/Impact Options, Similar Issues Automatic Check

### Community 27 - "Citizen Module"
Cohesion: 0.40
Nodes (4): Citizen App HTML Index, Main Module Script Reference, React Root DOM Element, router

### Community 28 - "Theme Package"
Cohesion: 0.33
Nodes (5): exports, name, private, type, version

### Community 29 - "Ponytail Senior Dev Mode"
Cohesion: 0.40
Nodes (5): Ponytail Bug Fixing Philosophy, Ponytail Decision Ladder, Ponytail Comments for Deliberate Simplification, Ponytail Rule, Ponytail Testing Philosophy

### Community 30 - "ESLint Config (Admin)"
Cohesion: 0.40
Nodes (4): admin, Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 31 - "Civic Feature: Discussions"
Cohesion: 0.40
Nodes (4): DiscussionDetailPage(), DISCUSSIONS_DATA, tagVariantMap, Discussions Detail Prototype Files

### Community 32 - "Shared UI Components"
Cohesion: 0.40
Nodes (4): badgeVariantStyles, Discussion, DISCUSSIONS, DiscussionsPage()

### Community 33 - "App Layout & Navigation"
Cohesion: 0.50
Nodes (3): createAction, sidebarItems, SidebarItem

### Community 34 - "ESLint Config (Citizen)"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 35 - "Civic Feature: Issues"
Cohesion: 0.50
Nodes (3): IssueDetailPage(), ISSUES_DATA, Issues Detail Prototype Files

### Community 36 - "Civic Feature: Notifications"
Cohesion: 0.50
Nodes (3): FILTERS, NOTIFICATIONS, NotificationsPage()

### Community 37 - "Civic Feature: Petitions"
Cohesion: 0.50
Nodes (3): FILTER_TABS, PETITIONS, PetitionsPage()

### Community 38 - "Civic Feature: Polls"
Cohesion: 0.50
Nodes (3): FILTER_TABS, POLLS, PollsPage()

### Community 44 - "Civic Feature: Issues"
Cohesion: 1.00
Nodes (3): DJ - Garbage Issue Detail, DJ - Pothole Issue Detail, Water Issue

## Knowledge Gaps
- **240 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+235 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `ESLint Config (Admin)` to `Dependencies (Admin)`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Why does `CreateIssuePage()` connect `Civic Feature: Issues` to `App Layout & Navigation`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _276 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ESLint Config (Admin)` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Should `skill-creator Skill Module` be split into smaller, more focused modules?**
  _Cohesion score 0.11088709677419355 - nodes in this community are weakly interconnected._
- **Should `Authentication & Onboarding` be split into smaller, more focused modules?**
  _Cohesion score 0.1028225806451613 - nodes in this community are weakly interconnected._
- **Should `Shared UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.0967741935483871 - nodes in this community are weakly interconnected._