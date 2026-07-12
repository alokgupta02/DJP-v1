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
| `docs/vision/` | **PM Agent** | Product Requirement Documents (PRDs) & feature goals | `PRD-oauth-login.md` |
| `docs/architecture/` | **Tech Arch Agent** | Technical architecture, DB schemas, & Java Spring Boot design | `oauth-login-architecture.md` |
| `docs/development/` | **TL Agent** | File-level specifications, TDD test checklists | `oauth-login-specs.md` |
| `docs/api/` | **BE Agent** | API route definitions & OpenAPI/Swagger contracts | `auth-api.md` |
| `docs/superpowers/` | **All Agents** | Specialized technical designs & deep-dive research | `springboot-h2-backend-design.md` |
