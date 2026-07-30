# Feature Execution SSOT (`docs/execution/<feature>/todo.md`)

> **Feature Name:** `<feature-name>`
> **Role:** ⭐ **SINGLE SOURCE OF TRUTH (SSOT)** for this feature execution. All agents read and update this file directly.
> **Status:** `Active / In-Review / Completed`

---

## Phase 1: Product & Architecture Planning
- [ ] **PM Agent:** Create structured Product Requirements Document (`PRD.md`)
- [ ] **Tech Arch Agent:** Create Technical Architecture & Boundary Blueprint (`architecture.md`)
- [ ] **Circular Human Approval Gate:** Await explicit user approval (or loop revisions)

## Phase 2: Specs & Test-Driven QA (TDD Red Phase)
- [ ] **TL Agent:** Create File & Component Specifications (`specs.md`)
- [ ] **QA Agent:** Create QA Test Plan (`qa-test-plan.md`)
- [ ] **QA Agent:** Write automated failing test suites in `tests/` before application code exists

## Phase 3: Lean Implementation (TDD Green Phase)
- [ ] **BE Agent:** Document API Contract (`api-contract.md`) and implement microservice routes
- [ ] **FE Agent:** Document UI Components (`ui-components.md`) and implement React views
- [ ] **QA Verification:** Run automated test suite until all tests pass green ✅

## Phase 4: Post-Task Review & PR
- [ ] **Graphify Update:** Run `graphify update .` to sync codebase graph
- [ ] **Ponytail Review:** Audit code for over-engineering and dead abstractions
- [ ] **GitHub & CI/CD Agent:** Create structured git commit (`Reversible Cloud Save`), push branch, raise Pull Request, run PR review (`/babysit-pr`), and verify 100% green CI/CD pipeline status linking back to this execution folder
