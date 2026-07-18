# DJP Prototype Backend Task Tracker (`prototype/backend/be-todo.md`)

> **Domain Role:** ⭐ **SINGLE SOURCE OF TRUTH (SSOT)** for Backend & Spring Boot Execution in Prototype
> **Sprint Progress:** 0% `[................................]` 0/1 tasks completed
> **Completed Tasks Archive:** All completed tasks are moved to [`prototype/archive/archive-todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/archive/archive-todo.md).

---

## 🚀 Active Sprint & Executing Tasks

| Phase / Sprint | Task Description | Assigned Agent | Status |
| :--- | :--- | :--- | :--- |
| **Setup Phase** | Initialize Spring Boot project layout inside `prototype/backend` | **BE Agent** | ⬜ Ready to Start |

---

## 📋 Backlog & Planned Phases

### Phase 1 — Spring Boot App Setup
- [ ] Initialize basic Maven project structure
- [ ] Copy and adapt H2 database schemas (`schema.sql` and `data.sql`) from root `/backend`
- [ ] Copy and configure Spring Boot controllers and endpoints for Issues, Feed, and Discussions to serve the React client

---

## 📝 Technical Notes & Architectural Reference

- **Rule against over-engineering:** Do NOT write complex JPA logic or security constraints from scratch.
- **Reference codebase:** Always reference root `/backend` and copy/reuse existing Spring Boot JPA entities, repositories, and controllers where possible.
- **Target stack:** Spring Boot 3.x, Java 21, H2 embedded DB.
