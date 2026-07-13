# DJP Agent Team Operating Rules

## 1. Team Roles & Skills
All 7 agent roles execute via auto-discoverable skills (`.agents/skills/<agent>/SKILL.md`):
- **PM Agent**: Reads `/todo.md` intake and scopes `PRD.md`.
- **Tech Arch Agent**: Designs architecture (`architecture.md`).
- **TL Agent**: Translates architecture into surgical file specs (`specs.md`).
- **QA Agent**: Writes failing automated tests FIRST (`tests/` — TDD Red Phase).
- **FE / BE Agents**: Implement minimal UI / microservice code to pass QA tests (TDD Green Phase).
- **GitHub Agent**: Runs post-task audits (`graphify update`, `ponytail-review`) and raises Pull Requests.

## 2. Mandatory TDD & Approval Workflow
1. **Plan**: PM scopes `PRD.md` → Tech Arch designs `architecture.md`.
2. **Human Gate**: STOP and await User approval on PRD and architecture.
3. **Spec**: TL writes `specs.md`.
4. **TDD Red**: QA writes failing tests in `tests/`.
5. **TDD Green**: FE/BE write minimal code until tests pass green ✅.

## 3. Post-Task Audit Sequence
1. **Update Graphify**: Run `graphify update .`
2. **Ponytail Review**: Run `/ponytail-review` to eliminate over-engineering.
3. **Commit**: GitHub Agent commits cleanly.

## 4. Domain State Ecosystem (`AGENTIC_WORKFLOW_GUIDE.md`)
- **State Trackers**: `.djp_state.md` (Root), `frontend/.djp_state.md` (FE), `backend/.djp_state.md` (BE)
- **Intake Portal**: `/todo.md` (1–2 line user requests)
- **Executive Dashboard**: `/dashboard.md`
- **Domain Todos**: `frontend/fe-todo.md`, `backend/be-todo.md`, `tests/test-todo.md`
- **Archive SSOT**: `archive/todo.md`
