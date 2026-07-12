# DJP Project Tasks (Agent Control Center)

## Active Tasks
- [x] Add dynamic, collapsible "All MD" repository file explorer tree below Tests in sidebar navigation
- [x] Add dedicated "Missed & Domain Backlog" tab inside Dashboard profile keeping strict separation from Active Sprint
- [x] Make Control Center sidebar sections collapsible and display human-readable titles with 1-line descriptions
- [x] Create domain-adapted DJPv1 files (`.djp_identity.md`, `.djp_state.md`, `.djp_rules.md`) in `frontend/`, `backend/`, and `tests/`
- [x] Update `dashboard/index.html` sidebar and live Markdown viewer for all 12 DJPv1 files
- [x] Create DJPv1 core files (`.djp_identity.md`, `.djp_state.md`, `.djp_rules.md`) in workspace root
- [x] Revisit and update `.md` files accordingly to align with DJPv1 standard
- [x] Option 1: Build client-ready HTML/JS Live Web Dashboard in `dashboard/` with Kanban board & progress tracker
- [x] Option 2: Add live Mermaid status flowchart template to `todo.md` and operating rule in `.agents/AGENTS.md`
- [ ] Option 3: Build live CLI Terminal Progress Visualizer script (`scripts/todo-visualizer.sh`)

## Completed Tasks
- [x] Replace /browser reference with /brainstorming in Section 4 of .agents/AGENTS.md
- [x] Refine Section 4 in .agents/AGENTS.md to explicitly state that whenever creating any doc or API spec in the agentic workflow lifecycle, agents must leverage /browser and /planning-with-files
- [x] Add mandatory lifecycle rule to use /browser and /planning-with-files for docs, API specs, and planning in .agents/AGENTS.md
- [x] Add mandatory post-task workflow (graphify update, ponytail-review, and rectify issues) to .agents/AGENTS.md
- [x] Protect app routes with auth guard in AppLayout so root/app hits display /login when unauthenticated
- [x] Connect LoginPage submit & OAuth buttons to authenticate and redirect to /feed
- [x] Add logout action in ProfilePage to allow testing sign-in/sign-out flow
- [x] Add Google & GitHub Login (Store user details in DB)
