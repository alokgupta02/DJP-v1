# DJP Prototype User Request Intake Portal (`web-app = prototype`)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Primary User Intake Portal and task checklist for our Prototype Web App (`web-app = prototype`). |
| **📅 Last Updated** | 2026-07-19 |
| **🏷️ Status / Version** | Active SSOT / v1.0.0 |
| **👥 Owner / Worker** | `Worker/Who: [PM Agent / User | Antigravity (Gemini)]` |
| **🔗 Upstream / Dependencies** | [`prototype/dashboard.md`](file:///home/ap/git-repo/DJP-v1/prototype/dashboard.md), [`prototype/AGENTIC_WORKFLOW_GUIDE.md`](file:///home/ap/git-repo/DJP-v1/prototype/AGENTIC_WORKFLOW_GUIDE.md) |

---

> **Role:** ⭐ **PROTOTYPE USER REQUEST INTAKE PORTAL (`web-app = prototype`)**
> Write simple 1–2 line task requests below. Agents dispatch tasks to domain trackers (`fe-todo.md`, `be-todo.md`, `test-todo.md`).

---

## 🟢 Phase 1: Bare-Minimum Prototype Setup (COMPLETED)
- [x] Spring Boot server (`port 8081`) with embedded H2 (`jdbc:h2:mem:djpdb`) and clean Jackson serialization
- [x] Built-in dev-login (`POST /djp/api/v1/auth/dev-login`) issuing signed JWTs (`citizen@djp.org`) and civic issues API (`GET /issues`)
- [x] Citizen SPA (`web-app = prototype` on port `5174`) proxying to `localhost:8081` with passing QA suite (`api-health.test.mjs`)

---

## 🚀 Phase 2: Progressive Microservice Expansion Backlog

### ✍️ User Input (Add your 1–2 line prototype task items below)
- [x] Connect `CreateIssuePage` and `IssuesPage` forms to live backend `POST /djp/api/v1/issues` route
- [x] Copy and adapt Discussions (`/discussions`) and Polls (`/polls`) APIs from root `/backend` -> `prototype/backend`
- [x] Copy and adapt Discussion & Poll web views from root `apps/citizen` -> `prototype/frontend` (`web-app = prototype`)
- [x] Audit & Cleanup (GOV-001): Establish ECI registration structure and compliance roadmap (`docs/legal/registration-and-compliance.md`)
- [x] Audit & Cleanup (GOV-002): Establish Data Privacy Policy under DPDPA 2023 (`docs/legal/data-privacy.md`) and add consent fields to `User.java`
- [ ] Audit & Cleanup (IMPL-001): Phase 1 Core Tasks for Spring Boot foundation (Project Structure, Config Profiles, Flyway, Exception Handling, Security/JWT, Observability)
- [ ] Audit & Cleanup (DATA-001): Integrate `flyway-core` and create versioned migration scripts (`V1__init.sql`) replacing unsafe `ddl-auto: update`
