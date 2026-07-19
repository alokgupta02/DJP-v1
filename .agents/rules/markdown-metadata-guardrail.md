---
trigger: always_on
description: Mandates standardized front metadata header table and content schemas for all new and specialized Markdown (.md) files created across the repository.
---

# Universal Markdown Metadata & Structural Guardrail

Whenever any **AI Agent** (`PM`, `Tech Arch`, `TL`, `QA`, `FE`, `BE`, `GitHub & CI/CD`) or **Human Developer** creates a new Markdown (`.md`) file anywhere in the repository (`docs/`, `architecture/`, `execution/`, etc.), the file MUST adhere to two mandatory layers of structural uniformity:
1. **Universal Front Metadata Header Table** (required on *every* `.md` file).
2. **Standardized Content Schemas for Specialized File Types** (required when creating or auditing specific file types like `*-debt.md`, `*-audit-recom.md`, `*-audit-log.md`).

---

## 1. 📋 Universal Front Metadata Header Schema (`All .md Files`)

Every newly created `.md` file must start with the following standardized header table right below the document title block (`# Title`) and top divider (`---`):

```markdown
# [Document Title]

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Brief description of what this document defines, tracks, or executes. |
| **📅 Last Updated** | `YYYY-MM-DD` |
| **🏷️ Status / Version** | e.g. `Active SSOT` / `Draft` / `v1.0.0` |
| **👥 Owner / Worker** | `Worker/Who: [Role | Model]` (if created by agent) or `Human Engineering Team` |
| **🔗 Upstream / Dependencies** | Links to related SSOTs, architecture specs, or tickets (`[link](./path.md)`) |

---

## [Document Body...]
```

### ⚠️ Special Rule for Agent Skills & Rules Files (`.agents/skills/` & `.agents/rules/`)
If the `.md` file is an agent skill or rule definition under `.agents/`, it MUST ALSO include the required YAML frontmatter (`---` block with `name` / `description` or `trigger`) at the very top of the file before the `# Title` and Front Metadata Header Table.

---

## 2. 🏗️ Standardized Schemas for Specialized File Types

In addition to the Universal Front Metadata Header Table above, specialized files must follow the exact structural templates defined below.

### A. Canonical Technical Debt Registers (`<type>-debt.md`)
*Examples: `docs/audit/debt.md`, `docs/architecture/backend/be-debt.md`, `docs/architecture/frontend/fe-debt.md`, `docs/architecture/qa/qa-debt.md`*

Whenever auditing or creating a debt register for any domain, the document must contain:
1. **Executive Summary Table:** High-level scorecard summarizing architectural conformance, implementation completeness, TDD compliance, security posture, and overall verdict.
2. **Category Sections:** Group findings logically by domain area (e.g., `Category 1: Architecture & Structural Debt`, `Category 2: Implementation Completeness`, `Category 3: Security & Auth Debt`, `Category 4: Configuration & Environment Debt`).
3. **Standardized Debt Item Schema:** Every individual debt item MUST be formatted as an explicit comparison table right below its heading:

```markdown
### [TYPE]-[NUM]: [Clear Descriptive Title e.g., ARCH-001: Monolith Implemented Instead of Microservices]
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical | 🟠 High | 🟡 Medium |
| **Found By** | `[Role e.g., Tech Arch Agent | Model e.g., Antigravity (Gemini)]` |
| **Docs Say / Spec** | Exact reference to what documentation/architecture requires (`path.md:line-num`). |
| **Impl Reality** | Current actual state in the codebase (`path/to/File.java:line-num`). |
| **Impact / Risk** | Technical, security, or architectural consequence of the drift. |
| **Remediation Action** | Concrete, surgical engineering steps required to resolve the debt. |
| **Estimated Effort** | Time / complexity estimate (`e.g., 2 hours`, `1 day`). |
```

---

### B. Active Execution Backlogs (`<type>-audit-recom.md`)
*Examples: `docs/audit/audit-recom.md`, `docs/architecture/backend/be-audit-recom.md`, `docs/architecture/frontend/fe-audit-recom.md`*

Every domain recommendations file acts as the **Active Pickup Queue (`SSOT`)** auto-fetching from its canonical `<type>-debt.md` register. Every item MUST follow this exact schema:

```markdown
### [TYPE]-[NUM] — [Clear Descriptive Title]
* **Worker/Who:** [Role e.g., Tech Arch Agent | Model e.g., Antigravity (Gemini)]
* **Severity:** 🔴 Critical | 🟠 High | 🟡 Medium
* **Changes required:** Code & Docs (`[Exact file paths to modify or create e.g., backend/springboot/.../Config.java]`)
* **Why it matters:** Concise explanation of the technical risk or architectural blocker.
* **Recommended action:** Surgical implementation steps required to pass QA tests and clear the debt.
```

* **Replenishment Rule:** When an agent resolves and removes an item from `*-audit-recom.md` (`one goes out`), they immediately auto-fetch the next highest-priority item from the corresponding `*-debt.md` register into this backlog (`auto fetches from debt.md`).

---

### C. Historical Resolution Ledgers (`<type>-audit-log.md`)
*Examples: `docs/audit/audit-log.md`, `docs/architecture/backend/be-audit-log.md`, `docs/architecture/frontend/fe-audit-log.md`*

Every domain audit log serves as the permanent ledger of completed resolutions. Before creating a git commit (`Reversible Cloud Save`), agents MUST append their completed task entry formatted exactly as:

```markdown
### [RESOLVED] ID: [Item ID e.g., ARCH-001] — [Item Title]
* **📅 Resolution Date:** YYYY-MM-DD HH:MM UTC
* **Found By:** [Role e.g., Tech Arch Agent | Model e.g., Antigravity (Gemini)]
* **🛠️ Resolved By Worker/Who:** [Role e.g., BE Agent | Model e.g., Antigravity (Gemini)]
* **Severity:** 🔴 Critical | 🟠 High | 🟡 Medium
* **📂 Files Modified / Created:**
  * `[MODIFY] path/to/modified/file.ext`
  * `[NEW] path/to/new/file.ext`
* **📝 Resolution Summary:**
  * Concise technical summary of the fix or architectural implementation applied.
* **✅ Quality Gate & Verification Checklist:**
  * `[x]` TDD Automated Tests Written & Passing (`command executed: e.g., mvn test`)
  * `[x]` Graphify AST Graph Updated (`command executed: graphify update .`)
  * `[x]` Lean Codebase / Over-Engineering Check Passed (`no boilerplate or dead code created`)
* **🔗 Git Commit / PR Reference:** `[Commit Hash e.g., abc1234 or PR #12]`
```

---

## 3. 🚀 Future Format Extensibility (`Continuous Guardrail Growth`)

> [!IMPORTANT]
> **Living Guardrail Protocol:** As our monorepo evolves and new specialized markdown file types emerge (e.g., `*-design.md`, `*-specs.md`, `*-test-plan.md`, `*-todo.md`, `*-postmortem.md`), any AI agent or human developer introducing a new canonical document pattern **MUST append its standardized content format section directly to this guardrail (`markdown-metadata-guardrail.md`)**.
> 
> This guarantees that all future domain files (`frontend/`, `backend/`, `tests/`, `docs/`) remain 100% structurally consistent across the entire project lifecycle!
