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

### TECH-003 — AuthController Is a Stub (No JWT/OAuth wiring)
* **Worker/Who:** Tech Arch Agent | Antigravity (Gemini), QA Agent | Nemotron
* **Severity:** 🔴 Critical
* **Changes required:** Code (`backend/springboot/src/main/java/.../controller/AuthController.java`, `security/`)
* **Why it matters:** Core authentication does not function; controller stubs return static mock strings.
* **Recommended action:** Integrate `spring-boot-starter-security`, configure OAuth2 resource server, and wire a `JwtTokenProvider`.

### DOC-002 — No Developer Onboarding / Environment Guide
* **Worker/Who:** Tech Arch Agent | Antigravity (Gemini), QA Agent | Nemotron
* **Severity:** 🔴 Critical
* **Changes required:** Doc (`developer-setup.md`, `backend/springboot/.env.example`, `frontend/.env.example`)
* **Why it matters:** Missing installation setups, prerequisite checks, and environment templates (`.env.example`) block new developers and agents.
* **Recommended action:** Create `developer-setup.md` and explicit `.env.example` templates across all subprojects.

### GOV-001 — No Legal / Party Registration (ECI) Structure
* **Worker/Who:** Tech Arch Agent | Antigravity (Gemini)
* **Severity:** 🔴 Critical
* **Changes required:** Doc (`docs/legal/registration-and-compliance.md`), Vision (`docs/vision/party-vision.md`)
* **Why it matters:** Operating a civic/political party platform without Election Commission of India (ECI) compliance pathways creates severe regulatory liabilities.
* **Recommended action:** Create `docs/legal/registration-and-compliance.md` outlining legal entity status and ECI compliance roadmap.

### GOV-002 — No Data Privacy Policy (DPDPA/GDPR Compliance)
* **Worker/Who:** Tech Arch Agent | Antigravity (Gemini)
* **Severity:** 🔴 Critical
* **Changes required:** Doc (`docs/legal/data-privacy.md`), Backend (`backend/springboot/src/main/java/.../User.java`)
* **Why it matters:** Collecting citizen geographic location and political activity without data minimization or consent checks violates India's DPDPA 2023.
* **Recommended action:** Create `docs/legal/data-privacy.md` establishing consent workflows, data minimization policies, and right-to-be-forgotten deletion.

---

## 🟠 2. High Debt (Ready for Replenishment Queue)
*As Critical items are resolved and removed above ("one goes out"), auto-fetch the following items from `debt.md`:*

### SEC-001 — No OWASP / Security Review Process
* **Worker/Who:** Tech Arch Agent | Antigravity (Gemini), QA Agent | Nemotron
* **Severity:** 🟠 High
* **Changes required:** CI/CD (`.github/workflows/dependency-check.yml`, `.github/dependabot.yml`)

### SEC-002 — JWT Key & Rotation Strategy Undefined
* **Worker/Who:** Tech Arch Agent | Antigravity (Gemini), QA Agent | Nemotron
* **Severity:** 🟠 High
* **Changes required:** Code (`backend/springboot/src/main/java/.../security/`), Config (`application.yml`)

### SEC-003 — Missing Circuit Breakers and Retries (`Resilience4j`)
* **Worker/Who:** QA Agent | Nemotron
* **Severity:** 🟠 High
* **Changes required:** Code (`backend/springboot/pom.xml`, `src/main/java/.../resilience/`)

### TECH-004 — Missing 7 Critical Maven Dependencies
* **Worker/Who:** Tech Arch Agent | Antigravity (Gemini), QA Agent | Nemotron
* **Severity:** 🟠 High
* **Changes required:** Code (`backend/springboot/pom.xml`, `src/main/resources/application.yml`)

### TECH-006 — Missing Internal Layered Architecture (`DTO`, `Service`, `Exception`)
* **Worker/Who:** QA Agent | Nemotron
* **Severity:** 🟠 High
* **Changes required:** Code (`backend/springboot/src/main/java/.../dto/`, `service/`, `exception/GlobalExceptionHandler.java`)

### DEVOPS-001 — No Backend Production Dockerfile
* **Worker/Who:** Tech Arch Agent | Antigravity (Gemini), QA Agent | Nemotron
* **Severity:** 🟠 High
* **Changes required:** DevOps (`backend/springboot/Dockerfile`, `.dockerignore`)

---

> [!TIP]
> **Queue Pull Rule:** When all items in Section 1 (Critical) are marked complete and moved to `audit-log.md`, automatically promote High Debt items from `debt.md` into Section 1 above to keep execution moving continuously.
