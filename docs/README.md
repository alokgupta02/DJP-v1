# DJP Documentation Sitemap & Organization Rules

Every AI Agent and human developer MUST place and read Markdown (`.md`) files according to this strict directory structure:

## 1. Project Root (`/`)
- `README.md` -> High-level project overview.
- `todo.md` -> Active task list (read by **PM Agent** to trigger work).

## 2. Agent Rules (`/.agents/`)
- `.agents/AGENTS.md` -> Team roles, TDD workflow, and approval guardrails.

## 3. Documentation Subfolders (`/docs/`)
| Folder | Agent Responsible | What Goes Inside | Example File |
| :--- | :--- | :--- | :--- |
| `docs/execution/` | **All Agents (PM, TA, TL, QA)** | **Active Feature Execution Hub:** PRDs, Architecture blueprints, TL Specs, & QA/UI specs grouped per feature | `docs/execution/oauth-login/PRD.md`, `docs/execution/issues/ui-components.md` |
| `docs/vision/` | **PM Agent** | High-level product vision, party goals & roadmaps | `party-vision.md`, `roadmap.md` |
| `docs/architecture/` | **Tech Arch Agent** | Global system boundaries, reference tech stack & reusable component designs | `system-boundaries.md`, `frontend.md`, `backend-design.md` |
| `docs/development/` | **TL Agent** | Engineering conventions & developer guides | `oauth-login-specs.md`, `prototype-guide.md` |
| `docs/api/` | **BE Agent** | API route definitions & OpenAPI/Swagger contracts | `auth-api.md` |
