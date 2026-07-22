# 📊 **DJP Platform Technical Debt & Audit Recommendations (Execution Backlog)**

---

| Metadata | Value |
| :--- | :--- |
| **📅 Last Updated** | 2026-07-19 |
| **📌 Status** | `Active Execution Backlog (SSOT)` |
| **🏷️ Version** | `v1.1.0` |
| **👥 Owner** | `QA Lead / Principal Architect / AI Agents` |
| **🔗 Dependencies** | [debt.md](./debt.md) *(Audit SSOT)*, [overview.md](../architecture/overview.md), [backend-springboot-checklist.md](../architecture/backend-springboot-checklist.md) |

---

## ⚙️ Autonomous Execution & Replenishment Loop

This file (`audit-recom.md`) is the **Single Source of Truth (SSOT)** for active task execution.
1. **Pick & Execute:** Agents pick items from this file **one by one** (starting from Critical Debt).
2. **Patch & Verify:** Execute the code/doc changes defined in `- **Changes required:**`, ensure failing tests pass (TDD), and run `graphify update .`.
3. **Log Resolution:** Record completed work in `audit-log.md`.
4. **Commit with Log Info:** Commit changes using the exact data/fields from `audit-log.md` as the git commit message (`Reversible Cloud Save`).
5. **Auto-Fetch Replenishment & Next Loop:** When an item is resolved and removed (`one goes out`), auto-fetch the next highest-priority item from `debt.md` (`auto fetches from debt.md`) into this file, then loop!

---

## 🔴 1. Critical Debt (Active Blockers)
*Must resolve immediately before any production release or feature development.*

### IMPL-001 — Phase 1 Core Tasks — 0% Complete (6/6 Tasks Blocked)
* **Worker/Who:** BE Agent | Antigravity (Gemini), Tech Arch Agent | Antigravity (Gemini)
* **Severity:** 🔴 Critical
* **Changes required:** Code (`backend/springboot/src/.../config/`, `exception/`, `security/`)
* **Why it matters:** Every subsequent engineering phase (Issues, Discussions, Polls, AI) is completely blocked from entering production development until the Spring Boot foundation exists.
* **Recommended action:** Execute Phase 1 tasks sequentially using TDD Red/Green loops (`QA Agent` writing tests first, `BE Agent` implementing minimal code).

### DATA-001 — Missing Database Migration Engine (Flyway/Liquibase) vs Unsafe `ddl-auto: update`
* **Worker/Who:** BE Agent | Antigravity (Gemini), Tech Arch Agent | Antigravity (Gemini)
* **Severity:** 🔴 Critical
* **Changes required:** Code & Config (`backend/springboot/pom.xml`, `src/main/resources/db/migration/V1__init.sql`, `application-prod.yml`)
* **Why it matters:** Hibernate `ddl-auto: update` is non-deterministic across cluster nodes, drops/modifies columns unpredictably during refactors, and breaks audit traceability.
* **Recommended action:** Add `flyway-core` to `pom.xml`. Create `src/main/resources/db/migration/V1__init.sql` codifying all 14 `users` table columns and canonical schemas from `db-design.md`. Set `ddl-auto: validate` in `application-prod.yml`.

---

## 🟠 2. High Debt (Ready for Replenishment Queue)
*As Critical items are resolved and removed above ("one goes out"), auto-fetch the following items from `debt.md`:*

### SEC-002 — JWT Key & Rotation Strategy Undefined
* **Worker/Who:** Tech Arch Agent | Antigravity (Gemini), QA Agent | Nemotron
* **Severity:** 🟠 High
* **Changes required:** Code (`backend/springboot/src/main/java/.../security/`), Config (`application.yml`)

---

> [!TIP]
> **Queue Pull Rule:** When all items in Section 1 (Critical) are marked complete and moved to `audit-log.md`, automatically promote High Debt items from `debt.md` into Section 1 above to keep execution moving continuously.
