# DJP QA & Test Suite Task Tracker (`tests/test-todo.md`)

> **Domain Role:** ⭐ **SINGLE SOURCE OF TRUTH (SSOT)** for QA & Automated Testing Execution
> **Sprint Progress:** 50% `[████████████████................]` 2/4 tasks completed
> **Completed Tasks Archive:** All completed tasks are moved to [`archive/todo.md`](file:///home/ap/git-repo/DJP-v1/archive/todo.md) (SSOT for historical completed work).

---

## 🚀 Active Sprint & Executing Tasks

| Phase / Sprint | Task Description | Assigned Agent | Status |
| :--- | :--- | :--- | :--- |
| **Phase 2 — Core E2E & API Test Automation** | Failing Playwright E2E & microservice API tests (TDD Red Phase) | **QA Agent** | 🟡 Active Sprint |

---

## 📋 Backlog & Planned Phases

### Phase 2 — Core E2E & API Test Automation (TDD Red Phase)
- [x] Write Playwright QA test for Profile Completion Banner & Edit Modal (`profile-completion.spec.js`)
- [ ] Write failing Playwright E2E tests for core authentication flow (`login -> oauth -> feed`)
- [ ] Write failing API integration tests for microservice `/api/v1` routes (`auth`, `issues`, `discussions`)
- [ ] Verify TDD Red Phase failure state before handing off to FE/BE agents

### Phase 3 — Continuous Regression & CI Pipeline
- [ ] Set up GitHub Actions workflow executing Playwright and JUnit/PyTest test suites on Pull Request
- [ ] Validate 0 regressions across completed sprint features

---

## 📝 Technical Notes & Architectural Reference

- See [`archive/todo.md`](file:///home/ap/git-repo/DJP-v1/archive/todo.md) for completed QA role and skill separation tasks.
- Mandatory TDD: Automated tests must be written and fail (`Red`) before any application code is created.
- Frameworks: Playwright for browser E2E (`frontend/`), JUnit 5 / PyTest for microservices (`backend/`).
