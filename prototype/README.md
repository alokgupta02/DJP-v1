# DJP Prototype Workspace

This directory is the playground and staging area to build and test the **DJP Prototype App**. 

---

## 🚀 Tech Stack

- **Frontend:** React 18 (Vite, TypeScript, Tailwind CSS)
- **Backend:** Java 21 & Spring Boot 3.x (H2 Embedded Database)
- **Tests:** Automated validation check suites

---

## 💡 Core Philosophy: Reuse & Anti-Over-Engineering

> [!IMPORTANT]
> The primary objective of the prototype is **speed and simplicity**.
> To prevent over-engineering and duplication:
> 1. **Reference the main production code first:** Before writing new pages, components, repositories, or controllers, check the root `/frontend` and `/backend` directories.
> 2. **Copy and adapt:** Directly copy the existing modules, styling layouts, database entities, and mock scripts from the production folders into `prototype/frontend` and `prototype/backend` as needed.

---

## 🤖 Agentic State & Workspace Files

An agent working inside `/prototype` is constrained by the local operational environment:

- **[.djp_identity.md](file:///home/ap/git-repo/DJP-v1/prototype/.djp_identity.md):** Defines profile, goals, and stack constraints for the prototype agent.
- **[.djp_rules.md](file:///home/ap/git-repo/DJP-v1/prototype/.djp_rules.md):** Operational guardrails that strictly limit edits to the `/prototype` directory.
- **[.djp_state.md](file:///home/ap/git-repo/DJP-v1/prototype/.djp_state.md):** Active session metrics and sprint tracking.
- **[AGENTIC_WORKFLOW_GUIDE.md](file:///home/ap/git-repo/DJP-v1/prototype/AGENTIC_WORKFLOW_GUIDE.md):** Detailed agent lifecycle checklist and workflow instructions.

---

## 📋 Task & Dashboard Ecosystem

Use these local files to drive feature development:

1. **[todo.md](file:///home/ap/git-repo/DJP-v1/prototype/todo.md) (User Intake):** Write your 1–2 line task requests here.
2. **[dashboard.md](file:///home/ap/git-repo/DJP-v1/prototype/dashboard.md) (Dashboard):** Aggregates sprint status.
3. **Domain Task Sheets:**
   - Frontend: [`prototype/frontend/fe-todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/frontend/fe-todo.md)
   - Backend: [`prototype/backend/be-todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/backend/be-todo.md)
   - Tests: [`prototype/tests/test-todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/tests/test-todo.md)
4. **[archive/archive-todo.md](file:///home/ap/git-repo/DJP-v1/prototype/archive/archive-todo.md):** History of completed items.

---

## 💻 Running Staging Dev Servers

When developing inside the prototype workspace, run the local dev servers on independent ports to prevent port conflicts with production:

```bash
# 1. Start Staging Frontend (Vite)
cd prototype/frontend
npm run dev

# 2. Start Staging Backend (Spring Boot + H2)
cd prototype/backend
./mvnw spring-boot:run
```

---

## 🔄 The Staging to Production Loop (Porting Logic)

When a feature is proven and ready for production, follow this flow:

```
[ Build & Test in Proto ] ──► [ Strip Mock Logic & Hacks ] ──► [ Port into Production Layers ]
```

1. **Audit:** Identify exactly which components, classes, and SQL updates in the prototype represent the core feature.
2. **Refactor:** Strip prototype-specific helpers and temporary logging from the ported code.
3. **Integrate:** Copy the clean code into the main `/frontend` and `/backend` monorepo packages.
4. **Update AST Graph:** Run `graphify update .` in the root folder to update the production code graph.

---

## 🔍 Local Graph Analysis

A local code dependency graph is maintained for this workspace. To rebuild/sync the AST graph after editing files, run:

```bash
cd prototype && graphify update .
```

The resulting report is located at [`prototype/graphify-out/GRAPH_REPORT.md`](file:///home/ap/git-repo/DJP-v1/prototype/graphify-out/GRAPH_REPORT.md).