# DJP Prototype User Request Intake & Domain Alignment Portal (`prototype/todo.md`)

> **Role:** ⭐ **PROTOTYPE USER REQUEST INTAKE PORTAL & PROGRESSIVE ALIGNMENT SSOT**
> Write simple 1–2 line task requests for the prototype below. The agent team (`PM -> Tech Arch -> TL -> QA -> FE -> BE`) dispatches tasks across target domains (`prototype/frontend`, `prototype/backend`, `prototype/tests`) maintaining 100% alignment across dev/test/fe/be.
> Executive Dashboard: [`dashboard.md`](file:///home/ap/git-repo/DJP-v1/prototype/dashboard.md) | Archive Logs: [`archive/archive-todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/archive/archive-todo.md)

---

## 🟢 Phase 1: Prototype Core Setup & Verification (COMPLETED)
- [x] **Backend:** Standalone Spring Boot server (`port 8081`) with H2 memory DB and `@JsonIgnoreProperties` clean proxy serialization
- [x] **Auth:** Dev-login (`POST /djp/api/v1/auth/dev-login`) issuing signed JWTs (`citizen@djp.org`)
- [x] **API:** Issues retrieval (`GET /djp/api/v1/issues` and `/issues/{id}`)
- [x] **Frontend:** Standalone Citizen SPA (`port 5173`) with Vite API proxy to backend and clean `npm run build`
- [x] **Tests:** Automated verification suite (`prototype/tests/api-health.test.mjs`) and domain tracking (`.djp_identity.md`, `.djp_rules.md`, `.djp_state.md` across all domains)

---

## 🚀 Phase 2: Progressive Feature & Test Alignment Backlog

### 1. Issues Feature Integration
- [ ] **QA (`prototype/tests`):** Add automated test coverage for creating an issue (`POST /djp/api/v1/issues`)
- [ ] **BE (`prototype/backend`):** Ensure `POST /djp/api/v1/issues` validates input and persists cleanly to H2
- [ ] **FE (`prototype/frontend`):** Wire `CreateIssuePage` form submission to live endpoint and handle success/error states

### 2. Discussions Feature Integration
- [ ] **QA (`prototype/tests`):** Add automated test coverage for `GET` and `POST /djp/api/v1/discussions`
- [ ] **BE (`prototype/backend`):** Add `DiscussionController` and JPA entity seeding
- [ ] **FE (`prototype/frontend`):** Wire `DiscussionsPage` and detail views to backend

### 3. Polls Feature Integration
- [ ] **QA (`prototype/tests`):** Add automated test coverage for polls query and voting
- [ ] **BE (`prototype/backend`):** Add `PollController` and voting endpoints
- [ ] **FE (`prototype/frontend`):** Wire `PollsPage` to live endpoints
