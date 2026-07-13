# DJP Agent Team Operating Rules

## 1. Team Roles
- **PM Agent**: Reads `todo.md` and writes product requirements in `docs/PRD.md`.
- **Tech Arch Agent**: Reads PRD and writes technical architecture in `docs/architecture.md`.
- **TL Agent (Team Lead)**: Coordinates team, writes `docs/specs.md`, and checks quality.
- **QA Agent**: Writes automated test files FIRST before any app code exists (TDD).
- **FE / BE Agents**: Write Frontend and Backend code ONLY to pass QA tests.
- **GitHub Agent**: Commits docs/tests, creates branches, and raises Pull Requests.

## 2. Mandatory TDD & Approval Workflow
1. **Plan**: PM writes `PRD.md` -> Tech Arch writes `architecture.md` -> GitHub Agent commits.
2. **GATE (Human Approval)**: STOP and wait for User to approve `PRD.md` and `architecture.md`.
3. **Spec**: TL writes `docs/specs.md` -> GitHub Agent commits.
4. **Test First (TDD)**: QA writes automated tests in `tests/` -> TL validates test quality -> GitHub Agent commits.
5. **Code**: FE/BE write code -> Run automated QA tests.
   - If tests fail: Retry fixing code (Max 3 attempts).
   - If tests pass: GitHub Agent raises Pull Request.

## 3. Mandatory Post-Task Workflow
After completing every task, agents MUST automatically execute the following steps in sequence:
1. **Update Graphify**: Run `/graphify update` (`graphify update .`) to keep the codebase knowledge graph up to date.
2. **Ponytail Review**: Run `/ponytail-review` to audit code changes for over-engineering, dead code, or unneeded complexity.
3. **Rectify Issues**: Immediately fix and simplify any issues identified during the review.

## 4. Mandatory Lifecycle Skills & Tools
In the agentic workflow, whenever there is a need to create any documentation, API specification, or document at any point in the development lifecycle, agents MUST leverage:
- **`/planning-with-files`**: Use persistent file-based planning (`task_plan.md`, `findings.md`, `progress.md`) to structure complex tasks, research, and decisions.
- **`/brainstorming`**: Explore user intent, requirements, architecture, and design thoroughly before creating any documentation, specifications, or implementation.

## 5. Master Workflow Guide & Domain Ecosystem
All agents MUST follow the domain-scoped task & state flow defined in `AGENTIC_WORKFLOW_GUIDE.md`:
- **Domain State Trackers (`.djp_state.md`)**:
  - Root: `.djp_state.md` (Monorepo Master State)
  - Frontend: `frontend/.djp_state.md` (FE UI State)
  - Backend: `backend/.djp_state.md` (BE Microservice State)
- **Intake Portal (`/todo.md`)**: User writes 1–2 line goals. PM Agent reads input here and scopes `PRD.md`.
- **Executive Dashboard (`/dashboard.md`)**: High-level progress tracking.
- **Domain Execution Todos**:
  - `frontend/fe-todo.md` (FE Agent)
  - `backend/be-todo.md` (BE Agent)
  - `tests/test-todo.md` (QA Agent)
- **Archive SSOT (`archive/todo.md`)**: Move all completed tasks date-wise into `archive/todo.md`. Never delete completed task history.
