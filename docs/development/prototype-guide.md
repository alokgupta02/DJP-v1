# 🧪 **Prototype Staging & Playground Guide**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Reference guide for developing, testing, and porting changes inside the isolated `/prototype` workspace |
| **👥 Audience** | Developers, System Architects, AI Agents |
| **📌 Status** | `Stable` |

---

## 🌟 Philosophy: Speed & Anti-Over-Engineering

The `/prototype` workspace is a **playground** designed for rapid prototyping and validation of features. Speed is prioritized over complex architectures.

> [!IMPORTANT]
> **Prototype Boundary Rules:**
> 1. **Do Not Duplicate from Scratch:** Always inspect the production `/frontend` and `/backend` directories first.
> 2. **Copy and Adapt:** Directly copy existing components, services, or entities from production into the `/prototype` folder to save time.
> 3. **Clean Up Before Porting:** When moving successful prototype logic to production, strip away prototype-specific mock data, hacks, and logs.

---

## 🚦 Local Agent Sandbox Rules

AI Agents executing tasks inside the `/prototype` folder are bound by strict sandbox boundaries defined in `prototype/.djp_rules.md`.

```
                  ┌──────────────────────┐
                  │ Root DJPv1 Workspace │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ /prototype Sandbox   │
                  │ (Local Agent Intake) │
                  └──────────┬───────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
   [ prototype/todo.md ]             [ prototype/.djp_rules.md ]
   (Tracks staging task checklist)   (Prevents edits outside sandbox)
```

* **Intake Portal:** Staging tasks are written to [prototype/todo.md](file:///home/ap/git-repo/DJP-v1/prototype/todo.md) rather than the root `todo.md`.
* **Constraint:** Agents running in this context are strictly prohibited from writing or editing files outside the `/prototype/` directory.

---

## 📂 Staging Directories

The workspace structure replicates the production hierarchy but acts independently:

| Path | Purpose | Key Files |
| :--- | :--- | :--- |
| **`prototype/frontend/`** | React + Vite UI Staging | `fe-todo.md` |
| **`prototype/backend/`** | Spring Boot + H2 Backend Staging | `be-todo.md` |
| **`prototype/tests/`** | Staging automated tests | `test-todo.md` |
| **`prototype/graphify-out/`**| AST Code Graph of the Prototype | `GRAPH_REPORT.md` |

---

## 💻 Running Staging Dev Servers

When developing inside the prototype, run the local dev servers on independent ports to prevent port conflicts with production:

```bash
# 1. Start Staging Frontend (Vite)
cd prototype/frontend
npm run dev

# 2. Start Staging Backend (Spring Boot + H2)
cd prototype/backend
./mvnw spring-boot:run
```

---

## 🔄 The Staging to Production Loop

When a feature is proven and ready for production, follow this flow:

```
[ Build & Test in Proto ] ──► [ Strip Mock Logic & Hacks ] ──► [ Port into Production Layers ]
```

1. **Audit:** Identify exactly which components, classes, and sql updates in the prototype represent the core feature.
2. **Refactor:** Strip prototype-specific helpers and temporary logging from the ported code.
3. **Integrate:** Copy the clean code into the main `/frontend` and `/backend` monorepo packages.
4. **Update AST Graph:** Run `graphify update .` in the root folder to update the production code graph.

---

## 📚 Related Documentation

* **[Frontend Guide](../architecture/frontend.md)** — Main production frontend specs
* **[Backend Design](../architecture/backend-design.md)** — Production Spring Boot database & endpoints
* **[Sitemap](../README.md)** — Master documentation index
