# DJP Backend Task Tracker (`backend/be-todo.md`)

> **Domain Role:** ⭐ **SINGLE SOURCE OF TRUTH (SSOT)** for Backend Microservices & Spring Boot Execution
> **Sprint Progress:** 0% `[................................]` 0/22 tasks completed
> **Completed Tasks Archive:** All completed tasks are moved to [`archive/todo.md`](file:///home/ap/git-repo/DJP-v1/archive/todo.md) (SSOT for historical completed work).

---

## 🚀 Active Sprint & Executing Tasks

| Phase / Sprint | Task Description | Assigned Agent | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1 (MVP 1)** | Project Setup, H2 Integration & OAuth2 Login | **BE Agent** | ⬜ Ready to Start |

---

## 📋 Backlog & Planned Phases

### Phase 1 — Project Setup, H2 Integration & OAuth2 (MVP 1)
- [ ] Initialize Spring Boot Maven project (`spring-web`, `spring-security`, `spring-data-jpa`, `validation`, `h2`, `oauth2-client`)
- [ ] Configure `schema.sql` and `data.sql` for H2 schema setup and mock user seeding
- [ ] Configure Spring Security for OAuth2 Login with Google and LinkedIn
- [ ] Implement JWT helper (generate, parse, validate tokens)
- [ ] Create `GET /api/v1/auth/me` endpoint to verify current user context
- [ ] Verify OAuth2 flows locally with integration tests

### Phase 2 — Issues CRUD (MVP 2)
- [ ] Add `issues` table to `schema.sql` and seed mock data in `data.sql`
- [ ] Implement `Issue` JPA entity and `IssueRepository`
- [ ] Create `IssueService` and `IssueController` with TDD (search, create, update, delete)
- [ ] Implement support toggling (`POST /api/v1/issues/{id}/support`) with transactional logic
- [ ] Connect frontend TanStack Query requests to Issues REST endpoints

### Phase 3 — Feed, Discussions & Replies (MVP 3)
- [ ] Add `discussions` and `discussion_replies` tables to `schema.sql`
- [ ] Implement domain entities, JPA relations, service layers, and validation
- [ ] Create `GET/POST /api/v1/discussions` controllers and discussion reply endpoints
- [ ] Connect frontend Feed and Discussions pages to backend

### Phase 4 — Polls & Votes (MVP 4)
- [ ] Add `polls` and `poll_votes` tables to `schema.sql`
- [ ] Write custom validation constraint enforcing unique user-per-poll vote
- [ ] Expose `GET/POST /api/v1/polls` and vote endpoints
- [ ] Integrate frontend poll voting and real-time visualization bindings

### Phase 5 — Petitions, Notifications & Representatives (MVP 5+)
- [ ] Define supporting database schemas (petitions, notifications, representatives)
- [ ] Map endpoints for representative tracking and petitions
- [ ] Wire final frontend views

---

## 📝 Technical Notes & Architectural Reference

- Stack: Spring Boot 3.x, Java 21, H2 embedded DB, Spring Security, Spring Data JPA
- Auth: OAuth2 Authorization Code Flow (Google + LinkedIn) → JWT issued to React frontend
- TDD enforced: write failing tests first, then minimal production code
- H2 schema files: `schema.sql` (table DDL) and `data.sql` (seed data), executed on startup
- All source files under `backend/springboot/src/`
- Package root: `com.djp.backend`
- Future migration target: PostgreSQL / Supabase
- Spec reference: `docs/superpowers/specs/2026-07-11-springboot-h2-backend-design.md`
