# BMAD Master Guide: Agentic Workflow & Reuse Guidelines

This document records the architecture, domain todo ecosystem, and agentic team workflow for building the **BMAD** environment inside `/bmad` utilizing React (frontend) and Spring Boot (backend).

---

## 1. Primary Guideline: Anti-Over-Engineering & Reuse

> [!IMPORTANT]
> The primary objective of bmad is speed and simplicity.
> To avoid over-engineering, you must **NEVER build components, pages, schemas, or hooks from scratch** if they already exist in:
> - Prototype: [`/prototype`](file:///home/ap/git-repo/DJP-v1/prototype)
> - Root Frontend: [`/frontend`](file:///home/ap/git-repo/DJP-v1/frontend)
> - Root Backend: [`/backend`](file:///home/ap/git-repo/DJP-v1/backend)
>
> Copy, adapt, and link code from those sources instead of starting over.

---

## 2. Visual Task Flow Across BMAD Todos

```text
       [ User Request / Goal ]
                  │
                  ▼
       ┌─────────────────────┐
       │    bmad/todo.md     │  ◄── 1. USER WRITES 1–2 LINE BMAD GOAL HERE
       └──────────┬──────────┘
                  │
                  ▼
          [ PM Agent Reads ]
                  │
                  ▼
     ┌────────────┼────────────┐
     ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│fe-todo.md│ │be-todo.md│ │test-todo │ ◄── 2. DOMAIN AGENTS EXECUTE (REUSE CODE)
└────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │
     └────────────┼────────────┘
                  ▼
    ┌───────────────────────────┐
    │archive/archive-todo.md    │ ◄── 3. COMPLETED LOGS (Date-Wise)
    └───────────────────────────┘
```

### Summary Role Table

| Todo File | Primary Writer / Owner | Role & Purpose |
| :--- | :--- | :--- |
| **`bmad/todo.md`** | **User / PM Agent** | **BMAD Entry Point & Intake Portal.** |
| **`bmad/dashboard.md`** | **PM / TL Agents** | **BMAD Executive Dashboard Control Center.** |
| **`bmad/frontend/fe-todo.md`** | **FE Agent** | React UI tasks; pull from `prototype/` or root `/frontend`. |
| **`bmad/backend/be-todo.md`** | **BE Agent** | Spring Boot tasks; pull from `prototype/` or root `/backend`. |
| **`bmad/tests/test-todo.md`** | **QA Agent** | Automated test verification. |
| **`bmad/archive/archive-todo.md`** | **All Agents** | Chronological date-wise history of completed bmad tasks. |

---

## 3. TDD Flow for BMAD
1. **User Goal**: User adds a task in `bmad/todo.md`.
2. **PM Agent**: Scopes and prepares specifications.
3. **TL Agent**: Dispatches to `fe-todo.md`, `be-todo.md`, and `test-todo.md`.
4. **QA Agent (TDD Red)**: Writes failing validation tests in `bmad/tests/`.
5. **FE & BE Agents (TDD Green)**: Adapt existing code from `prototype/` or production root.
6. **Archive**: Move completed tasks to `bmad/archive/archive-todo.md`.

---

## 4. Master Folder Architecture

```text
bmad/
├── .djp_identity.md                            # Agent Profile & Tech Stack
├── .djp_state.md                               # Active Session Objectives
├── .djp_rules.md                               # Operational Rules
├── AGENTIC_WORKFLOW_GUIDE.md                   # This Master Guide
├── todo.md                                     # User Intake Portal
├── dashboard.md                                # Executive Status Dashboard
├── archive/
│   └── archive-todo.md                         # Completed Tasks Log
├── frontend/
│   ├── fe-todo.md                              # Frontend UI Execution Tracker
│   └── ...                                     # React 19 + TS + Vite (port 5175)
├── backend/
│   ├── be-todo.md                              # Backend Execution Tracker
│   └── ...                                     # Spring Boot 3 + H2 (port 8082)
└── tests/
    └── test-todo.md                            # QA Suite Execution Tracker
```
