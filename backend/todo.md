# DJP Backend Dashboard

**Progress: 0%** `[................................]` 0/22 tasks

| Phase | Done | Status |
|---|---|---|
| 1 — Project Setup, H2 & OAuth2 | 0/6 | ⬜ Not Started |
| 2 — Issues CRUD | 0/5 | ⬜ Not Started |
| 3 — Feed, Discussions & Replies | 0/4 | ⬜ Not Started |
| 4 — Polls & Votes | 0/4 | ⬜ Not Started |
| 5 — Petitions, Notifications & Representatives | 0/3 | ⬜ Not Started |
---

# Project Task Tracker

## Objective
Build a production-quality Spring Boot 3.x + Java 21 + H2 backend for the DJP citizen app, following TDD principles. Implement REST APIs under `/api/v1`, OAuth2 authentication, and progressive database integration — designed to migrate to PostgreSQL/Supabase.

Overall Progress: ~0% (0/22 tasks)

---

## Current Task

None — no phase has started yet.

---

## Remaining Tasks

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

## Completed

None — backend implementation has not started.

---

## Notes

- Stack: Spring Boot 3.x, Java 21, H2 embedded DB, Spring Security, Spring Data JPA
- Auth: OAuth2 Authorization Code Flow (Google + LinkedIn) → JWT issued to React frontend
- TDD enforced: write failing tests first, then minimal production code
- H2 schema files: `schema.sql` (table DDL) and `data.sql` (seed data), executed on startup
- All source files under `backend/springboot/src/`
- Package root: `com.djp.backend`
- Future migration target: PostgreSQL / Supabase
- Spec reference: `docs/superpowers/specs/2026-07-11-springboot-h2-backend-design.md`
