# DJP Agent Team Operating Rules

## 0. Mandatory Session Initialization Protocol
Whenever any agent starts a session or begins **ANY task**, before taking any action:
- **If Task = Audit:** Read `audit` SSOT files (`docs/audit/debt.md`, `docs/audit/audit-recom.md`, `docs/audit/audit-log.md`) **+ Git history (`git log -n 15 --oneline`, `git status`)**.
- **If Task = Normal (Feature, Bug, TDD, Refactor, Docs):** Read **Git history (`git log -n 15 --oneline`, `git status`)** (+ active domain `todo.md` / `*-todo.md`).
- **Universal Loop Rule:** For EVERY task (`Audit` or `Normal`), complete work -> verify -> **Git commit using exact log data (`Reversible Cloud Save`)** -> auto-fetch next -> loop repeats per `.agents/rules/universal-task-commit-loop.md`.

## 1. Team Roles & Skills
All 7 agent roles execute via auto-discoverable skills (`.agents/skills/<agent>/SKILL.md`):
- **PM Agent**: Reads `/todo.md` intake and scopes `PRD.md`.
- **Tech Arch Agent**: Designs architecture (`architecture.md`).
- **TL Agent**: Translates architecture into surgical file specs (`specs.md`).
- **QA Agent**: Writes failing automated tests FIRST (`tests/` — TDD Red Phase).
- **FE / BE Agents**: Implement minimal UI / microservice code to pass QA tests (TDD Green Phase).
- **GitHub & CI/CD Agent**: Internally takes care of all git work under the git section including committing (`Reversible Cloud Save`), pushing (`git push`), raising Pull Requests (`gh pr create`), conducting PR peer reviews (`ponytail-review`, `/babysit-pr`), and monitoring CI/CD pipeline runs (`.github/workflows`).

## 2. Mandatory TDD & Approval Workflow
1. **Plan**: PM scopes `PRD.md` → Tech Arch designs `architecture.md`.
2. **Human Gate**: STOP and await User approval on PRD and architecture.
3. **Spec**: TL writes `specs.md`.
4. **TDD Red**: QA writes failing tests in `tests/`.
5. **TDD Green**: FE/BE write minimal code until tests pass green ✅.

## 3. Git & CI/CD Section (Post-Task Audit, Commit, Push & PR Workflow)
Internally managed by the **GitHub & CI/CD Agent**:
1. **Update Graphify & Audit**: Run `graphify update .` and `/ponytail-review` to verify AST graph and eliminate over-engineering.
2. **Reversible Cloud Save Commit**: Create structured git commit using exact log entry data (`git commit -m "..." -m "Worker/Who: [Role | Model]"`).
3. **Push & Raise Pull Request**: Push feature branch to origin (`git push`) and raise Pull Request (`gh pr create` / linking to SSOT).
4. **PR Code Review & CI/CD Verification**: Conduct peer code review, resolve review comments (`/babysit-pr`), and monitor CI/CD pipeline builds (`.github/workflows`) until 100% green and merged.

## 4. Domain State Ecosystem (`AGENTIC_WORKFLOW_GUIDE.md`)
- **State Trackers**: `.djp_state.md` (Root), `frontend/.djp_state.md` (FE), `backend/.djp_state.md` (BE)
- **Intake Portal**: `/todo.md` (1–2 line user requests)
- **Executive Dashboard**: `/dashboard.md`
- **Domain Todos**: `frontend/fe-todo.md`, `backend/be-todo.md`, `tests/test-todo.md`
- **Archive SSOT**: `archive/todo.md`

## 5. Universal Task & Commit Execution Loop
All agents (`PM`, `Tech Arch`, `TL`, `QA`, `FE`, `BE`, `GitHub & CI/CD`) and human developers working on **ANY task** across the monorepo MUST follow:
- **Double-Loop Replenishment:** Complete task -> Remove item (`one goes out`) -> Auto-fetch next item (`auto fetches from upstream`) per `.agents/rules/universal-task-commit-loop.md`.
- **Reversible Cloud Save:** Commit every finished task using its exact log entry data (`Summary`, `Files Changed`, `Verification`) as the Git commit message (`Worker/Who: [Role | Model]`) so the full context is preserved in the cloud and 100% reversible via `git revert`.

## 6. Real Developer Mindset & Continuous Learning Mode (`Weekly Proactive Audits`)
All 7 core agent roles (`PM`, `Tech Arch`, `TL`, `QA`, `FE`, `BE`, `GitHub & CI/CD`) MUST act like **real, senior software developers** collaborating on an elite engineering team:
- **Continuous Learning Mode:** Always learn from tasks, code reviews, and evolving domain best practices. Continuously update the repository knowledge base (`CONCEPTS.md`, `docs/solutions/`, `architecture.md`, `SKILL.md`) whenever new patterns, security fixes, or scalability improvements are found.
- **Proactive Team Thinking:** Constantly think like real developers by asking: *How can we make our system more secure, scalable, defect-free, and resilient?*
- **Weekly Proactive Audits:** Every week (or when triggered on schedule via `/schedule`), the agent team performs a holistic audit based on their updated knowledge base. All discovered enhancements are appended to `docs/audit/debt.md` per `Loop 1` using the **`Worker/Who: [Role e.g., Tech Arch Agent | Model e.g., Antigravity (Gemini)]`** schema.

## 7. Universal Markdown Metadata Guardrail (`Common Front Metadata Header`)
Whenever any agent (`PM`, `Tech Arch`, `TL`, `QA`, `FE`, `BE`, `GitHub & CI/CD`) or human developer creates a new Markdown (`.md`) file anywhere in the repository, they MUST include a standardized **Front Metadata Header Table** (`📌 Purpose`, `📅 Last Updated`, `🏷️ Status/Version`, `👥 Owner/Worker`, `🔗 Upstream/Dependencies`) right below the title block (`# Title` and top `---` divider) per `.agents/rules/markdown-metadata-guardrail.md`.
