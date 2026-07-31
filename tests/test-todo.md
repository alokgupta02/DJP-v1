# DJP Prototype QA & Test Suite Task Tracker (`prototype/tests/test-todo.md`)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Single Source of Truth (SSOT) tracking verification checks for `web-app = prototype` (`port 5174/8081`). |
| **📅 Last Updated** | 2026-07-19 |
| **🏷️ Status / Version** | Active SSOT / v1.0.0 |
| **👥 Owner / Worker** | `Worker/Who: [QA Agent | Antigravity (Gemini)]` |
| **🔗 Upstream / Dependencies** | [`prototype/dashboard.md`](file:///home/ap/git-repo/DJP-v1/prototype/dashboard.md), [`prototype/todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/todo.md) |

---

## 🚀 Active Sprint & Executing Tasks

| Phase / Sprint | Task Description | Assigned Agent | Status |
| :--- | :--- | :--- | :--- |
| **Phase 2 — Multi-Route Verification** | Add verification tests for `Discussions` and `Polls` endpoints as they are introduced | **QA Agent** | 🟢 Aligned & Ready |

---

## 📋 Task Backlog & Archive Reference
- [x] Create automated API health check (`api-health.test.mjs`) verifying backend health and dev-login (`citizen@djp.org`) on port `8081`
- [ ] Create progressive automated test scripts (`tests/`) whenever new routes or endpoints are added during Phase 2

> [!NOTE]
> **Verification Command:** Run `cd prototype/tests && node api-health.test.mjs` to execute our health check suite.
