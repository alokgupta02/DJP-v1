# DJP Prototype Frontend Task Tracker (`prototype/frontend/fe-todo.md`)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Single Source of Truth (SSOT) tracking UI execution tasks for `web-app = prototype` on port `5174`. |
| **📅 Last Updated** | 2026-07-27 |
| **🏷️ Status / Version** | Active SSOT / v2.1.0 |
| **👥 Owner / Worker** | `Worker/Who: [FE Agent | Antigravity (Gemini)]` |
| **🔗 Upstream / Dependencies** | [`prototype/dashboard.md`](file:///home/ap/git-repo/DJP-v1/prototype/dashboard.md), [`prototype/todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/todo.md), [`prototype/frontend/fe-audit.md`](file:///home/ap/git-repo/DJP-v1/prototype/frontend/fe-audit.md) |

---

## 🚀 Active Sprint & Executing Tasks

| Phase / Sprint | Task Description | Assigned Agent | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1 — Critical Build Fixes** | Fix RichEditor.tsx TDZ error (checkEditorEmpty called before declaration) | **FE Agent** | ✅ Completed |
| **Phase 1 — Critical Build Fixes** | Fix FeedPage.tsx:494 sync setState in useEffect | **FE Agent** | ✅ Completed |
| **Phase 1 — Critical Build Fixes** | Export AuthLayout from src/app/layouts/index.ts | **FE Agent** | ✅ Completed |
| **Phase 2 — TypeScript Hygiene** | Remove unused imports (auto-fix with eslint) | **FE Agent** | ✅ Completed |
| **Phase 2 — TypeScript Hygiene** | Fix empty catch blocks in FeedPage.tsx | **FE Agent** | ✅ Completed |
| **Phase 2 — TypeScript Hygiene** | Fix useEffect dependency warnings | **FE Agent** | ✅ Completed (3 warnings remain - minor) |
| **Phase 2 — TypeScript Hygiene** | Fix Fast Refresh violations (OnboardingContext, TopicFilterBar) | **FE Agent** | ✅ Completed |
| **Phase 2 — TypeScript Hygiene** | Replace `any` types with proper interfaces (API responses) | **FE Agent** | ✅ Completed |
| **Phase 3 — Architecture & Security** | Migrate FeedPage to TanStack Query (useQuery) | **FE Agent** | ⏳ Pending |
| **Phase 3 — Architecture & Security** | Implement code splitting with React.lazy for routes | **FE Agent** | ⏳ Pending |
| **Phase 3 — Architecture & Security** | Replace deprecated execCommand in RichEditor | **FE Agent** | ⏳ Pending |
| **Phase 3 — Architecture & Security** | Move auth to httpOnly cookies / secure storage | **FE Agent** | ⏳ Pending |
| **Phase 4 — Testing & Quality** | Add Vitest + React Testing Library setup | **FE Agent** | ⏳ Pending |
| **Phase 4 — Testing & Quality** | Add Playwright e2e tests for critical flows | **FE Agent** | ⏳ Pending |
| **Phase 4 — Testing & Quality** | Enable stricter TS config (noUnusedLocals, noImplicitAny) | **FE Agent** | ⏳ Pending |

---

## 📋 Task Backlog & Archive Reference
- [x] Set up React SPA structure (`web-app = prototype`) on port `5174` proxying `/djp/api/v1 -> http://localhost:8081`
- [x] Connect `CreateIssuePage` form submission to live `POST /djp/api/v1/issues` endpoint
- [ ] Copy and adapt `Discussions` and `Polls` UI components from root `apps/citizen` (`web-app = prototype`)
- [x] Connect Profile editing form to new separated Profile API backend endpoints.

> [!NOTE]
> **Completed Items Archive:** All completed historical items are archived to [`prototype/archive/archive-todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/archive/archive-todo.md).