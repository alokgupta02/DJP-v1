# 📊 DJP Backend Technical Debt & Audit Recommendations (`be-audit-recom.md`)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Active execution backlog (SSOT) for picking up and resolving backend-specific architectural, security, and technical debt. |
| **📅 Last Updated** | 2026-07-19 |
| **🏷️ Status / Version** | `Active Execution Backlog (SSOT)` / `v1.0.0` |
| **👥 Owner / Worker** | `Worker/Who: [BE Agent | Model] / Principal Architect` |
| **🔗 Upstream / Dependencies** | [be-debt.md](./be-debt.md) *(Backend Debt Register)*, [be-audit-log.md](./be-audit-log.md) *(Resolution Ledger)*, [backend-design.md](./backend-design.md) |

---

## ⚙️ Autonomous Execution & Replenishment Loop (`Backend Domain`)

This file (`be-audit-recom.md`) is the **Single Source of Truth (SSOT)** for active backend technical debt execution:
1. **Pick & Execute:** Agents (`BE Agent`, `Tech Arch Agent`, `QA Agent`) pick items from this file **one by one** (starting from Critical Debt).
2. **Patch & Verify:** Execute the code/doc changes defined in `- **Changes required:**`, ensure failing tests pass (TDD), and run `graphify update .`.
3. **Log Resolution:** Record completed work in `be-audit-log.md` using the exact `Worker/Who: [Role | Model]` identity schema.
4. **Commit with Log Info:** Commit changes using the exact data/fields from `be-audit-log.md` (`Reversible Cloud Save`).
5. **Auto-Fetch Replenishment:** When an item is resolved and checked off/removed (`one goes out`), auto-fetch the next highest-priority item from `be-debt.md` (`auto fetches from be-debt.md`) into this file, then loop!

---

## 🔴 1. Critical Backend Debt (Active Blockers)
*Must resolve immediately to establish a functional, secure Spring Boot skeleton.*

### ARCH-001 — Microservices Architecture Documented vs. Monolith Implemented
* **Worker/Who:** Tech Arch Agent | Antigravity (Gemini), BE Agent | Antigravity (Gemini)
* **Severity:** 🔴 Critical
* **Changes required:** Docs & Code (`docs/architecture/backend/backend-techstack.md`, `backend/springboot/pom.xml`)
* **Why it matters:** Documentation describes 3 distinct microservices (`auth-service`, `core-service`, `ai-service`) while implementation is a single skeletal Spring Boot app.
* **Recommended action:** Adopt **Modular Monolith** (single deployable with strict package boundaries per domain) as Option B for MVP. Update `backend-techstack.md` and `system-boundaries.md` to formalize the modular monolith approach.

### ARCH-002 — Layered Package Structure 86% Missing
* **Worker/Who:** BE Agent | Antigravity (Gemini)
* **Severity:** 🔴 Critical
* **Changes required:** Code (`backend/springboot/src/main/java/com/djp/platform/...`)
* **Why it matters:** Only `model/` and `controller/` exist; missing `config/`, `dto/`, `exception/`, `repository/`, and `service/` packages leads to structural breakdown and architecture drift.
* **Recommended action:** Scaffold the required 7 domain package structures cleanly (`config/`, `controller/`, `dto/`, `exception/`, `model/`, `repository/`, `service/`).

### SEC-001 — Zero Authentication & Security Filter Chain
* **Worker/Who:** BE Agent | Antigravity (Gemini), Security Agent
* **Severity:** 🔴 Critical
* **Changes required:** Code (`backend/springboot/src/main/java/.../config/SecurityConfig.java`, `JwtTokenProvider.java`, `pom.xml`)
* **Why it matters:** Missing `SecurityFilterChain`, `JwtAuthenticationFilter`, and CORS configuration leaves all endpoints unprotected.
* **Recommended action:** Add `spring-boot-starter-security` and `spring-boot-starter-oauth2-client` dependencies, implement `SecurityConfig` with `SecurityFilterChain`, and add `JwtTokenProvider`.

### CFG-002 — Hardcoded Secret Default (`${SUPABASE_PASSWORD:secret-password}`)
* **Worker/Who:** BE Agent | Antigravity (Gemini)
* **Severity:** 🔴 Critical
* **Changes required:** Code (`backend/springboot/src/main/resources/application-supabase.yml`)
* **Why it matters:** Fallback default password (`secret-password`) is a major security vulnerability that could expose production credentials.
* **Recommended action:** Change to `password: ${SUPABASE_PASSWORD}` without any default fallback, failing fast at startup if environment variable is missing.

### DATA-001 — No Database Migration Strategy (`ddl-auto: update` in Code)
* **Worker/Who:** BE Agent | Antigravity (Gemini), Tech Arch Agent | Antigravity (Gemini)
* **Severity:** 🔴 Critical
* **Changes required:** Code (`backend/springboot/pom.xml`, `src/main/resources/db/migration/V1__init.sql`, `application.yml`)
* **Why it matters:** Relying on Hibernate `ddl-auto: update` causes unmanaged schema drift and risks production data loss.
* **Recommended action:** Add Flyway dependency (`flyway-core`), create initial baseline migration `V1__init.sql` based on `db-design.md`, and switch production profile to `ddl-auto: validate`.

---

## 🟠 2. High Priority Backend Debt
*Should be addressed right after critical structural blockers are cleared.*

### CFG-001 — Single `application.yml` Without Profile Separation
* **Worker/Who:** BE Agent | Antigravity (Gemini)
* **Severity:** 🟠 High
* **Changes required:** Code (`backend/springboot/src/main/resources/application-local.yml`, `application-prod.yml`)
* **Why it matters:** Lacking environment profile separation risks exposing H2 consoles and SQL debug logging in production environments.
* **Recommended action:** Split configurations into `application.yml` (shared defaults), `application-local.yml` (H2 enabled, show-sql), and `application-prod.yml` (PostgreSQL, validated DDL, structured JSON logs).

### DEP-001 — Missing Critical Starter Dependencies (`pom.xml`)
* **Worker/Who:** BE Agent | Antigravity (Gemini)
* **Severity:** 🟠 High
* **Changes required:** Code (`backend/springboot/pom.xml`)
* **Why it matters:** Missing `springdoc-openapi-starter-webmvc-ui` (OpenAPI/Swagger), `spring-boot-starter-actuator` (Actuator), `logstash-logback-encoder` (JSON logging), `resilience4j-spring-boot3` (Resilience4j), `validation`, and `lombok` blocks immediate Phase 1 API development and observability.
* **Recommended action:** Add these Phase 1 starters incrementally to `pom.xml` with proper version management, deferring heavy infrastructure (e.g., Flyway, OpenTelemetry, Bucket4j) until their modules are built.
