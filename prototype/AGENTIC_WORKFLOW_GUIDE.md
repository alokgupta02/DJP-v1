# DJP Prototype Master Guide: Agentic Workflow & Reuse Guidelines

This document records the architecture, domain todo ecosystem, and agentic team workflow for building the **DJP Prototype** inside `/prototype` utilizing React (frontend) and Spring Boot (backend).

---

## 1. Primary Guideline: Anti-Over-Engineering & Reuse

> [!IMPORTANT]
> The primary objective of the prototype is speed and simplicity. 
> To avoid over-engineering, you must **NEVER build components, pages, schemas, or hooks from scratch** if they already exist in the root production folders:
> - Root Frontend: [`/frontend`](file:///home/ap/git-repo/DJP-v1/frontend)
> - Root Backend: [`/backend`](file:///home/ap/git-repo/DJP-v1/backend)
> - Root Tests: [`/tests`](file:///home/ap/git-repo/DJP-v1/tests)
> 
> Copy, adapt, and link code from production instead of starting over.

---

## 2. Visual Task Flow Across Prototype Todos

Our prototype task tracking is self-contained. Always update and read files within the `prototype/` folder.

```text
       [ User Request / Goal ]
                  │
                  ▼
       ┌─────────────────────┐
       │  prototype/todo.md  │  ◄── 1. USER WRITES 1–2 LINE PROTOTYPE GOAL HERE
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
| **`prototype/todo.md`** | **User / PM Agent** | **Prototype Entry Point & Intake Portal.** |
| **`prototype/dashboard.md`** | **PM / TL Agents** | **Prototype Executive Dashboard Control Center.** Aggregates progress. |
| **`prototype/frontend/fe-todo.md`** | **FE Agent** | React UI tasks; pull from root `/frontend`. |
| **`prototype/backend/be-todo.md`** | **BE Agent** | Spring Boot tasks; pull from root `/backend`. |
| **`prototype/tests/test-todo.md`** | **QA Agent** | Automated test verification; pull from root `/tests`. |
| **`prototype/archive/archive-todo.md`**| **All Agents** | Chronological date-wise history of completed prototype tasks. |

---

## 3. TDD Flow for Prototype
1. **User Goal**: User adds a prototype task in `prototype/todo.md`.
2. **PM Agent**: Scopes and prepares specifications.
3. **TL Agent**: Dispatches to `fe-todo.md`, `be-todo.md`, and `test-todo.md`.
4. **QA Agent (TDD Red)**: Writes failing validation check tests in `prototype/tests/`.
5. **FE & BE Agents (TDD Green)**: Copy and adapt existing code from the root `/frontend` or `/backend` to satisfy the tests.
6. **Archive**: Move completed tasks to `prototype/archive/archive-todo.md`.

---

## 4. Master Folder & Todo Architecture Structure

```text
prototype/
├── .djp_identity.md                            # Agent User Profile & Tech Stack Baseline
├── .djp_state.md                               # Active Session Objectives & Delta Logs
├── .djp_rules.md                               # Operational & Code Quality Rules
├── AGENTIC_WORKFLOW_GUIDE.md                   # This Master Guide
├── todo.md                                     # User Intake Portal (1-2 line input)
├── dashboard.md                                # Executive Status & Progress Aggregator
├── archive/
│   └── archive-todo.md                         # Chronological Date-Wise Completed Tasks Log
├── frontend/
│   ├── fe-todo.md                              # Frontend UI Execution Tracker
│   └── ...                                     # React 18 + TS + Vite (Reused from root)
├── backend/
│   ├── be-todo.md                              # Backend Execution Tracker
│   └── ...                                     # Spring Boot 3 + H2 (Reused from root)
└── tests/
    └── test-todo.md                            # QA Suite Execution Tracker
```
