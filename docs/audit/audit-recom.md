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


---

## 🟠 2. High Debt (Ready for Replenishment Queue)
*As Critical items are resolved and removed above ("one goes out"), auto-fetch the following items from `debt.md`:*


---

> [!TIP]
> **Queue Pull Rule:** When all items in Section 1 (Critical) are marked complete and moved to `audit-log.md`, automatically promote High Debt items from `debt.md` into Section 1 above to keep execution moving continuously.
