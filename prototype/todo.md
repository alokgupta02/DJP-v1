# DJP Prototype User Request Intake Portal (`web-app = prototype`)

---

| Metadata | Value |
| :--- | :--- |
| **Purpose** | Primary User Intake Portal and task checklist for our Prototype Web App (`web-app = prototype`). |
| **Last Updated** | 2026-07-27 |
| **Status / Version** | Active SSOT / v2.0.0 |
| **Owner / Worker** | `Worker/Who: [PM Agent / User]` |
| **Upstream / Dependencies** | [`prototype/dashboard.md`](file:///home/ap/git-repo/DJP-v1/prototype/dashboard.md), [`prototype/AGENTIC_WORKFLOW_GUIDE.md`](file:///home/ap/git-repo/DJP-v1/prototype/AGENTIC_WORKFLOW_GUIDE.md) |

---

> **Role:** ⭐ **PROTOTYPE USER REQUEST INTAKE PORTAL (`web-app = prototype`)**
> Write simple 1–2 line task requests below. Agents dispatch tasks to domain trackers (`fe-todo.md`, `be-todo.md`, `test-todo.md`).

---

## ✅ Completed Tasks

### Phase 1: Bare-Minimum Prototype Setup
- [x] Spring Boot server (`port 8081`) with embedded H2 and clean Jackson serialization
- [x] Built-in dev-login (`POST /djp/api/v1/auth/dev-login`) issuing signed JWTs and civic issues API
- [x] Citizen SPA (`web-app = prototype` on port `5174`) proxying to `localhost:8081` with passing QA suite

### Phase 2: Progressive Microservice Expansion
- [x] Connect `CreateIssuePage` and `IssuesPage` forms to live backend `POST /djp/api/v1/issues` route
- [x] Copy and adapt Discussions and Polls APIs from root `/backend` -> `prototype/backend`
- [x] Copy and adapt Discussion & Poll web views from root `apps/citizen` -> `prototype/frontend`
- [x] Audit & Cleanup (GOV-001): Establish ECI registration structure and compliance roadmap
- [x] Audit & Cleanup (GOV-002): Establish Data Privacy Policy under DPDPA 2023 and add consent fields
- [x] Audit & Cleanup (IMPL-001): Phase 1 Core Tasks for Spring Boot foundation
- [x] Create and maintain canonical Postman Collection JSON file covering all prototype and backend endpoints
- [x] Implement Discussion creation, Poll creation, and auto-populated SQL persistence
- [x] Integrate Onboarding HTML designs into React with live API and persistence
- [x] Separate Profile CRUD API from User Auth API and connect frontend profile editing to new API
- [x] Set up multiple local Spring Boot configurations (dummy and actual data profiles)

---

## 🚀 Remaining Backlog

- [ ] Replace deprecated `document.execCommand` in RichEditor
- [ ] Move auth from localStorage to httpOnly cookies / secure storage
- [ ] Enable stricter TS config (`noUnusedLocals: true`, `noImplicitAny: true`)
