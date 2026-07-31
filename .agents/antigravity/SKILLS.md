# Antigravity: Skills & Capabilities

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Reference for loaded tools and contextual plugins. |
| **📅 Last Updated** | 2026-07-24 |
| **🏷️ Status** | Active |
| **👥 Owner / Worker** | Antigravity (Gemini) |

## Built-in Agentic Tools
1. **File System Operations**: `view_file`, `write_to_file`, `replace_file_content`, `multi_replace_file_content`, `list_dir`.
2. **Code Context**: `grep_search`.
3. **Terminal Operations**: `run_command` (Executes bash commands asynchronously).
4. **Subagents**: `invoke_subagent` (Spawns independent conversation threads for concurrent work or research).
5. **Background Management**: `manage_task`, `schedule`.
6. **Artifacts**: Generates visual, formatted markdown reports (`task.md`, `walkthrough.md`, `implementation_plan.md`) in the local `brain/` directory.

## Loaded Domain Plugins & Skills
* **Compound Engineering (`ce-*`)**: Complete autonomous shipping suite (`lfg`), debugging loops, code/doc review, testing.
* **Chrome DevTools**: Full browser automation, performance debugging (LCP, memory leaks), and accessibility audits.
* **Modern Web Guidance**: React, Vite, Tailwind CSS best practices.
* **Database & Architecture**: Supabase plugins, Postgres optimizations, Microservices patterns.
* **Custom Repo Skills**: `pm-agent`, `tech-arch-agent`, `tl-agent`, `qa-agent`, `fe-agent`, `be-agent`, `github-agent`, `graphify`.
