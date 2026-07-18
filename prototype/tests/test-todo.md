# DJP Prototype QA & Test Suite Task Tracker (`prototype/tests/test-todo.md`)

> **Domain Role:** ⭐ **SINGLE SOURCE OF TRUTH (SSOT)** for QA & Automated Testing Execution in Prototype
> **Sprint Progress:** 0% `[................................]` 0/1 tasks completed
> **Completed Tasks Archive:** All completed tasks are moved to [`prototype/archive/archive-todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/archive/archive-todo.md).

---

## 🚀 Active Sprint & Executing Tasks

| Phase / Sprint | Task Description | Assigned Agent | Status |
| :--- | :--- | :--- | :--- |
| **Setup Phase** | Setup simple validation check tests for prototype UI and API routes | **QA Agent** | ⬜ Ready to Start |

---

## 📋 Backlog & Planned Phases

### Phase 1 — Validation Verification
- [ ] Create tests to verify that the React views render correctly by copying root tests/
- [ ] Create tests to verify Spring Boot endpoints respond with H2 mocked data

---

## 📝 Technical Notes & Architectural Reference

- **Rule against over-engineering:** Do NOT write complex CI pipeline runners or thousands of test cases. Keep tests limited to basic validation of prototype correctness.
- **TDD:** Automated tests should fail before the code is added, then green after copying/reusing components.
