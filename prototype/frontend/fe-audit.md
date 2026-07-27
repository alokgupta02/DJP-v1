Project Overview:
- Framework: React 19 + TypeScript + Vite + React Router 7 + TanStack Query + Tailwind CSS v4
- Architecture: Feature-based folder structure with src/features/, src/shared/, src/app/
- API Proxy: Vite proxies /djp/api/v1 → http://localhost:8081
- Auth: Dev token via /auth/dev-login stored in localStorage

🔴 Critical Issues (Build/Type Errors)
File	Issue	Severity
src/shared/components/ui/RichEditor.tsx:44	checkEditorEmpty called before declaration (TDZ violation)	🔴 Error
src/features/feed/FeedPage.tsx:494	setState called synchronously in useEffect (React Hooks violation)	🔴 Error
src/app/layouts/AuthLayout.tsx	Not exported but referenced in router	🔴 Build fails

🟠 High-Priority Issues
Category	Files Affected	Details
any types (116 errors)	FeedPage.tsx (31), PollDetailPage.tsx (20), IssueDetailPage.tsx (18), ProfilePage.tsx, RichEditor.tsx, interactionsApi.ts, AppLayout.tsx	Extensive any usage defeats TypeScript benefits
Unused imports (20+)	FeedPage.tsx (7), Topbar.tsx (5), IssuesPage.tsx, PollsPage.tsx, DiscussionsPage.tsx, PetitionsPage.tsx, PollDetailPage.tsx, IssueDetailPage.tsx	Dead code, bundle bloat
Empty catch blocks	FeedPage.tsx:413, 438, 468	Silent failures - errors swallowed
React Hook violations	IssueDetailPage.tsx:147, PollDetailPage.tsx:71	Missing useEffect dependencies
Fast Refresh violation	TopicFilterBar.tsx:5	Non-component exports break HMR

🟡 Medium-Priority Issues (Architecture & UX)
Issue	Impact
Hardcoded dev user ID	AppLayout.tsx:29, ProfilePage.tsx:22 - "1f4c2da8-eedd-4523-b541-7c818c237fff" baked in
localStorage auth	Tokens/user stored in localStorage (XSS vulnerable)
No TanStack Query usage	Direct fetch() in FeedPage.tsx instead of useQuery - no caching, deduping, retries
Bundle size: 539KB JS	Exceeds 500KB warning - no code splitting
RichEditor uses deprecated document.execCommand	Deprecated API, unreliable in modern browsers
No test infrastructure	Only a Playwright smoke test exists

✅ Positive Patterns Observed
- Design system: Well-structured CSS custom properties in index.css with Tailwind v4 @theme
- Component organization: Clean separation: shared/ui, shared/components, features/*
- Router v7: Proper createBrowserRouter with nested layouts (AuthLayout, AppLayout)
- Forms: React Hook Form + Zod validation setup ready
- State: Zustand for client state, localStorage for auth (simple but works for prototype)

📋 Improvement Plan

Phase 1: Fix Critical Build Errors (Do First)
1. Fix RichEditor.tsx - Move checkEditorEmpty function above useEffect
2. Fix FeedPage.tsx:494 - Move setIsBannerHidden to useLayoutEffect or init state from sessionStorage
3. Export AuthLayout from src/app/layouts/index.ts or fix import in router

Phase 2: TypeScript Hygiene
4. Replace any with proper types - Define interfaces for API responses in each feature
5. Remove unused imports - Run eslint --fix for auto-fixable ones
6. Fix empty catch blocks - Add proper error handling/logging
7. Fix useEffect dependencies - Add missing deps or use useCallback

Phase 3: Architecture & Security
 8. Migrate to TanStack Query - Replace manual fetch in FeedPage, ProfilePage, detail pages
 9. Implement code splitting - React.lazy for route components to reduce bundle
10. Replace execCommand - Use modern contenteditable + InputEvent or switch to TipTap/Slate
11. Move auth to httpOnly cookies - Or at minimum, use sessionStorage + secure token refresh

Phase 4: Testing & Quality
12. Add Vitest + React Testing Library - Unit tests for components, hooks
13. Add Playwright e2e tests - Critical flows (login → feed → create issue)
14. Enable stricter TS config - noUnusedLocals: true, noImplicitAny: true

Recommended First Commands
# 1. Fix critical build errors first
cd /home/ap/git-repo/DJP-v1/prototype/frontend

# 2. Run typecheck to see current errors
npm run build

# 3. Auto-fix lint issues where possible
npm run lint -- --fix

# 4. Check test setup (none exists yet - need to add Vitest)
Priority Order for Implementation
Priority	Task	Effort
P0	Fix RichEditor.tsx TDZ error	5 min
P0	Fix FeedPage.tsx sync setState in effect	5 min
P0	Export AuthLayout	2 min
P1	Remove unused imports (auto-fix)	5 min
P1	Define API response types (replace any)	2-4 hrs
P2	Migrate FeedPage to useQuery	1-2 hrs
P2	Code-split routes with React.lazy	30 min
P3	Replace execCommand in RichEditor	2-4 hrs
P3	Add Vitest + RTL test setup	1 hr