# DJP Prototype Frontend Task Tracker (`prototype/frontend/fe-todo.md`)

> **Domain Role:** ⭐ **SINGLE SOURCE OF TRUTH (SSOT)** for Frontend UI & React Execution in Prototype
> **Sprint Progress:** 100% `[████████████████████████████████]` Phase 1 Setup Completed
> **Completed Tasks Archive:** All completed tasks are moved to [`prototype/archive/archive-todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/archive/archive-todo.md).

---

## 🚀 Active Sprint & Executing Tasks

| Phase / Sprint | Task Description | Assigned Agent | Status |
| :--- | :--- | :--- | :--- |
| **Phase 2 — Progressive Feature Integration** | Connect UI pages and views to live Spring Boot API routes | **FE Agent** | 🟢 Aligned & Ready |

---

## 📋 Completed Phase 1 Tasks
- [x] Set up React SPA structure from root `apps/citizen/` (Vite 6, React 19, Tailwind CSS v4)
- [x] Configure `vite.config.ts` proxying `/djp/api/v1 -> http://localhost:8081`
- [x] Verify production bundle via `npm run build` (`dist/` clean with 0 errors)
- [x] Initialize prototype FE domain identity, rules, and state (`.djp_identity.md`, `.djp_rules.md`, `.djp_state.md`)

## 📋 Backlog & Planned Phases (Phase 2)
- [ ] Connect `CreateIssuePage` and `IssuesPage` UI to live `GET /djp/api/v1/issues` & `POST` endpoints
- [ ] Connect authentication status bar to dev-login JWT token storage
- [ ] Coordinate with QA (`prototype/tests/`) to verify UI behaviors progressively

---

## 📝 Technical Notes & Architectural Reference
- **Rule against over-engineering:** Do NOT create custom React hooks, layouts, or CSS files from scratch.
- **Reference codebase:** Always copy or import components, layouts, pages, and theme assets from root `/frontend`.
