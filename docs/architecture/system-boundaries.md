# 🏛️ System Boundaries & Agentic Guardrails Matrix

> **Purpose:** Establish production-ready boundaries, clear ownership, exact technical stacks, and AI agent guardrails across the Digital Janata (DJP) platform.

---

## 1. Executive Summary & Big Picture

```mermaid
graph TD
    subgraph Client [Client & Frontend Layer]
        FE_DASH[Dashboard Web App - HTML5/JS]
        FE_REACT[React 18 Frontend App]
    end

    subgraph Gateway [API Gateway Layer]
        GW[API Router / Reverse Proxy]
    end

    subgraph Microservices [Backend Microservices Layer]
        AUTH[Auth Service - Java 21 / Spring Boot 3]
        CORE[Core Civic Service - Java 21 / Spring Boot 3]
        AI[AI Analytics Service - Python 3.11 / FastAPI]
    end

    subgraph Storage [Data Storage Layer]
        PG[Supabase PostgreSQL + RLS]
        VEC[pgvector Semantic Store]
    end

    FE_DASH -->|REST / JSON| GW
    FE_REACT -->|REST / JSON| GW
    GW -->|/api/auth/*| AUTH
    GW -->|/api/core/*| CORE
    GW -->|/api/ai/*| AI
    AUTH -->|JWT / OAuth| PG
    CORE -->|SQL / JPA| PG
    AI -->|Vectors / Embeddings| VEC
```

---

## 2. Identified Architectural Areas & Domain Boundaries

| Domain Area | Directory Path | Core Responsibilities | Technology Stack | Boundary Guardrails |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend App** | `frontend/` | UI rendering, user interaction, state management, client validation | React 18, TypeScript, Vite, Tailwind CSS | No direct DB access; must communicate strictly via API endpoints. |
| **Civic Dashboard** | `dashboard/` | Real-time Kanban board, Markdown document viewer, agent metrics | Vanilla HTML5, CSS3, ES6 JavaScript, Chart.js | Zero build-step requirement; standalone static delivery. |
| **Auth Service** | `backend/auth-service` | Identity management, OAuth2 login, JWT issuance, session security | Java 21, Spring Boot 3, Spring Security, Supabase Auth | Sole authority on authentication tokens and user credentials. |
| **Core Service** | `backend/core-service` | Civic issues, democratic discussions, citizen polls, proposals | Java 21, Spring Boot 3, Spring Data JPA, PostgreSQL | Owns civic business logic and relational domain tables. |
| **AI Service** | `backend/ai-service` | LLM processing, semantic vector search, recommendation pipelines | Python 3.11, FastAPI, Pydantic, pgvector | Stateless inference and semantic embeddings only. |
| **Quality & Tests** | `tests/` | Automated verification, TDD regression suites, API contract checks | Playwright, JUnit 5, PyTest | Must run and pass before any code merge. |

---

## 3. Agentic Workflow Guardrails & Responsibilities

```
+--------------------------------------------------------------------------------+
|                   CIRCULAR HUMAN APPROVAL FEEDBACK LOOP                        |
|                                                                                |
|      ┌───────────────────────── [ FEEDBACK / REVISION ] ───────────┐           |
|      ▼                                                             │           |
|  PM Agent (PRD) ──► Tech Arch Agent (Architecture) ──► [ HUMAN APPROVAL GATE ] |
|                                                                    │           |
|                                                         [APPROVED] │           |
+--------------------------------------------------------------------┼-----------+
                                                                     ▼
+--------------------------------------------------------------------------------+
|                        SPEC & TDD EXECUTION LOOP                               |
|   TL Agent (Specs) ---> QA Agent (Writes Failing Tests FIRST)                  |
|                   ---> FE/BE Agents (Write Code to Pass Tests)                 |
|                   ---> GitHub Agent (Creates PR Once Green ✅)                  |
+--------------------------------------------------------------------------------+
```

### Strict Agent Enforcement Rules:
1. **No Code Without Tests:** Application code (`frontend/`, `backend/`) cannot be written until QA automated tests exist in `tests/`.
2. **Lean Codebase Guarantee:** Do not generate speculative abstractions, placeholder wrappers, or dead code.
3. **Mandatory Post-Task Cleanup:** After every completed task, run `/graphify update .` and `/ponytail-review` to remove over-engineering.

---

## 4. Key Takeaways & Memory Aid

* **Key Takeaway 1:** Every microservice has strict boundary isolation — no cross-service direct database calls.
* **Key Takeaway 2:** All feature execution requires **PRD → Arch → Approval Gate → TDD Red → Code Green**.
* **Memory Aid:** **"Plan First, Test First, Code Lean."**
