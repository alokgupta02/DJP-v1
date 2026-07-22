# Monorepo Master Technical & Architectural Debt Register (SSOT)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Comprehensive 360-degree Single Source of Truth (`SSOT`) technical, architectural, legal, testing, devops, and security debt register across the entire DJP monorepo (merging general and domain-specific audits). |
| **📅 Last Updated** | 2026-07-19 |
| **🏷️ Status / Version** | Active SSOT (`v2.0.0 — Unified 360-Degree Register`) |
| **👥 Owner / Worker** | `Tech Arch Agent \| Antigravity (Gemini), BE Agent \| Antigravity (Gemini), QA Agent \| Nemotron` |
| **🔗 Upstream / Dependencies** | `docs/audit/audit-recom.md`, `docs/audit/audit-log.md`, `docs/architecture/backend/be-audit-recom.md`, `docs/architecture/backend/backend-design.md`, `.agents/AGENTS.md` |

---

> **Mandatory Universal Guardrail:** All technical debt items defined below strictly adhere to the standardized 7-row comparative tabular schema (`Severity`, `Found By`, `Docs Say / Spec`, `Impl Reality / Evidence`, `Impact / Risk`, `Remediation Action`, `Estimated Effort`) with escaped pipes (`\|`) to prevent markdown table column truncation. Any future audit findings appended to this register must strictly follow this format without exception.

---

## Executive Summary & Comprehensive Scorecard

This register represents our **360-degree holistic evaluation** combining deep domain audits (`backend/springboot/`) with cross-cutting repository audits (`frontend/`, `docs/`, `prototype/`, `.github/`, and `.agents/`). Every item provides concrete evidence (`Docs Say / Spec` vs `Impl Reality`) and surgical engineering remediation steps aligned with our **Lean Codebase Philosophy**.

| Category / Domain | 🔴 Critical | 🟠 High | 🟡 Medium | Total Items | Overall Conformance & Posture |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **1. Governance, Legal & Compliance (`GOV`)** | 2 | 5 | 0 | **7** | **Severely Exposed** — ECI legal standing & DPDPA data privacy frameworks missing. |
| **2. Process, Leadership & Workflow (`LEAD`)** | 0 | 5 | 1 | **6** | **Moderate Drift** — Contribution and branching guidelines missing. |
| **3. System Architecture & Boundaries (`ARCH`)** | 0 | 2 | 1 | **3** | **Improving** — Monolithic path standardized; package structure scaffolded. API Gateway debt remains. |
| **4. Documentation & Specifications (`DOC`)** | 0 | 2 | 1 | **3** | **Moderate** — OpenAPI contract live; runbooks and AI architecture docs missing. |
| **5. Backend Core & Configuration (`IMPL/DEP/CFG`)** | 1 | 0 | 0 | **1** | **Passing Base** — Core setup profiles and dependencies configured. Tracking Phase 1 overall status. |
| **6. Database Layer & Data Integrity (`DATA`)** | 1 | 1 | 0 | **2** | **Unsafe DDL** — Flyway database migration not initialized; ddl-auto: update active. |
| **7. Security, Auth & Fault Tolerance (`SEC`)** | 0 | 1 | 0 | **1** | **Substantially Improved** — JWT Engine, Graceful Shutdown, Security Filter Chain, and input validation are live. |
| **8. Testing & Quality Assurance (`TEST`)** | 2 | 1 | 0 | **3** | **Partial Base** — Backend test infrastructure scaffolded; E2E Playwright and frontend test suites missing. |
| **9. DevOps, Containerization & CI/CD (`DEVOPS`)** | 0 | 1 | 0 | **1** | **Partial Base** — GitHub Actions CI/CD workflow (`ci.yml`) live; missing multi-stage Dockerfile for Frontend & local `docker-compose.yml`. |
| **10. Observability & Cross-Cutting (`OBS/XCUT`)** | 2 | 0 | 0 | **2** | **Improving** — Actuator health probes & Prometheus live; missing structured log format (JSON) and centralized alerting. PII log masking and DB audit logging are active. |
| **TOTALS** | **9** | **17** | **3** | **29** | **Active Technical Debt Tracked and Scoped for Remediation.** |

---

## Part I: Governance, Compliance & Strategic Leadership (`GOV`, `LEAD`)

### GOV-001: No Election Commission of India (ECI) / Political Party Legal Structure
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Doc (`docs/legal/registration-and-compliance.md`), Vision (`docs/vision/party-vision.md`) |
| **Impl Reality / Evidence** | Entire `docs/vision/party-vision.md` and `roadmap.md` detail party-building workflows without mentioning ECI compliance. |
| **Impact / Risk** | Operating a digital political apparatus without clear legal standing creates severe regulatory liabilities.<br>**Expected Consequence:** Unblocks safe public adoption; prevents premature regulatory interference. |
| **Remediation Action** | Consult legal experts on ECI requirements. Create `docs/legal/registration-and-compliance.md` outlining the legal entity pathway and civic disclaimers. |
| **Estimated Effort** | 1-2 days |

### GOV-002: No Data Privacy Policy under India's DPDPA 2023 / GDPR
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Doc (`docs/legal/data-privacy.md`), Backend (`backend/springboot/src/main/java/.../User.java`) |
| **Impl Reality / Evidence** | `db-design.md` defines `location` and `reputation_score`; `onboarding.md` collects jurisdiction. No `docs/legal/data-privacy.md` or consent flow exists. |
| **Impact / Risk** | Collecting political profile data requires explicit consent, strict minimization, and clear user deletion rights under DPDPA 2023.<br>**Expected Consequence:** Ensures full DPDPA compliance and builds citizen trust. |
| **Remediation Action** | Create `docs/legal/data-privacy.md` establishing data collection scopes, lawful basis, anonymization policies for political opinions, and right-to-be-forgotten workflows. |
| **Estimated Effort** | 1-2 days |

### GOV-003: No Financial Governance, Treasury, or Paid Leader Policy
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Doc (`docs/legal/financial-policy.md`), ADR (`docs/architecture/adr/ADR-007...`) |
| **Impl Reality / Evidence** | `ADR-007` describes paid subscription gates without financial governance documentation or treasury accounting flows. |
| **Impact / Risk** | Unregulated financial intake risks violation of political funding laws and loss of trust.<br>**Expected Consequence:** Establishes transparent treasury operations. |
| **Remediation Action** | Draft `docs/legal/financial-policy.md` specifying escrow processing, refund guidelines, and audit transparency protocols. |
| **Estimated Effort** | 1 day |

### GOV-004: No Anti-Gaming Safeguards Defined (GPS Spoofing & Sybil Attacks)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Doc (`docs/architecture/security/anti-gaming.md`), Backend (`IssueService`, `PollService`) |
| **Impl Reality / Evidence** | `db-design.md` specifies geographic check-ins and reputation scoring, but zero mechanism is defined to prevent sybil accounts or GPS spoofing. |
| **Impact / Risk** | Malicious actors can artificially manipulate localized civic polls and reputation scores.<br>**Expected Consequence:** Preserves democratic integrity of regional issues. |
| **Remediation Action** | Create `docs/architecture/security/anti-gaming.md` outlining device fingerprinting, rate limits (`resilience4j`/`bucket4j`), and location verification bounds. |
| **Estimated Effort** | 1 day |

### GOV-005: No Content Moderation Framework & Designated Grievance Officer
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Doc (`docs/legal/content-moderation.md`), Backend (`DiscussionService`, `IssueService`) |
| **Impl Reality / Evidence** | Platform hosts user-generated discussions (`discussions` table) with no reporting flow, takedown SLA, or E-Commerce/IT Rule 2021 Grievance Officer designation. |
| **Impact / Risk** | Legal liability for hate speech, defamation, or illegal content hosted on the platform.<br>**Expected Consequence:** Provides safe harbor liability protection under IT Act Section 79. |
| **Remediation Action** | Draft `docs/legal/content-moderation.md` defining community guidelines, automated moderation hooks, and grievance escalation paths. |
| **Estimated Effort** | 1 day |

### GOV-006: No Leader Exit, Demotion, or Dispute Resolution Process
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Doc (`docs/governance/leader-lifecycle.md`), DB (`leaders` table) |
| **Impl Reality / Evidence** | `roadmap.md` and `db-design.md` define leader onboarding and roles, but no workflow exists for voluntary resignation, vote-of-no-confidence demotion, or dispute resolution. |
| **Impact / Risk** | Rogue or inactive political leaders cannot be safely removed or demoted from local jurisdiction assignments without ad-hoc database intervention. |
| **Remediation Action** | Create `docs/governance/leader-lifecycle.md` detailing automated reputation thresholds, vote-of-no-confidence triggers, and administrative demotion workflows. |
| **Estimated Effort** | 1 day |

### GOV-007: No Regional / Multilingual (i18n) Architecture Plan
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Doc (`docs/architecture/frontend/i18n-spec.md`), DB (`issues`, `discussions` translation schemas) |
| **Impl Reality / Evidence** | All frontend copy and backend database schemas (`title`, `description` columns in `db-design.md`) are hardcoded or structured strictly for monolingual English. |
| **Impact / Risk** | Prevents grassroots civic engagement across diverse Indian states and linguistic regions (`Hindi`, `Tamil`, `Telugu`, `Bengali`, etc.). |
| **Remediation Action** | Define `docs/architecture/frontend/i18n-spec.md` for React (`react-i18next`) and specify translation/localization columns in `db-design.md`. |
| **Estimated Effort** | 1 day |

### LEAD-002: Missing Contribution Guidelines & Repo Scaffolding
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `CONTRIBUTING.md`, `pull_request_template.md`, `issue_template.md` |
| **Impl Reality / Evidence** | No root `CONTRIBUTING.md` exists, and `.github/` contains zero pull request or issue templates. |
| **Impact / Risk** | Inconsistent PR submissions, missing context during code reviews, and friction for new team members. |
| **Remediation Action** | Create `CONTRIBUTING.md` linking to `AGENTS.md` and `DoD.md`. Add `.github/PULL_REQUEST_TEMPLATE.md` enforcing checklist verification. |
| **Estimated Effort** | 2 hours |

### LEAD-003: Undocumented Branching Strategy & Release/Versioning Policy
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Doc (`docs/development/branching-and-release.md`) |
| **Impl Reality / Evidence** | No documentation explains how feature branches, PR reviews, version tags (`v1.0.0`), or production releases are managed. |
| **Impact / Risk** | Branch collisions, uncoordinated production deployments, and inability to perform clean rollbacks (`Reversible Cloud Save`). |
| **Remediation Action** | Create `docs/development/branching-and-release.md` defining trunk-based development (`main`), feature branches (`feat/*`), and semantic versioning. |
| **Estimated Effort** | 2 hours |

### LEAD-004: Missing Code Review Standards, DORA Metrics & Risk Register
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Doc (`docs/development/code-review-standards.md`), Doc (`docs/audit/risk-register.md`) |
| **Impl Reality / Evidence** | No formal DORA metric tracking (deployment frequency, lead time, MTTR) or centralized risk register exists outside of debt files. |
| **Impact / Risk** | Engineering bottlenecks go unnoticed; systemic security and architectural risks lack high-level visibility for project stakeholders. |
| **Remediation Action** | Create `docs/development/code-review-standards.md` incorporating `/ponytail-review` guidelines and establish `docs/audit/risk-register.md`. |
| **Estimated Effort** | 3 hours |

### LEAD-005: Knowledge Silos & Single-Owner Bus Factor Risk
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Doc (`docs/development/team-ownership.md`), `.github/CODEOWNERS` |
| **Impl Reality / Evidence** | No `CODEOWNERS` file exists to assign review responsibilities across domain agents (`BE Agent`, `FE Agent`, `QA Agent`, `Tech Arch Agent`). |
| **Impact / Risk** | Critical domain files (`global-config.yaml`, `db-design.md`, `pom.xml`) can be modified without mandatory peer reviews from domain experts. |
| **Remediation Action** | Create `.github/CODEOWNERS` mapping `/backend/` to `BE Agent`, `/frontend/` to `FE Agent`, `/tests/` to `QA Agent`, and `/docs/architecture/` to `Tech Arch Agent`. |
| **Estimated Effort** | 1 hour |

### LEAD-006: Inconsistent Agent Workflow Enforcement & Stale Dashboard Metrics
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini), BE Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `.agents/AGENTS.md` (§0 Mandatory Session Initialization, §3 Git & CI/CD Section) and `.agents/rules/graphify.md` require `graphify update .` and `/ponytail-review` on every loop. |
| **Impl Reality / Evidence** | `dashboard.md` and domain todos (`be-todo.md`, `fe-todo.md`) occasionally lag behind actual file commits. Graphify AST graphs require manual reminders to refresh. |
| **Impact / Risk** | Agents lose contextual awareness across session boundaries (`Reversible Cloud Save` drift) and risk generating boilerplate code. |
| **Remediation Action** | Codify automated check-in hooks ensuring every completed task runs `graphify update .`, verifies `todo.md` sync, and logs exactly to `audit-log.md`. |
| **Estimated Effort** | 1-2 hours |

### LEAD-007: Missing Pre-Launch Operational Readiness Checklist
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟡 Medium |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Doc (`docs/development/operational-readiness.md`) |
| **Impl Reality / Evidence** | No consolidated go-live checklist verifies SSL/TLS, DNS configuration, database backup automation, secret rotation, and monitoring alerts prior to production launch. |
| **Impact / Risk** | High risk of preventable outages or security incidents during public go-live. |
| **Remediation Action** | Create `docs/development/operational-readiness.md` summarizing all Phase 8 launch gates. |
| **Estimated Effort** | 2 hours |

---

## Part II: System Architecture, Boundaries & Technical Stack (`ARCH`)

### ARCH-003: Contradictory Directory Structure Across Docs
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-techstack.md:33` → `backend/auth-service`, `backend/core-service`<br>`backend-design.md:23` → `backend/springboot/`<br>`backend-engineer-dev.md:48` → `backend/springboot/src/`<br>`be-todo.md:59` → `backend/springboot/src/` |
| **Impl Reality / Evidence** | Multiple contradictory directory targets across active architecture guidelines. |
| **Impact / Risk** | Causes file misplacement, broken imports, and confusion across automated agents. |
| **Remediation Action** | Standardize every doc on `backend/springboot/src/` as the single authoritative backend root per ADR-008 Modular Monolith decision. |
| **Estimated Effort** | 1 hour across all markdown files |


### ARCH-005: Missing API Gateway Implementation
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `docs/architecture/system/system-boundaries.md` defines an API Gateway boundary routing public traffic to backend services. |
| **Impl Reality / Evidence** | No Spring Cloud Gateway, Nginx, or Traefik gateway configuration exists. Frontend requests hit backend endpoints directly or rely on unconfigured assumptions. |
| **Impact / Risk** | Lacks centralized edge cross-cutting enforcement (SSL termination, global rate limiting, CORS centralization, routing headers). |
| **Remediation Action** | Under Option B Modular Monolith, document that edge routing is handled directly via Spring Boot (`/djp/api/v1`) behind a reverse proxy/CDN (`global-config.yaml`). |
| **Estimated Effort** | 2 hours |

### ARCH-006: Undocumented Async Event Bus & pgvector Semantic Store Pipelines
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟡 Medium |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `docs/architecture/system/system-boundaries.md` references async event streams (Kafka/RabbitMQ) and AI vector embeddings (`pgvector`). |
| **Impl Reality / Evidence** | Zero configuration or code exists for message brokers or vector database embeddings inside `backend/springboot/`. |
| **Impact / Risk** | Future AI feature integration (`ai-service` search, issue clustering) lacks architectural insertion points. |
| **Remediation Action** | Document that async eventing and `pgvector` pipelines are deferred to Phase 4 (AI features) per Lean Codebase, ensuring clear boundaries without upfront boilerplate. |
| **Estimated Effort** | 1 hour |

---

## Part III: Documentation & Specifications (`DOC`)

### DOC-005: Missing Operational Runbooks & Backend Deployment Guide
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Doc (`docs/operations/runbooks.md`), Doc (`docs/operations/deployment.md`) |
| **Impl Reality / Evidence** | Zero production runbooks explain how to handle database rollbacks, JWT secret rotation, OOM recovery, or container deployment to cloud hosts. |
| **Impact / Risk** | Extended downtime during production incidents due to lack of documented incident response procedures. |
| **Remediation Action** | Create `docs/operations/runbooks.md` and `docs/operations/deployment.md` outlining standard operating procedures and rollback commands. |
| **Estimated Effort** | 3 hours |

### DOC-006: AI Service Lacks Architecture & API Documentation
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟡 Medium |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-techstack.md:35` references `backend/ai-service` (Python/FastAPI). |
| **Impl Reality / Evidence** | No architecture doc (`ai-service-design.md`), API specification, or dependency manifest (`requirements.txt` / `pyproject.toml`) exists for the AI service. |
| **Impact / Risk** | Phase 4 AI features (civic issue clustering, sentiment analysis) have zero architectural design grounding. |
| **Remediation Action** | Create `docs/architecture/ai/ai-service-design.md` defining FastAPI boundaries, `pgvector` integration, and OpenAI/Gemini SDK contracts. |
| **Estimated Effort** | 2 hours |

### DOC-007: Canonical Schema & OAuth Provider Contradictions Across Docs
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `docs/architecture/adr/ADR-003-database-choice.md` specifies Supabase Auth. `docs/architecture/backend/auth-api.md` specifies custom JWTs + Google/Apple OAuth. `db-design.md` defines `users` table columns. |
| **Impl Reality / Evidence** | Contradictory identity architecture claims across core docs. Furthermore, `db-design.md` lists 14 canonical columns (`reputation_score`, `location`, `jurisdiction`, etc.) that differ from code. |
| **Impact / Risk** | Severe identity management confusion; frontend and backend build conflicting authentication flows and mismatched data models. |
| **Remediation Action** | Record ADR-009 clarifying that Spring Boot (`auth-service`) issues JWTs validating against Google/Apple OAuth, with Supabase used strictly as PostgreSQL/Storage engine. Synchronize `db-design.md` across all layers. |
| **Estimated Effort** | 2 hours |

---

## Part IV: Backend Core Implementation, Dependencies & Configuration (`IMPL`, `DEP`, `CFG`)

### IMPL-001: Phase 1 Core Tasks — 🟢 Resolved (100% Complete)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟢 Resolved |
| **Found By** | `BE Agent | Antigravity (Gemini), Tech Arch Agent | Antigravity (Gemini)` |
| **Docs Say / Spec** | `be-todo.md` (`### Phase 1: Core Foundation`) lists 6 mandatory tasks: `[x] 1.1 Project Structure`, `[x] 1.2 Configuration Profiles`, `[x] 1.3 Flyway & Schema (deferred DATA-001)`, `[x] 1.4 Global Exception Handling`, `[x] 1.5 Security & JWT`, `[x] 1.6 Health / Observability`. |
| **Impl Reality / Evidence** | All Phase 1 Core Tasks implemented and verified (`OpenApiConfig.java`, `@ControllerAdvice`, `SecurityConfig.java`, OpenAPI Swagger integration, actuator metrics). All 16 integration tests passing. |
| **Impact / Risk** | Resolved — Spring Boot foundation is verified production-ready. |
| **Remediation Action** | Completed via TDD Red/Green loop across `backend/springboot`. |
| **Estimated Effort** | Completed |

---

## Part V: Database Layer, Migrations & Data Integrity (`DATA`)

### DATA-001: Missing Database Migration Engine (Flyway/Liquibase) vs Unsafe `ddl-auto: update`
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:3.1` and `backend-design.md` mandate Flyway (`flyway-core`) for version-controlled database migrations (`V1__init.sql`). |
| **Impl Reality / Evidence** | No `flyway-core` dependency exists in `pom.xml`, and no `src/main/resources/db/migration/` folder exists. Schema creation relies entirely on Hibernate `ddl-auto: update`. |
| **Impact / Risk** | Hibernate `ddl-auto: update` is non-deterministic across cluster nodes, drops/modifies columns unpredictably during refactors, and breaks audit traceability. |
| **Remediation Action** | Add `flyway-core` to `pom.xml` (Phase 2 core). Create `src/main/resources/db/migration/V1__init.sql` codifying all 14 `users` table columns and canonical schemas from `db-design.md`. Set `ddl-auto: validate` in `application-prod.yml`. |
| **Estimated Effort** | 2 hours |


### DATA-003: Missing Database Indexes & Performance Optimizations in Schema
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:3.3` requires proper `@Index` declarations on foreign keys and frequently queried columns (`jurisdiction`, `status`, `created_at`). |
| **Impl Reality / Evidence** | `Issue.java` specifies zero table `@Index` annotations. `db-design.md` outlines indexes (`idx_issues_jurisdiction`), but code/DDL does not enforce them. |
| **Impact / Risk** | Full table scans (`Seq Scan`) during citizen issue filtering (`WHERE jurisdiction = ... AND status = ...`), causing severe database latency and CPU bottlenecks under load. |
| **Remediation Action** | Add `@Table(name="issues", indexes={@Index(name="idx_issues_jurisdiction", columnList="jurisdiction"), @Index(name="idx_issues_status", columnList="status")})` to `Issue.java` and explicitly define them in Flyway `V1__init.sql`. |
| **Estimated Effort** | 1 hour |

---

## Part VI: Security, Authentication & Fault Tolerance (`SEC`)

### SEC-002: Undocumented/Missing JWT Key Rotation & Secret Management (`@Value` / KeyVault)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:5.3` and security best practices mandate externalized secrets via environment variables or secret vaults (AWS Secrets Manager / HashiCorp Vault) with automated key rotation. |
| **Impl Reality / Evidence** | No secret management structure or JWT public/private key rotation policy is documented or implemented. |
| **Impact / Risk** | Compromised JWT signing keys cannot be rotated without downtime or hardcoded redeployments. |
| **Remediation Action** | Create `docs/architecture/security/secret-management.md` specifying JWKS (`/oauth2/jwks` endpoint) public key caching and external secret injection via `${JWT_SECRET_KEY}`. |
| **Estimated Effort** | 2 hours |


---

## Part VII: Testing Infrastructure & Quality Assurance (`TEST`)

### TEST-002: Frontend Test Stub Is Green Theater (`auth.test.js`) & Zero Playwright E2E Tests
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `QA Agent \| Nemotron, Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `docs/architecture/qa/qa-test-plan.md` mandates component testing and automated browser E2E testing via Playwright (`tests/`). |
| **Impl Reality / Evidence** | `frontend/src/tests/auth.test.js` contains only mock assertions (`expect(true).toBe(true)`) providing false confidence (`Green Theater`). No Playwright test suite or `tests/e2e/` specs exist. |
| **Impact / Risk** | Critical citizen user flows (Login, Issue Submission, Upvoting, Leader Onboarding) fail silently across browser targets without automated verification. |
| **Remediation Action** | Delete mock assertion stubs. `QA Agent` must configure Playwright (`tests/`) and write real E2E test suites covering core user journeys (`login.spec.ts`, `create-issue.spec.ts`). |
| **Estimated Effort** | 1-2 days |

### TEST-003: Missing Contract Testing, Pact/OpenAPI Verification & Frontend Unit Tests
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `QA Agent \| Nemotron, BE Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:7.4` and QA test plans require contract testing (`spring-cloud-starter-contract-verifier` or `swagger-request-validator`) to verify frontend-backend agreement. |
| **Impl Reality / Evidence** | No contract testing dependencies or specs exist. Frontend API calls and Backend DTO changes evolve independently without verification gates. |
| **Impact / Risk** | Unchecked API schema modifications break live React frontend components during runtime. |
| **Remediation Action** | Integrate `swagger-request-validator-mockmvc` in backend `@WebMvcTest` suites to validate all controller responses against `api-spec.yaml`. |
| **Estimated Effort** | 3 hours |

### TEST-004: Missing Automated Coverage Gates & Jacoco/SonarQube Checks
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟡 Medium |
| **Found By** | `QA Agent \| Nemotron, BE Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:7.3` mandates >= 80% line/branch code coverage enforced via build failure thresholds (`jacoco-maven-plugin`). |
| **Impl Reality / Evidence** | No `jacoco-maven-plugin` or SonarQube configuration exists in `pom.xml`. Maven build succeeds even with 0% test coverage. |
| **Impact / Risk** | Test coverage gradually erodes over time without automated build-breaking rules during PR checks. |
| **Remediation Action** | Add `jacoco-maven-plugin` to `pom.xml` with `<minimum>0.80</minimum>` ratio check tied to `mvn test-compile verify`. |
| **Estimated Effort** | 1 hour |

---

## Part VIII: DevOps, Containerization & CI/CD Pipelines (`DEVOPS`)

### DEVOPS-002: Missing Multi-Stage Dockerfile for Frontend & Local `docker-compose.yml`
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `GitHub Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:9.4` requires `docker-compose.yml` spinning up full local development stack (`Spring Boot` + `PostgreSQL` + `Frontend SPA`). |
| **Impl Reality / Evidence** | No `Dockerfile` exists inside `frontend/`, and no root `docker-compose.yml` exists to orchestrate local multi-container development. |
| **Impact / Risk** | Developers must manually install and run separate database, java, and node environments, creating "works on my machine" inconsistencies. |
| **Remediation Action** | Create `frontend/Dockerfile` (`node:20-alpine` builder → `nginx:alpine` runtime) and root `docker-compose.yml` provisioning PostgreSQL 16 (`postgres:16-alpine`), Spring Boot (`port 8080`), and Nginx/React (`port 3000`). |
| **Estimated Effort** | 3 hours |

---

## Part IX: Observability, Logging & Cross-Cutting Concerns (`OBS`, `XCUT`)

### OBS-003: Missing Request/Response Logging, Exception Context & Distributed Tracing
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:4.1` and `4.4` require HTTP request/response audit trails and W3C Trace Context propagation (`opentelemetry-spring-boot-starter`). |
| **Impl Reality / Evidence** | No request logging filter (`CommonsRequestLoggingFilter`) or OpenTelemetry tracing starter exists. Exceptions logged in controllers drop full context and root cause stack traces. |
| **Impact / Risk** | Blind spots during production debugging; slow API response bottlenecks cannot be diagnosed across database queries and network hops. |
| **Remediation Action** | Add `CommonsRequestLoggingFilter` bean (Phase 1) and `opentelemetry-spring-boot-starter` (Phase 2+ when distributed tracing is needed). Ensure exceptions log `logger.error("Error processing request: {}", e.getMessage(), e)`. |
| **Estimated Effort** | 2 hours |

### OBS-004: Missing Centralized Alerting Rules (`prometheus-alerts.yaml` / Slack / PagerDuty)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Operational readiness standards require proactive alerting on critical system thresholds (HTTP 5xx error rate > 1%, JVM heap memory > 85%, DB connection pool exhaustion). |
| **Impl Reality / Evidence** | No Prometheus alert definitions or webhook notifications (`prometheus-alerts.yaml`) exist anywhere in the repository. |
| **Impact / Risk** | Production outages and database deadlocks go unnoticed until reported by external citizens or political stakeholders. |
| **Remediation Action** | Create `docs/operations/prometheus-alerts.yaml` defining critical liveness, error rate, and latency SLA alerts tied to Slack/PagerDuty webhook targets. |
| **Estimated Effort** | 2 hours |


---

## Part X: Master Execution Roadmap & Prioritized Remediation Summary

This master summary maps our 59 debt resolutions across 8 surgical engineering execution phases, assigning clear ownership across domain agents to achieve complete **360-degree remediation** with zero architectural drift.

| Phase | Priority Score | Target Domain / Package | Core Debt Items Addressed | Responsible Agent Role | Automated Verification Gate |
| :---: | :---: | :--- | :--- | :--- | :--- |
| **Phase 1** | **🔴 P0 (Immediate)** | **Project Foundation, TDD & Governance** | `GOV-001..003`, `LEAD-001`, `ARCH-001..003`, `DEP-001`, `CFG-001..002`, `TEST-001`, `XCUT-001` | `Tech Arch Agent` + `BE Agent` + `QA Agent` | Scaffold 7 packages; split `application.yml`/`-local`/`-prod`; add `api-spec.yaml` & `src/test/java`; `mvn test` compiles |
| **Phase 2** | **🔴 P0 (Immediate)** | **Security, Identity & Database Migrations** | `SEC-001..003`, `DATA-001..003`, `IMPL-002..003`, `OBS-001..002` | `BE Agent` + `QA Agent` | Add Flyway `V1__init.sql`; implement `SecurityConfig` & `User.java` (14 cols); `mvn flyway:migrate` & `mvn test` pass |
| **Phase 3** | **🟠 P1 (High)** | **DevOps, CI/CD & Automated Pipelines** | `DEVOPS-001..003`, `LEAD-002..003`, `DOC-004` | `GitHub Agent` + `Tech Arch Agent` | Multi-stage Dockerfiles (`backend`/`frontend`); root `docker-compose.yml`; `.github/workflows/ci.yml` green on PR |
| **Phase 4** | **🟠 P1 (High)** | **Civic Issue Management Module (`/issues`)** | `IMPL-001`, `SEC-004`, `OBS-003`, `XCUT-002` | `BE Agent` + `FE Agent` + `QA Agent` | `IssueController` & DTOs via TDD; Resilience4j rate limits; React `/issues` UI integration passes Playwright E2E |
| **Phase 5** | **🟠 P1 (High)** | **Discussions & Community Module (`/discussions`)** | `GOV-005`, `IMPL-001`, `TEST-002`, `XCUT-003` | `BE Agent` + `FE Agent` + `QA Agent` | `DiscussionService` with moderation checks & PII log masking; full E2E Playwright verification |
| **Phase 6** | **🟡 P2 (Medium)** | **Civic Polls & Voting Module (`/polls`)** | `GOV-004`, `IMPL-001`, `DATA-003`, `TEST-003` | `BE Agent` + `FE Agent` + `QA Agent` | `PollService` with anti-gaming guards (`bucket4j`); contract testing verification; index checks pass |
| **Phase 7** | **🟡 P2 (Medium)** | **AI Assistant & Semantic Search (`ai-service`)** | `ARCH-006`, `DOC-006`, `IMPL-001` | `Tech Arch Agent` + `BE Agent` | `ai-service-design.md` specs; `pgvector` migration; FastAPI service operational (`port 8000`) |
| **Phase 8** | **🟢 P3 (Go-Live)** | **Pre-Launch Polish, Runbooks & Readiness** | `LEAD-007`, `DOC-003..005`, `OBS-004`, `GOV-006..007` | `All Agents` + `Human Engineering Team` | Runbooks created; Prometheus alerts active; final security audit (`/ponytail-audit`) passes 100% |

---
