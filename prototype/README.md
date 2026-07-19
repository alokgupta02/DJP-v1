# Prototype Environment (`web-app = prototype`)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Quickstart and port reference for our bare-minimum Prototype Web App (`web-app = prototype`). |
| **📅 Last Updated** | 2026-07-19 |
| **🏷️ Status / Version** | Active SSOT / v1.0.0 |
| **👥 Owner / Worker** | `Worker/Who: [Tech Arch Agent | Antigravity (Gemini)]` |
| **🔗 Upstream / Dependencies** | [`prototype/AGENTIC_WORKFLOW_GUIDE.md`](file:///home/ap/git-repo/DJP-v1/prototype/AGENTIC_WORKFLOW_GUIDE.md), [`prototype/dashboard.md`](file:///home/ap/git-repo/DJP-v1/prototype/dashboard.md) |

---

`prototype/` (`web-app = prototype`) is our fast-iteration experimental web baseline on the **`base` Git branch**, operating alongside `bmad/` (`web-app = bmad`) and root-level `/mobile/` (`mobile = android/flutter`).

## ⚡ Quickstart & Port Isolation Table

Always `cd` directly into the target subdirectory before running commands. Do **NOT** change assigned ports.

| Domain | Subdirectory | Target Port | Command to Run |
| :--- | :--- | :--- | :--- |
| **Backend** | `prototype/backend` | **Port `8081`** | `cd prototype/backend && ./mvnw spring-boot:run` |
| **Frontend** | `prototype/frontend` | **Port `5174`** (`proxies -> 8081`) | `cd prototype/frontend && npm run dev` |
| **QA Tests** | `prototype/tests` | Targets `localhost:8081` | `cd prototype/tests && node api-health.test.mjs` |

> [!IMPORTANT]
> **Full Agent Protocols & Architecture:** For our onboarding flowchart, Git strategy (`base` vs `bmad`), and Reversible Cloud Save rules, see [`AGENTIC_WORKFLOW_GUIDE.md`](file:///home/ap/git-repo/DJP-v1/prototype/AGENTIC_WORKFLOW_GUIDE.md).