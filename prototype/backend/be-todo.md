# DJP Prototype Backend Task Tracker (`prototype/backend/be-todo.md`)

> **Domain Role:** ⭐ **SINGLE SOURCE OF TRUTH (SSOT)** for Backend & Spring Boot Execution in Prototype
> **Sprint Progress:** 100% `[████████████████████████████████]` Phase 1 Setup Completed
> **Completed Tasks Archive:** All completed tasks are moved to [`prototype/archive/archive-todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/archive/archive-todo.md).

---

## 🚀 Active Sprint & Executing Tasks

| Phase / Sprint | Task Description | Assigned Agent | Status |
| :--- | :--- | :--- | :--- |
| **Phase 2 — Progressive Endpoint Expansion** | Implement additional microservice endpoints required by FE | **BE Agent** | 🟢 Aligned & Ready |

---

## 📋 Completed Phase 1 Tasks
- [x] Initialize Spring Boot 3.4.1 + Java 21 project layout with `local` profile and embedded H2 database (`jdbc:h2:mem:djpdb`)
- [x] Configure `data.sql` and `schema.sql` with strict non-nullable column seeding (`onboarding_completed`, `reputation_score`)
- [x] Implement `POST /djp/api/v1/auth/dev-login` issuing valid signed JWT tokens (`JwtTokenProvider`)
- [x] Add `GET /djp/api/v1/issues` and `GET /djp/api/v1/issues/{id}` controllers and resolve Jackson lazy proxy serialization
- [x] Initialize prototype BE domain identity, rules, and state (`.djp_identity.md`, `.djp_rules.md`, `.djp_state.md`)

## 📋 Backlog & Planned Phases (Phase 2)
- [ ] Add `POST /djp/api/v1/issues` request validation and persistence handling aligned with FE form submission
- [ ] Add basic CRUD endpoints for Discussions (`/djp/api/v1/discussions`) and Polls (`/djp/api/v1/polls`)
- [ ] Coordinate with QA (`prototype/tests/api-health.test.mjs`) for every new route added

---

## 📝 Technical Notes & Architectural Reference
- **Rule against over-engineering:** Do NOT write complex JPA logic or OAuth2 setups from scratch in the prototype.
- **Target stack:** Spring Boot 3.x, Java 21, H2 embedded DB, JWT.
