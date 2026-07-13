# DJP Master Executive Dashboard (`/dashboard.md`)

> **Role:** ⭐ **MASTER CONTROL CENTER & EXECUTIVE DASHBOARD**
> Sourced dynamically from respective domain execution todos ([`frontend/fe-todo.md`](file:///home/ap/git-repo/DJP-v1/frontend/fe-todo.md), [`backend/be-todo.md`](file:///home/ap/git-repo/DJP-v1/backend/be-todo.md), [`tests/test-todo.md`](file:///home/ap/git-repo/DJP-v1/tests/test-todo.md)).

---

## 🚀 Currently Executing Tasks (Active Control Panel)

| Domain | Assigned Agent | Feature / Phase | Active Executing Task | Source Todo | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Backend** | **BE Agent** | Phase 1 (MVP 1) | Initialize Spring Boot Maven project & OAuth2 | [`backend/be-todo.md`](file:///home/ap/git-repo/DJP-v1/backend/be-todo.md) | ⬜ Ready to Start |
| **QA / Tests** | **QA Agent** | TDD Core Suite | Write failing Playwright E2E tests for auth flow | [`tests/test-todo.md`](file:///home/ap/git-repo/DJP-v1/tests/test-todo.md) | 🟡 Active Sprint |
| **Frontend** | **FE Agent** | UI Fixes Sprint | Global sidebar & header search alignment | [`frontend/fe-todo.md`](file:///home/ap/git-repo/DJP-v1/frontend/fe-todo.md) | ✅ Completed (5/5) |

---

## ⚙️ Backend Microservices Roadmap (`backend/be-todo.md`)

**Progress: 0%** `[................................]` 0/22 tasks

| Phase | Done | Status | Target Layer / Feature |
| :--- | :--- | :--- | :--- |
| **1 — Project Setup, H2 & OAuth2** | 0/6 | ⬜ Not Started | Spring Security, JWT, Google/LinkedIn Auth |
| **2 — Issues CRUD** | 0/5 | ⬜ Not Started | `Issue` JPA Entity, Service, REST API (`/api/v1/issues`) |
| **3 — Feed, Discussions & Replies** | 0/4 | ⬜ Not Started | Discussions API, Reply Endpoints, Frontend Sync |
| **4 — Polls & Votes** | 0/4 | ⬜ Not Started | Unique user vote constraints, Real-time voting API |
| **5 — Petitions, Notifications & Representatives** | 0/3 | ⬜ Not Started | Citizen petitions & representative tracking schemas |

---

## 🎨 Frontend UI Fixes & Polish (`frontend/fe-todo.md`)

**Progress: 100%** `[████████████████████████████████]` 5/5 tasks

| Phase | Done | Status | Target Layer / Feature |
| :--- | :--- | :--- | :--- |
| **Sprint 1 — UI Layout & Visual Fixes** | 5/5 | ✅ Completed | Global sidebar collapse, header search, grid gap, card padding & status badges |

---

## 🧪 QA & Test Suite (`tests/test-todo.md`)

**Progress: 50%** `[████████████████................]` 2/4 tasks

| Phase | Done | Status | Target Layer / Feature |
| :--- | :--- | :--- | :--- |
| **Phase 1 — QA Agent Role & Skill Boundaries** | 2/2 | ✅ Completed | TDD Role spec (`qa-agent.md`) & domain skills folder |
| **Phase 2 — Core E2E & API Test Automation** | 0/2 | 🟡 In Progress | Playwright auth flows & microservice route tests |

---

## 🏛️ Completed Infrastructure & Agentic Workflow Setup (Master Archive)

<details>
<summary><strong>Click to expand completed Agent Architecture & Guardrails (20/20 tasks completed)</strong></summary>

- [x] Create core DJPv1 files (`.djp_identity.md`, `.djp_state.md`, `.djp_rules.md`) in root, `frontend/`, `backend/`, and `tests/`
- [x] Define Agent Operating Specifications under `.agents/roles/` (PM, Tech Arch, TL, QA, FE, BE, GitHub)
- [x] Separate domain skills across `frontend/.agents/skills/`, `backend/.agents/skills/`, `tests/.agents/skills/`, and root `.agents/skills/`
- [x] Create `docs/execution/` Single Source of Truth (SSOT) feature checklist templates
- [x] Implement circular Human Approval Gate & TDD automated test feedback loops
</details>
