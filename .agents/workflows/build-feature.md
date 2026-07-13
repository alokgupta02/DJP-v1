# Build Feature (Master End-to-End Pipeline)

**Command:** `/build-feature`
**Description:** Orchestrates the complete end-to-end multi-agent pipeline from user intake to a working application and Pull Request.

---

## 🤖 Instructions for the Agent

When the user triggers `/build-feature`, you must act as the ultimate Orchestrator and execute the following end-to-end relay exactly in this sequence. You will embody different agent roles (`PM Agent`, `Tech Arch Agent`, `TL Agent`, `QA Agent`, `FE/BE Agents`, `GitHub Agent`) sequentially to complete the delivery.

Do NOT skip any steps or human approval gates. Ensure `docs/execution/<feature>/` is used as the directory for output artifacts.

---

### Step 1: 👑 PM Agent (Scope & Requirements)
1. Read the user's active 1-2 line request in the `📥 Active User Request` section of `/todo.md`.
2. Analyze the request, classify target domains (`FE`/`BE`/`QA`), and formulate clarifying questions if ambiguous.
3. Write `docs/execution/<feature>/PRD.md` containing the problem statement, user stories, acceptance criteria, and non-goals.
4. **Pause.**

### Step 2: 🏛️ Tech Arch Agent (Architecture)
1. Query the existing codebase graph via `graphify query`.
2. Based on `PRD.md`, write `docs/execution/<feature>/architecture.md` defining system boundaries, data models, and sequence flow.
3. **🛑 STOP.** Ask the user: *"Please review the PRD and Architecture. Type 'Approve' to proceed to specification and TDD."* Wait for explicit human approval before continuing.

### Step 3: 🧭 TL Agent (Surgical Specification)
1. Once approved, translate `architecture.md` into surgical file-by-file modification steps in `docs/execution/<feature>/specs.md`.
2. Explicitly specify exact `[MODIFY]`, `[NEW]`, and `[DELETE]` file targets with precise method signatures.

### Step 4: 🧪 QA Agent (TDD Red Phase)
1. Read `specs.md`.
2. Create `docs/execution/<feature>/qa-test-plan.md`.
3. Write automated tests in the `tests/` directory *before* any feature code is written.
4. Attempt to run the tests to verify they fail cleanly (Red Phase).

### Step 5: 🎨 / ⚙️ FE & BE Agents (TDD Green Phase)
1. Read the failing tests and `specs.md`.
2. Write the **minimal possible** application code in `frontend/` and `backend/` required to make the tests pass.
3. Obey the `Lean Codebase Guardrail`: always modify existing files first; no speculative code.
4. Run the QA tests. If they fail, retry (max 3 times) until passing green ✅.
5. **🛑 STOP.** Ask the user: *"The QA tests are passing. Please verify the working application. Type 'Approve' to proceed to Audit & PR."* Wait for explicit human approval.

### Step 6: 🐙 GitHub Agent (Audit & PR)
1. Run `graphify update .` to sync the AST graph.
2. Run `/ponytail-review` (or simulate a Ponytail review) on the diff to ensure zero over-engineering. Delete any unneeded complexity found.
3. Generate a semantic git commit for all changes.
4. Raise a GitHub Pull Request with the body linking to the execution documentation.
5. Move completed items to `archive/todo.md`.

---
**End of Workflow.** Report final success to the user!
