# 🚀 DJP Execution Hub (`docs/execution/`)

> **Purpose:** Dedicated directory for all active feature execution Markdown files created by autonomous agents. Every feature being built gets its own subdirectory containing all execution documentation.

> **CRITICAL RULE:** For any feature being built, `docs/execution/<feature-name>/todo.md` is the **Single Source of Truth (SSOT)**. Every agent reads it for instructions and marks progress immediately.

---

## 1. Feature Folder Structure

When executing a feature task from root `todo.md` (e.g., `oauth-login`), create a subfolder: `docs/execution/<feature-name>/` containing:

```text
docs/execution/<feature-name>/
├── todo.md             # ⭐ SINGLE SOURCE OF TRUTH (SSOT) for feature execution
├── PRD.md              # Written by PM Agent
├── architecture.md     # Written by Tech Arch Agent
├── specs.md            # Written by TL Agent
├── qa-test-plan.md     # Written by QA Agent
├── api-contract.md     # Written by BE Agent (REST routes, DTOs, DB schema delta)
└── ui-components.md    # Written by FE Agent (Component tree, routes, state mapping)
```

---

## 2. Agent Execution Workflow in This Folder

```
[ PM Agent ] ─────────► writes docs/execution/<feature>/PRD.md
                              │
[ Tech Arch Agent ] ──► writes docs/execution/<feature>/architecture.md
                              │
                  [ HUMAN APPROVAL GATE ]
                              │
[ TL Agent ] ─────────► writes docs/execution/<feature>/specs.md
                              │
[ QA Agent ] ─────────► writes docs/execution/<feature>/qa-test-plan.md & tests/
                              │
[ BE Agent ] ─────────► writes docs/execution/<feature>/api-contract.md & app code
                              │
[ FE Agent ] ─────────► writes docs/execution/<feature>/ui-components.md & app code
```

---

## 3. Key Takeaways & Memory Aid

* **Key Takeaway:** All feature execution Markdown files live together under `docs/execution/<feature-name>/`.
* **Memory Aid:** **"One Feature → One Folder → Full Execution Trail."**
