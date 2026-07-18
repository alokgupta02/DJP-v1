# Graph Report - prototype  (2026-07-15)

## Corpus Check
- 11 files · ~2,323 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 61 nodes · 50 edges · 11 communities (10 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `79ba26c5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DJP Prototype Master Guide: Agentic Workflow & Reuse Guidelines
- DJP Prototype Executive Dashboard (`prototype/dashboard.md`)
- DJP Prototype Backend Task Tracker (`prototype/backend/be-todo.md`)
- DJP PROTOTYPE ACTIVE STATE
- DJP Prototype Frontend Task Tracker (`prototype/frontend/fe-todo.md`)
- DJP Prototype QA & Test Suite Task Tracker (`prototype/tests/test-todo.md`)
- DJP PROTOTYPE OPERATIONAL RULES
- DJP Prototype Completed Tasks Archive (`prototype/archive/archive-todo.md`)
- DJP PROTOTYPE IDENTITY
- DJP Prototype User Request Intake Portal (`prototype/todo.md`)
- README.md

## God Nodes (most connected - your core abstractions)
1. `DJP Prototype Workspace` - 6 edges
2. `DJP Prototype Executive Dashboard (`prototype/dashboard.md`)` - 6 edges
3. `DJP Prototype Master Guide: Agentic Workflow & Reuse Guidelines` - 5 edges
4. `DJP PROTOTYPE OPERATIONAL RULES` - 4 edges
5. `DJP PROTOTYPE ACTIVE STATE` - 4 edges
6. `DJP Prototype Backend Task Tracker (`prototype/backend/be-todo.md`)` - 4 edges
7. `DJP Prototype Frontend Task Tracker (`prototype/frontend/fe-todo.md`)` - 4 edges
8. `DJP Prototype QA & Test Suite Task Tracker (`prototype/tests/test-todo.md`)` - 4 edges
9. `DJP PROTOTYPE IDENTITY` - 3 edges
10. `Session Delta Logs` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (11 total, 1 thin omitted)

### Community 0 - "DJP Prototype Master Guide: Agentic Workflow & Reuse Guidelines"
Cohesion: 0.29
Nodes (6): 1. Primary Guideline: Anti-Over-Engineering & Reuse, 2. Visual Task Flow Across Prototype Todos, 3. TDD Flow for Prototype, 4. Master Folder & Todo Architecture Structure, DJP Prototype Master Guide: Agentic Workflow & Reuse Guidelines, Summary Role Table

### Community 1 - "DJP Prototype Executive Dashboard (`prototype/dashboard.md`)"
Cohesion: 0.29
Nodes (6): ⚙️ Backend Roadmap (`prototype/backend/be-todo.md`), 🏛️ Completed Infrastructure & Agentic Workflow Setup (Master Archive), 🚀 Currently Executing Tasks (Active Control Panel), DJP Prototype Executive Dashboard (`prototype/dashboard.md`), 🎨 Frontend Roadmap (`prototype/frontend/fe-todo.md`), 🧪 QA & Test Suite (`prototype/tests/test-todo.md`)

### Community 2 - "DJP Prototype Backend Task Tracker (`prototype/backend/be-todo.md`)"
Cohesion: 0.33
Nodes (5): 🚀 Active Sprint & Executing Tasks, 📋 Backlog & Planned Phases, DJP Prototype Backend Task Tracker (`prototype/backend/be-todo.md`), Phase 1 — Spring Boot App Setup, 📝 Technical Notes & Architectural Reference

### Community 3 - "DJP PROTOTYPE ACTIVE STATE"
Cohesion: 0.33
Nodes (5): 2026-07-15 Session, Current Sprint, DJP PROTOTYPE ACTIVE STATE, Session Delta Logs, Task Breakdown

### Community 4 - "DJP Prototype Frontend Task Tracker (`prototype/frontend/fe-todo.md`)"
Cohesion: 0.33
Nodes (5): 🚀 Active Sprint & Executing Tasks, 📋 Backlog & Planned Phases, DJP Prototype Frontend Task Tracker (`prototype/frontend/fe-todo.md`), Phase 1 — Core App Integration, 📝 Technical Notes & Architectural Reference

### Community 5 - "DJP Prototype QA & Test Suite Task Tracker (`prototype/tests/test-todo.md`)"
Cohesion: 0.33
Nodes (5): 🚀 Active Sprint & Executing Tasks, 📋 Backlog & Planned Phases, DJP Prototype QA & Test Suite Task Tracker (`prototype/tests/test-todo.md`), Phase 1 — Validation Verification, 📝 Technical Notes & Architectural Reference

### Community 6 - "DJP PROTOTYPE OPERATIONAL RULES"
Cohesion: 0.40
Nodes (4): Anti-Over-Engineering Guidelines, Code Quality Standards, Context Allocation, DJP PROTOTYPE OPERATIONAL RULES

### Community 7 - "DJP Prototype Completed Tasks Archive (`prototype/archive/archive-todo.md`)"
Cohesion: 0.50
Nodes (3): 2026-07-15 Session (Prototype Agent Workspace Initialization), DJP Prototype Completed Tasks Archive (`prototype/archive/archive-todo.md`), Session Delta Logs

### Community 8 - "DJP PROTOTYPE IDENTITY"
Cohesion: 0.50
Nodes (3): Communication Guardrails, DJP PROTOTYPE IDENTITY, Technical Profile

### Community 10 - "README.md"
Cohesion: 0.29
Nodes (6): 🤖 Agentic State & Workspace Files, 💡 Core Philosophy: Reuse & Anti-Over-Engineering, DJP Prototype Workspace, 🔍 Local Graph Analysis, 📋 Task & Dashboard Ecosystem, 🚀 Tech Stack

## Knowledge Gaps
- **33 isolated node(s):** `Technical Profile`, `Communication Guardrails`, `Context Allocation`, `Anti-Over-Engineering Guidelines`, `Code Quality Standards` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Technical Profile`, `Communication Guardrails`, `Context Allocation` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._