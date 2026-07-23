# DJP Prototype Backend Task Tracker (`prototype/backend/be-todo.md`)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Single Source of Truth (SSOT) tracking API execution tasks for our Spring Boot backend (`port 8081`). |
| **📅 Last Updated** | 2026-07-19 |
| **🏷️ Status / Version** | Active SSOT / v1.0.0 |
| **👥 Owner / Worker** | `Worker/Who: [BE Agent | Antigravity (Gemini)]` |
| **🔗 Upstream / Dependencies** | [`prototype/dashboard.md`](file:///home/ap/git-repo/DJP-v1/prototype/dashboard.md), [`prototype/todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/todo.md) |

---

## 🚀 Active Sprint & Executing Tasks

| Phase / Sprint | Task Description | Assigned Agent | Status |
| :--- | :--- | :--- | :--- |
| **Phase 2 — Endpoint Expansion** | Implement `Discussions` and `Polls` API routes copied from root `/backend` serving `web-app = prototype` | **BE Agent** | 🟢 Aligned & Ready |

---

## 📋 Task Backlog & Archive Reference
- [x] Initialize Spring Boot 3.4.1 project (`port 8081`) with H2 memory DB (`jdbc:h2:mem:djpdb`), `dev-login` JWT, and `GET /issues` API
- [ ] Add `POST /djp/api/v1/issues` validation and persistence handling aligned with FE form submission
- [ ] Copy and adapt `DiscussionController` (`/djp/api/v1/discussions`) and `PollController` (`/djp/api/v1/polls`) from root `/backend`
- [x] Refactor Profile API out of `UserController` into `ProfileController`/`ProfileService` following Domain-Driven Design.
- [x] Configure `application-dummy.yml` for seeded database testing alongside `application-local.yml` (actual data).

> [!NOTE]
> **Completed Items Archive:** All completed historical items are archived to [`prototype/archive/archive-todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/archive/archive-todo.md).
