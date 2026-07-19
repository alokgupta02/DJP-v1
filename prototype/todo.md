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
- [ ] Connect `CreateIssuePage` and `IssuesPage` forms to live backend `POST /djp/api/v1/issues` route
- [ ] Copy and adapt Discussions (`/discussions`) and Polls (`/polls`) APIs from root `/backend` -> `prototype/backend`
- [ ] Copy and adapt Discussion & Poll web views from root `apps/citizen` -> `prototype/frontend` (`web-app = prototype`)
