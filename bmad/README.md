# BMAD Environment (`web-app = bmad`)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Quickstart and port reference for our fast-iteration BMAD Web App (`web-app = bmad`). |
| **📅 Last Updated** | 2026-07-19 |
| **🏷️ Status / Version** | Active SSOT / v1.0.0 |
| **👥 Owner / Worker** | `Worker/Who: [Tech Arch Agent | Antigravity (Gemini)]` |
| **🔗 Upstream / Dependencies** | [`bmad/AGENTIC_WORKFLOW_GUIDE.md`](file:///home/ap/git-repo/DJP-v1/bmad/AGENTIC_WORKFLOW_GUIDE.md), [`bmad/dashboard.md`](file:///home/ap/git-repo/DJP-v1/bmad/dashboard.md) |

---

`bmad/` (`web-app = bmad`) is our fast-iteration web development environment on the **`bmad` Git branch**, mirrored from `prototype/` (`web-app = prototype`).

## ⚡ Quickstart & Port Isolation Table

Always `cd` directly into the target subdirectory before running commands. Do **NOT** change assigned ports.

| Domain | Subdirectory | Target Port | Command to Run |
| :--- | :--- | :--- | :--- |
| **Backend** | `bmad/backend` | **Port `8082`** | `cd bmad/backend && ./mvnw spring-boot:run` |
| **Frontend** | `bmad/frontend` | **Port `5175`** (`proxies -> 8082`) | `cd bmad/frontend && npm run dev` |
| **QA Tests** | `bmad/tests` | Targets `localhost:8082` | `cd bmad/tests && node api-health.test.mjs` |

> [!IMPORTANT]
> **Full Agent Protocols & Architecture:** For our onboarding flowchart, Git strategy (`bmad` branch), and Reversible Cloud Save rules, see [`AGENTIC_WORKFLOW_GUIDE.md`](file:///home/ap/git-repo/DJP-v1/bmad/AGENTIC_WORKFLOW_GUIDE.md).
