# DJP Prototype Frontend Task Tracker (`prototype/frontend/fe-todo.md`)

---

| Metadata | Value |
| :--- | :--- |
| **Purpose** | Single Source of Truth (SSOT) tracking UI execution tasks for `web-app = prototype` on port `5174`. |
| **Last Updated** | 2026-07-27 |
| **Status / Version** | Active SSOT / v5.0.0 |
| **Owner / Worker** | `FE Agent` |
| **Upstream** | [`prototype/frontend/.djp_state.md`](.djp_state.md), [`prototype/frontend/fe-audit.md`](fe-audit.md) |

---

## Completed Phases (Archived)

| Phase | Status | Description |
| :--- | :--- | :--- |
| **Phase 1 — Critical Build Fixes** | ✅ Archived | TDZ, sync setState, AuthLayout export, unused imports, Fast Refresh |
| **Phase 2 — TypeScript Hygiene** | ✅ Archived | Replaced all `any` (116), fixed empty catch blocks, Fast Refresh violations |
| **Phase 3 — Architecture & Security** | ✅ Archived | TanStack Query, code splitting (539KB → multiple chunks) |
| **Phase 4 — Testing & Quality** | ✅ Archived | Vitest + RTL + Playwright, 6 tests passing, lint 0 errors |

---

## Phase 5 — Fix Broken Flows (Active Sprint)

| # | Task | Priority | Effort | Status |
| :--- | :--- | :--- | :--- | :--- |
| 5.1 | Wire NotificationsPage to `notificationsApi.ts` (fetch, markAsRead, unread badge) | P0 | 1 hr | ✅ Done |
| 5.2 | Fix IssuesPage voting: persist via `toggleVote` API | P0 | 30 min | ✅ Done |
| 5.3 | Fix DiscussionsPage voting: persist via `toggleVote` API | P0 | 30 min | ✅ Done |
| 5.4 | Implement poll option selection (backend cast-vote + frontend wire) | P0 | 2-3 hrs | ✅ Done |
| 5.5 | Implement functional Share buttons (navigator.share / clipboard copy) | P0 | 1 hr | ✅ Done |
| 5.6 | Wire SignupPage to real registration endpoint | P0 | 1-2 hrs | ✅ Done |
| 5.7 | Build Petitions backend API + `petitionsApi.ts` + wire to pages | P1 | 3-4 hrs | ✅ Done |
| 5.8 | Build Representatives backend API + wire to pages | P1 | 2-3 hrs | ✅ Done |
| 5.9 | Build Insights backend API + wire to pages | P1 | 2-3 hrs | ✅ Done |
| 5.10 | Add `fetchPetitions()` to feedApi and render in FeedPage | P1 | 1 hr | ✅ Done |
| 5.11 | Add loading skeletons + error states to all TanStack Query consumers | P2 | 1 hr | ✅ Done |
| 5.12 | Add image upload to create forms | P2 | 2-3 hrs | ✅ Done |
| 5.13 | Wire onboarding completion → navigate to `/feed` | P2 | 30 min | ✅ Done |
| 5.14 | Replace static sidebar stats with real API data | P2 | 1 hr | ✅ Done |

---

## Future Backlog (Low Priority)

| Task | Priority | Effort |
| :--- | :--- | :--- |
| Replace deprecated `document.execCommand` in RichEditor | P3 | 2-4 hrs |
| Move auth from localStorage to httpOnly cookies / secure storage | P3 | 1-2 hrs |
| Enable stricter TS config (`noUnusedLocals: true`, `noImplicitAny: true`) | P3 | 30 min |
| Remove hardcoded dev user IDs (`ProfilePage.tsx:22`, `AppLayout.tsx:32`) | P3 | 30 min |
| Resolve remaining useEffect dependency warnings (3 files) | P3 | 1 hr |
