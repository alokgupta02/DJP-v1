# DJP BMAD QA & Test Suite Task Tracker (`bmad/tests/test-todo.md`)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Single Source of Truth (SSOT) tracking verification checks for `web-app = bmad` (`port 5175/8082`). |
| **📅 Last Updated** | 2026-07-19 |
| **🏷️ Status / Version** | Active SSOT / v1.0.0 |
| **👥 Owner / Worker** | `Worker/Who: [QA Agent | Antigravity (Gemini)]` |
| **🔗 Upstream / Dependencies** | [`bmad/dashboard.md`](file:///home/ap/git-repo/DJP-v1/bmad/dashboard.md), [`bmad/todo.md`](file:///home/ap/git-repo/DJP-v1/bmad/todo.md) |

---

## 🚀 Active Sprint & Executing Tasks

| Phase / Sprint | Task Description | Assigned Agent | Status |
| :--- | :--- | :--- | :--- |
| **Phase 2 — Multi-Route Verification** | Add verification tests for `Discussions` and `Polls` endpoints as they are introduced | **QA Agent** | 🟢 Aligned & Ready |

---

## 📋 Task Backlog & Archive Reference
- [x] Create automated API health check (`api-health.test.mjs`) verifying backend health and dev-login (`citizen@djp.org`) on port `8082`
- [ ] Create progressive automated test scripts (`tests/`) whenever new routes or endpoints are added during Phase 2

> [!NOTE]
> **Verification Command:** Run `cd bmad/tests && node api-health.test.mjs` to execute our health check suite.
