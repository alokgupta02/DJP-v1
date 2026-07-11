# Agent Skills & Slash Commands Directory

This artifact lists all available agent skills and slash commands installed globally and locally in this project, along with a brief description and their typical triggers.

## Installed Skills & Commands

| Slash Command / Skill Name | Scope | Description |
| :--- | :--- | :--- |
| `/ponytail` | Global | Switch ponytail intensity level (`lite` / `full` / `ultra` / `off`). |
| `/ponytail-review` | Global | Audit current change diffs for over-engineering and suggest deletions. |
| `/ponytail-audit` | Global | Run a full-repository over-engineering audit. |
| `/ponytail-debt` | Global | Harvest deferred shortcuts (`ponytail:` comments) into a tracked ledger. |
| `/ponytail-gain` | Global | View measured-impact scoreboard showing token and time savings. |
| `/ponytail-help` | Global | Show quick reference card for Ponytail commands. |
| `/graphify` | Global | Build a navigable knowledge graph (`graphify-out/`) on a local folder or Git repo. |
| `/graphify query "<q>"` | Global | Query the knowledge graph using BFS/DFS traversals. |
| `/graphify path "<A>" "<B>"` | Global | Find the shortest structural path between two nodes/concepts. |
| `/graphify explain "<c>"` | Global | Provide a plain-language explanation of a specific node or concept. |
| `/find-skills` | Local | Discover and search for other available agent skills in the marketplace. |
| `/vercel-react-best-practices` | Local | Review React/Next.js components for performance optimization opportunities. |
| `/improve-codebase-architecture` | Local | Scan codebase for architectural refactoring opportunities and generate reports. |
| `/tdd` / `/test-driven-development` | Local | Enforce test-driven development flow (write tests before implementation). |
| `/caveman` | Local | Toggle ultra-compressed conversational prose (cuts tokens by 65%). |
| `/skill-creator` | Local | Create, benchmark, and optimize custom agent skills. |
| `/supabase-postgres-best-practices` | Local | Review and optimize Postgres database schemas, indexes, and queries. |
| `/brainstorming` | Local | Run structured requirement exploration and design exercises before coding. |
| `/redesign-existing-projects` | Local | Upgrade visual styles and layout tokens to a premium quality aesthetic. |
| `/supabase` | Local | Handle database, auth, functions, storage, and RLS schema updates. |
| `/codebase-design` | Local | Use deep modules, adapters, and interface seams design vocabulary. |
| `/analyze-project` | Local | Perform deep auditing and read-only research on deep repositories. |
| `/chrome-extensions` | Global | Build and debug Chrome Extensions using Manifest V3 guidelines. |
| `/modern-web-guidance` | Global | Check modern CSS (backdrop-filters, container queries, `:has()`) and HTML APIs. |
| `/antigravity-guide` | Global | Get comprehensive guides and quick references for Antigravity settings and CLI. |

## Tips for Using Skills
- **Slash Commands**: You can type any of the above commands directly in your prompt to trigger them (e.g. `/ponytail lite` or `/ponytail-review`).
- **Context Injection**: When a skill is triggered, the agent automatically loads its instructions and applies them to the current conversation.
