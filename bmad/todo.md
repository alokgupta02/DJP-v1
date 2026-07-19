# DJP BMAD User Request Intake Portal (`web-app = bmad`)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Primary User Intake Portal and task checklist for our BMAD Web App (`web-app = bmad`). |
| **📅 Last Updated** | 2026-07-19 |
| **🏷️ Status / Version** | Active SSOT / v1.0.0 |
| **👥 Owner / Worker** | `Worker/Who: [PM Agent / User | Antigravity (Gemini)]` |
| **🔗 Upstream / Dependencies** | [`bmad/dashboard.md`](file:///home/ap/git-repo/DJP-v1/bmad/dashboard.md) |

---

> **Role:** ⭐ **BMAD USER REQUEST INTAKE PORTAL (`web-app = bmad`)**
> Write simple 1–2 line task requests below. Agents dispatch tasks to domain trackers (`fe-todo.md`, `be-todo.md`, `test-todo.md`).

---

## 🟢 Phase 1: Bare-Minimum BMAD Setup (COMPLETED)
- [x] Spring Boot server (`port 8082`) with embedded H2 (`jdbc:h2:mem:djpdb`) and clean Jackson serialization
- [x] Built-in dev-login (`POST /djp/api/v1/auth/dev-login`) issuing signed JWTs (`citizen@djp.org`) and civic issues API (`GET /issues`)
- [x] Citizen SPA (`web-app = bmad` on port `5175`) proxying to `localhost:8082` with passing QA suite (`api-health.test.mjs`)

---

## 🚀 Phase 2: Progressive Microservice Expansion Backlog

### ✍️ User Input (Add your 1–2 line BMAD task items below)
- [ ] Connect `CreateIssuePage` and `IssuesPage` forms to live backend `POST /djp/api/v1/issues` route
- [ ] Copy and adapt Discussions (`/discussions`) and Polls (`/polls`) APIs from `prototype/backend` -> `bmad/backend`
- [ ] Copy and adapt Discussion & Poll web views from `prototype/frontend` -> `bmad/frontend` (`web-app = bmad`)
