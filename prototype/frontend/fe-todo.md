# DJP Prototype Frontend Task Tracker (`prototype/frontend/fe-todo.md`)

---

| Metadata | Value |
| :--- | :--- |
| **Purpose** | Single Source of Truth (SSOT) tracking UI execution tasks for `web-app = prototype` on port `5174`. |
| **Last Updated** | 2026-07-27 |
| **Status / Version** | Active SSOT / v4.0.0 |
| **Owner / Worker** | `Worker/Who: [FE Agent]` |
| **Upstream / Dependencies** | [`prototype/dashboard.md`](file:///home/ap/git-repo/DJP-v1/prototype/dashboard.md), [`prototype/todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/todo.md), [`prototype/frontend/fe-audit.md`](file:///home/ap/git-repo/DJP-v1/prototype/frontend/fe-audit.md) |

---

## Completed Phases

| Phase | Status | Commit |
| :--- | :--- | :--- |
| **Phase 1 — Critical Build Fixes** | ✅ Completed | `dd79c85` |
| **Phase 2 — TypeScript Hygiene** | ✅ Completed | `dd79c85` |
| **Phase 3 — Architecture & Security** | ✅ Completed | `cd3b7e1` |
| **Phase 4 — Testing & Quality** | ✅ Completed | `b42220e` |

## Remaining Tasks

| Task | Priority | Effort |
| :--- | :--- | :--- |
| Replace deprecated `document.execCommand` in RichEditor | P2 | 2-4 hrs |
| Move auth from localStorage to httpOnly cookies / secure storage | P2 | 1-2 hrs |
| Enable stricter TS config (`noUnusedLocals: true`, `noImplicitAny: true`) | P3 | 30 min |
| Resolve remaining useEffect dependency warnings (3 files) | P3 | 1 hr |
| Copy and adapt Discussions and Polls UI components from root `apps/citizen` | P3 | 2-4 hrs |

---

## Backlog

- [x] Set up React SPA structure (`web-app = prototype`) on port `5174` proxying `/djp/api/v1 -> http://localhost:8081`
- [x] Connect `CreateIssuePage` form submission to live `POST /djp/api/v1/issues` endpoint
- [x] Connect Profile editing form to new separated Profile API backend endpoints