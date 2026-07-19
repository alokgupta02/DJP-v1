# DJP Prototype QA & Test Suite Task Tracker (`bmad/tests/test-todo.md`)

> **Domain Role:** ⭐ **SINGLE SOURCE OF TRUTH (SSOT)** for QA & Automated Testing Execution in Prototype
> **Sprint Progress:** 100% `[████████████████████████████████]` Phase 1 Setup & Verification Completed
> **Completed Tasks Archive:** All completed tasks are moved to [`bmad/archive/archive-todo.md`](file:///home/ap/git-repo/DJP-v1/bmad/archive/archive-todo.md).

---

## 🚀 Active Sprint & Executing Tasks

| Phase / Sprint | Task Description | Assigned Agent | Status |
| :--- | :--- | :--- | :--- |
| **Phase 2 — Progressive E2E & Domain Alignment** | Track and verify FE/BE integration for incoming prototype features | **QA Agent** | 🟢 Aligned & Ready |

---

## 📋 Completed Phase 1 Tasks
- [x] Create automated API health verification check (`bmad/tests/api-health.test.mjs`)
- [x] Create prototype auth test suite adapted from root (`bmad/tests/auth.test.js`)
- [x] Initialize prototype QA identity, rules, state, and README (`.djp_identity.md`, `.djp_rules.md`, `.djp_state.md`, `README.md`)

## 📋 Backlog & Planned Phases (Phase 2)
- [ ] Create progressive automated tests (`tests/`) whenever new FE routes or BE endpoints are introduced in `bmad/`
- [ ] Verify clean proxying (`localhost:5173 -> localhost:8081`) and JWT session persistence on every feature PR
- [ ] Ensure 100% synchronization across `bmad/frontend/fe-todo.md`, `bmad/backend/be-todo.md`, and `bmad/todo.md`

---

## 📝 Technical Notes & Architectural Reference
- **TDD & Progressive Alignment:** Every new capability added to `bmad/frontend` or `bmad/backend` must have a corresponding verification test added here first or right alongside it.
- **Commands:** Run `node bmad/tests/api-health.test.mjs` to verify basic backend health.
