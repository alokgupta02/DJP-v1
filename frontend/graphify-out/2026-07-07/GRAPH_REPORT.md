# Graph Report - frontend  (2026-07-07)

## Corpus Check
- 65 files · ~53,188 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 314 nodes · 360 edges · 55 communities (46 shown, 9 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dcd2c139`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App Layout & UI Structure
- ESLint Configuration
- Routing & Navigation
- TypeScript Configuration
- Routing & Navigation
- TypeScript Configuration
- ESLint Configuration
- TypeScript Configuration
- TypeScript Configuration
- Vite & Asset Pipeline
- TypeScript Configuration
- TypeScript Configuration
- Elections Feed Prototype
- Digital Janta Prototype
- Package Dependencies
- admin Prototype
- citizen Prototype
- Design Theme & Styling
- Digital Janta Prototype
- Citizen Interface Prototypes
- TypeScript Configuration
- TypeScript Configuration
- DJ • Complete Profile Prototype
- DJ Prototype
- version Module
- graphify.md Prototype
- graphify.md Prototype
- index Module
- DJ • Discussion Prototype
- React + TypeScript + Vite

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `compilerOptions` - 16 edges
3. `compilerOptions` - 15 edges
4. `compilerOptions` - 15 edges
5. `compilerOptions` - 14 edges
6. `useSidebar()` - 12 edges
7. `Elections Feed | CivicPulse Institutional Intelligence` - 10 edges
8. `Governments Feed - Digital Janta` - 10 edges
9. `Digital Janta | Judiciary Analytics` - 10 edges
10. `Digital Janta | Legislative Data Grid` - 10 edges

## Surprising Connections (you probably didn't know these)
- `AppLayoutContent()` --calls--> `useSidebar()`  [EXTRACTED]
  apps/citizen/src/shared/components/layout/AppLayout.tsx → apps/citizen/src/shared/components/sidebar/SidebarContext.tsx
- `SidebarFooter()` --calls--> `useSidebar()`  [EXTRACTED]
  apps/citizen/src/shared/components/sidebar/SidebarFooter.tsx → apps/citizen/src/shared/components/sidebar/SidebarContext.tsx
- `Digital Janta | Admin Dashboard` --conceptually_related_to--> `Login | Digital Janta`  [INFERRED]
  prototype/admin-dashboard.html → prototype/login.html
- `Digital Janta | Admin Dashboard` --conceptually_related_to--> `Verify OTP`  [INFERRED]
  prototype/admin-dashboard.html → prototype/otp.html
- `Digital Janta | Admin Dashboard` --conceptually_related_to--> `Sign Up`  [INFERRED]
  prototype/admin-dashboard.html → prototype/signup.html

## Import Cycles
- None detected.

## Communities (55 total, 9 thin omitted)

### Community 0 - "App Layout & UI Structure"
Cohesion: 0.18
Nodes (14): AppLayoutContent(), createAction, sidebarItems, Sidebar(), SidebarItem, SidebarContext, SidebarContextType, SidebarProvider() (+6 more)

### Community 1 - "ESLint Configuration"
Cohesion: 0.09
Nodes (21): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/node, @types/react (+13 more)

### Community 2 - "Routing & Navigation"
Cohesion: 0.10
Nodes (18): dependencies, react, react-dom, dependencies, clsx, lucide-react, react, react-dom (+10 more)

### Community 3 - "TypeScript Configuration"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 4 - "Routing & Navigation"
Cohesion: 0.13
Nodes (10): router, DiscussionsPage(), FeedPage(), InsightsPage(), IssuesPage(), NotFoundPage(), PollsPage(), ProfilePage() (+2 more)

### Community 5 - "TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+10 more)

### Community 6 - "ESLint Configuration"
Cohesion: 0.12
Nodes (14): vite, devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/node (+6 more)

### Community 7 - "TypeScript Configuration"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 8 - "TypeScript Configuration"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 9 - "Vite & Asset Pipeline"
Cohesion: 0.13
Nodes (14): devDependencies, tailwindcss, @tailwindcss/vite, name, private, scripts, build:admin, build:citizen (+6 more)

### Community 10 - "TypeScript Configuration"
Cohesion: 0.13
Nodes (14): compilerOptions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib, module (+6 more)

### Community 11 - "TypeScript Configuration"
Cohesion: 0.22
Nodes (8): compilerOptions, composite, declaration, declarationMap, outDir, rootDir, extends, include

### Community 12 - "Elections Feed Prototype"
Cohesion: 1.25
Nodes (9): Elections Feed | CivicPulse Institutional Intelligence, Governments Feed - Digital Janta, Digital Janta | Judiciary Analytics, Digital Janta | Legislative Data Grid, Digital Janta | Municipalities Analytics, Digital Janta | Overview Dashboard, Digital Janta | Political Parties Overview, Digital Janta | Representatives Dashboard (+1 more)

### Community 13 - "Digital Janta Prototype"
Cohesion: 1.00
Nodes (7): Digital Janta - Discussions (Desktop), Digital Janta | Citizen Feed, Civic Insights | Digital Janta, Issues Dashboard | Digital Janta, CivicPortal | Digital Janta Polls Dashboard, Digital Janta | Arjun Malhotra Profile, CivicEngage | Citizen Dashboard

### Community 14 - "Package Dependencies"
Cohesion: 0.33
Nodes (5): exports, name, private, type, version

### Community 15 - "admin Prototype"
Cohesion: 0.40
Nodes (4): admin, Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 16 - "citizen Prototype"
Cohesion: 0.40
Nodes (4): citizen, Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 18 - "Digital Janta Prototype"
Cohesion: 1.00
Nodes (4): Digital Janta | Admin Dashboard, Login | Digital Janta, Verify OTP, Sign Up

### Community 19 - "Citizen Interface Prototypes"
Cohesion: 1.00
Nodes (3): DJ - Garbage Issue Detail, DJ - Pothole Issue Detail, Water Issue

### Community 23 - "DJ • Complete Profile Prototype"
Cohesion: 1.00
Nodes (3): DJ • Complete Profile, DJ • Complete Profile, DJ • Complete Profile

### Community 24 - "DJ Prototype"
Cohesion: 1.00
Nodes (3): DJ - Create Discussion, DJ - Create Issue, DJ - Create Poll

## Knowledge Gaps
- **167 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+162 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `ESLint Configuration` to `Routing & Navigation`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `ESLint Configuration` to `ESLint Configuration`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _167 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ESLint Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Routing & Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Routing & Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._