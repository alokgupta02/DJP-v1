# Definition of Done (DoD)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Standardized quality gate checklist to verify all developer and agent tasks before code merge. |
| **📅 Last Updated** | 2026-07-19 |
| **🏷️ Status / Version** | Active SSOT |
| **👥 Owner / Worker** | `Worker/Who: [TL Agent | Antigravity (Gemini)]` |
| **🔗 Upstream / Dependencies** | [AGENTS.md](../../.agents/AGENTS.md), [markdown-metadata-guardrail.md](../../.agents/rules/markdown-metadata-guardrail.md) |

---

## 📋 Definition of Done Checklist

Every code modification, feature addition, or bugfix must satisfy the following checklist before it is considered finished:

### 1. Functional Verification
- [ ] Code compiles without errors or warnings.
- [ ] No regression of existing features.
- [ ] Manual verification passes (UI verification, browser screenshots, API response verification).

### 2. Test-Driven Development (TDD) Compliance
- [ ] Automated tests are written and fail first (`Red Phase`).
- [ ] Implementation minimal code is written until all tests pass (`Green Phase`).
- [ ] Backend services have >80% code coverage.
- [ ] Critical auth filters and security paths have 100% code coverage.

### 3. Code Quality & Standards
- [ ] Follows existing naming conventions and style guides.
- [ ] No hardcoded secrets, database credentials, or default credentials fallback.
- [ ] CORS is restricted to trusted origins (no wildcard `*` allowed).
- [ ] Global exception handling is utilized to avoid raw stack trace leakage.
- [ ] Input data validation (`@Valid` / Bean validation) is applied to all incoming DTO payloads.

### 4. Cleanup & Optimization
- [ ] Dead code, unused imports, duplicate logic, and obsolete wrappers are deleted.
- [ ] No speculative implementation or placeholder files are left in the repository.

### 5. Repository & Documentation Synchronization
- [ ] Relevant documentation (Sitemap, specs, architecture, user guides) is updated.
- [ ] Graphify AST graph is updated by running `graphify update .`.
- [ ] Task state in `todo.md` is updated.
- [ ] Technical debt register `debt.md` is updated.
- [ ] Historical audit ledger `audit-log.md` is updated.
- [ ] Git commit uses exact resolution entry metadata as log description (`Reversible Cloud Save`).
