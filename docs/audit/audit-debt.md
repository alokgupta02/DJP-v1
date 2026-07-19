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
| **2. Process, Leadership & Workflow (`LEAD`)** | 1 | 5 | 1 | **7** | **Moderate Drift** — TDD workflow & DoD present in docs but unenforced in automation. |
| **3. System Architecture & Boundaries (`ARCH`)** | 4 | 2 | 1 | **7** | **Critical Divergence** — Monolith built vs 3 microservices documented; empty shared packages. |
| **4. Documentation & Specifications (`DOC`)** | 3 | 3 | 1 | **7** | **Contradictory** — Missing `api-spec.yaml`, broken inputs/paths across techstack docs. |
| **5. Backend Core & Configuration (`IMPL/DEP/CFG`)** | 5 | 2 | 1 | **8** | **Phase 1 Blocked** — Skeleton controllers; CORS wildcard (`*`); missing Phase 1 starters. |
| **6. Database Layer & Data Integrity (`DATA`)** | 2 | 1 | 1 | **4** | **Unsafe DDL** — Using `ddl-auto: update` in prod; missing Flyway baseline V1 migration. |
| **7. Security, Auth & Fault Tolerance (`SEC`)** | 3 | 2 | 0 | **5** | **Zero Auth** — No `SecurityFilterChain`, `JwtAuthenticationFilter`, input validation, or retries. |
| **8. Testing & Quality Assurance (`TEST`)** | 2 | 2 | 0 | **4** | **TDD Red Violated** — Zero backend integration (`src/test/java`) or Playwright E2E tests. |
| **9. DevOps, Containerization & CI/CD (`DEVOPS`)** | 2 | 1 | 0 | **3** | **Non-Existent** — Empty `.github/workflows/`; missing multi-stage non-root Dockerfiles. |
| **10. Observability & Cross-Cutting (`OBS/XCUT`)** | 4 | 3 | 0 | **7** | **Blind Spot** — Zero structured JSON logging (`MDC`), `/actuator/health`, or global `@ControllerAdvice`. |
| **TOTALS** | **28** | **26** | **5** | **59** | **Comprehensive 360° Remediation Required across all 8 Incremental Engineering Phases.** |

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

### LEAD-001: No Authoritative Definition of Done (DoD) & TDD Workflow Gate [RESOLVED]
| Aspect | Detail |
| :--- | :--- |
| **Severity** | Resolved |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini), BE Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `.agents/AGENTS.md` (§2 Mandatory TDD & Approval Workflow) and `backend-springboot-checklist.md` (§8.2 Gate) require failing tests (`Red`) before code (`Green`) and checklist verification. |
| **Impl Reality / Evidence** | Created the formal `docs/development/DoD.md` checklist. |
| **Impact / Risk** | Was critical governance blocker. |
| **Remediation Action** | Done: Created `docs/development/DoD.md` defining strict quality gates for code compilation, TDD compliance, cleanup, and documentation sync. |
| **Estimated Effort** | Completed |

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

### ARCH-001: Monolith Deployed vs. Microservices Documented (Critical Divergence) [RESOLVED]
| Aspect | Detail |
| :--- | :--- |
| **Severity** | Resolved |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-techstack.md:31-35` defines 3 distinct services: `backend/auth-service` (port 8081), `backend/core-service` (port 8080), and `backend/ai-service` (port 8000, Python/FastAPI). |
| **Impl Reality / Evidence** | Consolidated single backend deployable at `backend/springboot/`. |
| **Impact / Risk** | Was critical divergence. Restructured via ADR-008. |
| **Remediation Action** | Done: Recorded ADR-008 (Modular Monolith) in `decisions.md` and updated `system-boundaries.md` to reflect single runtime. |
| **Estimated Effort** | Completed |

### ARCH-002: Package Structure 86% Missing (`config/`, `dto/`, `exception/`, `repository/`, `service/`)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-design.md:23-46` mandates 7 internal packages inside `backend/springboot/src/main/java/com/djp/`: `config/`, `controller/`, `dto/`, `exception/`, `model/`, `repository/`, and `service/`. |
| **Impl Reality / Evidence** | Only `model/` (1 entity: `Issue.java`) and `controller/` (1 class: `AuthController.java`) exist. All 5 internal architecture layers (`config/`, `dto/`, `exception/`, `repository/`, `service/`) are absent. |
| **Impact / Risk** | Layered architecture violated from inception. Controllers directly manipulate JPA entities or SQL, compounding technical debt and making unit testing impossible. |
| **Remediation Action** | Scaffold all 7 packages immediately. Write an ArchUnit test enforcing layer isolation (`controller/` only depends on `service/` and `dto/`; `model/` never exposed directly to controllers). |
| **Estimated Effort** | 30 minutes scaffolding + 2 hours ArchUnit rules |

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

### ARCH-004: Frontend Shared Packages Are Empty Shells & Structure Discrepancy
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `docs/architecture/frontend/frontend.md` specifies a modular workspace with shared packages (`@djp/ui`, `@djp/config`, `@djp/utils`). |
| **Impl Reality / Evidence** | `frontend/` contains only a monolithic React app (`src/components/`, `src/pages/`). No shared package layout or monorepo workspace (`pnpm-workspace.yaml` / `package.json` workspaces) exists. |
| **Impact / Risk** | Architectural divergence between specification and reality; prevents clean sharing of UI design tokens across future web/mobile targets. |
| **Remediation Action** | Update `frontend.md` to formally reflect the clean, single SPA structure (`frontend/src/`) per Lean Codebase rules, avoiding over-engineered workspaces for MVP. |
| **Estimated Effort** | 1 hour |

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

### ARCH-007: Base Path & Namespace Configuration Mismatch [RESOLVED]
| Aspect | Detail |
| :--- | :--- |
| **Severity** | Resolved |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `global-config.yaml:18` mandates `network.base_url: /djp/api/v1` across all endpoints.<br>`backend-design.md:18` mandates `/djp/api/v1`. |
| **Impl Reality / Evidence** | Updated `AuthController.java` mappings to route traffic through the correct namespace prefix. |
| **Impact / Risk** | Was high routing mismatch risk. |
| **Remediation Action** | Done: Updated `AuthController.java` to `@RequestMapping("/djp/api/v1/auth")` routing prefix. |
| **Estimated Effort** | Completed |

---

## Part III: Documentation & Specifications (`DOC`)

### DOC-001: `backend-techstack.md` vs `backend-design.md` Architectural Contradiction
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini), BE Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-techstack.md:31-35` → 3 microservices in `backend/auth-service`, `backend/core-service`, `backend/ai-service`.<br>`backend-design.md:23` → Single Spring Boot project in `backend/springboot/`. |
| **Impl Reality / Evidence** | Two core SSOT architectural specifications directly contradict one another regarding fundamental service topology and repository layout. |
| **Impact / Risk** | Developers and AI agents receiving tasks make conflicting structural decisions depending on which doc they read first. |
| **Remediation Action** | Update `backend-techstack.md` to officially align with `backend-design.md` under the **Modular Monolith (`backend/springboot/`)** specification (ADR-008). |
| **Estimated Effort** | 1 hour |

### DOC-002: Missing Executable OpenAPI Contract (`api-spec.yaml`) & Schema Descriptions [RESOLVED]
| Aspect | Detail |
| :--- | :--- |
| **Severity** | Resolved |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini), BE Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-design.md:57` mandates API-first development via an executable `api-spec.yaml` (OpenAPI 3.0) under `docs/architecture/`. Furthermore, `backend-springboot-checklist.md:3.2` requires descriptions on all schemas and endpoints. |
| **Impl Reality / Evidence** | Created the canonical OpenAPI 3.0 contract. |
| **Impact / Risk** | Was critical API contract blocker. |
| **Remediation Action** | Done: Created `docs/api/api-spec.yaml` defining OAuth login redirect endpoints and active UserDTO schema. |
| **Estimated Effort** | Completed |

### DOC-003: `backend-design.md` & `backend-engineer-dev.md` Reference Non-Existent Files
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-design.md:18` points to `[global-config.yaml](global-config.yaml)` inside `docs/architecture/backend/`.<br>`backend-engineer-dev.md:48` references input specifications from `routes.md`. |
| **Impl Reality / Evidence** | `global-config.yaml` is located in root (`/home/ap/git-repo/DJP-v1/global-config.yaml`), making relative links broken. `routes.md` does not exist in `docs/architecture/backend/` or root. |
| **Impact / Risk** | Markdown navigation links return 404 in IDEs and web portals; automated agents fail when attempting to read missing input specifications. |
| **Remediation Action** | Fix link targets in `backend-design.md` to point to `../../global-config.yaml`. Remove references to non-existent `routes.md` and point to `api-spec.yaml`. |
| **Estimated Effort** | 30 minutes |

### DOC-004: Missing Developer Onboarding & Local Setup Guide
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Doc (`docs/development/local-setup.md`) |
| **Impl Reality / Evidence** | No unified onboarding document exists explaining how to spin up local PostgreSQL/H2, run Spring Boot, start React dev server, and execute Playwright tests. |
| **Impact / Risk** | Slow onboarding for human contributors and repeated setup questions for new agent instances. |
| **Remediation Action** | Create `docs/development/local-setup.md` providing step-by-step terminal commands (`mvn spring-boot:run`, `npm run dev`) and environment variable templates (`.env.example`). |
| **Estimated Effort** | 2 hours |

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

### IMPL-001: Phase 1 Core Tasks — 0% Complete (6/6 Tasks Blocked)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `be-todo.md` (`### Phase 1: Core Foundation`) lists 6 mandatory tasks: `[ ] 1.1 Project Structure`, `[ ] 1.2 Configuration Profiles`, `[ ] 1.3 Flyway & Schema`, `[ ] 1.4 Global Exception Handling`, `[ ] 1.5 Security & JWT`, `[ ] 1.6 Health / Observability`. |
| **Impl Reality / Evidence** | All 6 foundational tasks remain unchecked (`[ ]`) in `be-todo.md`. Only skeletal stubs exist in `backend/springboot/`. |
| **Impact / Risk** | Every subsequent engineering phase (Issues, Discussions, Polls, AI) is completely blocked from entering production development. |
| **Remediation Action** | Execute Phase 1 tasks sequentially using TDD Red/Green loops (`QA Agent` writing tests first, `BE Agent` implementing minimal code). |
| **Estimated Effort** | 2-3 days across agent team |

### IMPL-002: `User` JPA Entity Diverges from Canonical Schema (7 Missing Columns) [RESOLVED]
| Aspect | Detail |
| :--- | :--- |
| **Severity** | Resolved |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `db-design.md` (`users` table schema) defines canonical columns for the user profile. |
| **Impl Reality / Evidence** | Updated `User.java` to map all canonical columns specified. |
| **Impact / Risk** | Was critical database JPA mapping drift blocker. |
| **Remediation Action** | Done: Overwrote `User.java` containing all canonical properties from database specification and composite constraints. |
| **Estimated Effort** | Completed |

### IMPL-003: `AuthController` Wildcard CORS & Security/Spec Violations [RESOLVED]
| Aspect | Detail |
| :--- | :--- |
| **Severity** | Resolved |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:5.4` strictly prohibits wildcard CORS (`origins = "*"`) when credentials/tokens are involved. Furthermore, all endpoints must map under `/djp/api/v1/auth`. |
| **Impl Reality / Evidence** | Updated `AuthController.java` to secure origins configuration and namespace pathing. |
| **Impact / Risk** | Was critical security and specs compliance risk. |
| **Remediation Action** | Done: Replaced origins wildcard on controller with dynamic property loader `${app.cors.allowed-origins:http://localhost:5173}` and corrected request mapping path namespaces. |
| **Estimated Effort** | Completed |

### DEP-001: Missing Critical Dependencies (Incremental Adoption Strategy)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Checklist §1, §3, §5, §7, §9, §10, §11 mandate starters across various features. However, per the **Lean Codebase Philosophy**, dependencies must be adopted **incrementally** to avoid upfront complexity. |
| **Impl Reality / Evidence** | `pom.xml` currently contains only `spring-boot-starter-web`, `spring-boot-starter-data-jpa`, and H2/PostgreSQL drivers. |
| **Impact / Risk** | Installing all 12+ enterprise dependencies immediately causes premature complexity, slow boot times, and configuration overhead for unbuilt modules. Conversely, lacking core tools blocks immediate development. |
| **Remediation Action** | **Adopt in Phases:**<br>**Phase 1 (Immediate Foundation):** Add `springdoc-openapi-starter-webmvc-ui` (OpenAPI/Swagger), `spring-boot-starter-actuator` (Actuator), `logstash-logback-encoder` (Logstash JSON logging), `resilience4j-spring-boot3` (Resilience4j), plus `validation`/`lombok` as controllers and DTOs are built.<br>**Phase 2+ (On-Demand per Feature):** Add `spring-boot-starter-security`, `oauth2-client`, `flyway-core`, `bucket4j`, `opentelemetry` strictly when their respective modules are implemented. |
| **Estimated Effort** | 1 hour |

### DEP-002: Spring Boot Version Drift (`3.2.5` EOL vs `3.4.x`)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-techstack.md` specifies current LTS Spring Boot 3.x line (`3.3.x / 3.4.x`). |
| **Impl Reality / Evidence** | `pom.xml` pins `spring-boot-starter-parent` to `3.2.5` (released Dec 2023, reached EOL Sept 2024). |
| **Impact / Risk** | Operating on an unsupported EOL Spring Boot version exposes the backend to unpatched CVEs and compatibility bugs with modern Spring Security 6.x. |
| **Remediation Action** | Upgrade `<parent>` POM `<version>` to the latest stable Spring Boot 3.4.x release (`3.4.1+`). Verify clean build via `mvn clean compile`. |
| **Estimated Effort** | 30 minutes |

### DEP-003: No Dependency Management Discipline (`<dependencyManagement>`, dependabot, SBOM)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟡 Medium |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Enterprise build best practices require centralized version management, automated vulnerability scanning, and SBOM generation. |
| **Impl Reality / Evidence** | No `<dependencyManagement>` section, no `versions-maven-plugin`, no `.github/dependabot.yml`, and no CycloneDX SBOM plugin configured. |
| **Impact / Risk** | Increased risk of transitive dependency conflicts, undetected supply chain vulnerabilities, and uncoordinated version drift across team members. |
| **Remediation Action** | Configure `cyclonedx-maven-plugin` for automated SBOM generation and add `.github/dependabot.yml` scanning weekly. |
| **Estimated Effort** | 1 hour |

### CFG-001: Single `application.yml` — No Profile Separation (`application-local.yml` / `-prod.yml`) [RESOLVED]
| Aspect | Detail |
| :--- | :--- |
| **Severity** | Resolved |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:8.1` mandates strict separation across environments: `application.yml` (base), `application-local.yml` (dev), and `application-prod.yml` (production). |
| **Impl Reality / Evidence** | Created profile configurations `application-local.yml` and `application-prod.yml`. |
| **Impact / Risk** | Was critical database config risk. |
| **Remediation Action** | Done: Split configuration environment settings to load H2 in-memory db during local development and validate database schemas against production PostgreSQL with secure defaults. |
| **Estimated Effort** | Completed |

### CFG-002: Hardcoded Secret Default & H2 Console Enabled Without Production Guard [RESOLVED]
| Aspect | Detail |
| :--- | :--- |
| **Severity** | Resolved |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:5.3` mandates never storing hardcoded secrets in code/yaml. `checklist:8.3` mandates disabling H2 console (`spring.h2.console.enabled=false`) in production. |
| **Impl Reality / Evidence** | Removed fallback defaults in database configurations and disabled H2 console in production config. |
| **Impact / Risk** | Was critical security vulnerability. |
| **Remediation Action** | Done: Deleted the default fallback credentials from the database configuration properties and secured the production properties to fail startup if environment variables are missing, alongside disabling the H2 console. |
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

### DATA-002: Missing JPA Repository Interfaces & Custom Queries
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-design.md:23` mandates a `repository/` layer extending `JpaRepository<T, ID>` for all entities. |
| **Impl Reality / Evidence** | No `repository/` package exists. `Issue.java` entity exists with zero corresponding `IssueRepository.java`. |
| **Impact / Risk** | Impossible to execute database CRUD operations, custom paginated search queries (`Pageable`), or civic filtering without repository boundaries. |
| **Remediation Action** | Create `com.djp.repository.UserRepository` and `IssueRepository` extending `JpaRepository` and `JpaSpecificationExecutor` for dynamic filtering. |
| **Estimated Effort** | 1 hour |

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

### DATA-004: H2 vs PostgreSQL Dialect Gaps & Connection Pool Settings Unverified
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟡 Medium |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:8.1` requires H2 to run in PostgreSQL compatibility mode (`MODE=PostgreSQL`) for local development, with HikariCP production pool sizing configured. |
| **Impl Reality / Evidence** | `application.yml` configures H2 connection URL simply as `jdbc:h2:mem:testdb` without `;MODE=PostgreSQL`. HikariCP maximum pool size is unconfigured (`application-prod.yml`). |
| **Impact / Risk** | SQL syntax valid in H2 tests fails on production PostgreSQL (`JSONB`, `UUID`, native queries). Default connection pools exhaust under high concurrency. |
| **Remediation Action** | Update H2 URL to `jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;MODE=PostgreSQL` in `application-local.yml`. Add `spring.datasource.hikari.maximum-pool-size: 20` to `application-prod.yml`. |
| **Estimated Effort** | 30 minutes |

---

## Part VI: Security, Authentication & Fault Tolerance (`SEC`)

### SEC-001: Zero Authentication Implementation (`SecurityConfig`, `JwtAuthenticationFilter`)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:5.1` and `backend-design.md:54` require Spring Security with `SecurityFilterChain`, stateless session management (`STATELESS`), and `JwtAuthenticationFilter` verifying Bearer tokens. |
| **Impl Reality / Evidence** | No `spring-boot-starter-security` in `pom.xml`, no `config/SecurityConfig.java`, and no `JwtAuthenticationFilter.java`. All endpoints are completely unauthenticated and publicly accessible. |
| **Impact / Risk** | Total lack of AuthN/AuthZ. Any anonymous external user can forge requests, access user profiles, or submit unauthorized civic issues and votes. |
| **Remediation Action** | Add `spring-boot-starter-security` and `oauth2-resource-server` (Phase 2 core). Implement `SecurityConfig` enforcing `.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))` and custom `JwtAuthenticationFilter` verifying tokens against public keys. |
| **Estimated Effort** | 4-6 hours |

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

### SEC-003: Zero Bean Input Validation (`@Valid`, DTO annotations, OWASP Top 10)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:5.2` requires `spring-boot-starter-validation` with `@Valid` on all `@RequestBody` endpoints and strict constraints (`@NotBlank`, `@Size`, `@Email`, `@Pattern`) on DTOs. |
| **Impl Reality / Evidence** | No `spring-boot-starter-validation` starter exists. `Issue.java` and `AuthController.java` accept unvalidated raw inputs without constraint checks. |
| **Impact / Risk** | Vulnerable to SQL injection, XSS payloads, buffer overflows, and corrupted database entries from malicious payloads (`OWASP Top 10 A03: Injection`). |
| **Remediation Action** | Add `spring-boot-starter-validation` to `pom.xml` during Phase 1/2 controller builds. Create request DTOs (`IssueCreateRequestDto`) annotated with `@NotBlank`, `@Size(max=500)`, and enforce `@Valid` in controllers. |
| **Estimated Effort** | 2 hours |

### SEC-004: Missing Circuit Breakers, Retries with Backoff, Rate Limiting & Timeouts
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:6.1`, `6.2`, `6.3` mandate Resilience4j (`@CircuitBreaker`, `@Retry` with exponential backoff) and Bucket4j rate limiting on public endpoints (`/auth/login`). |
| **Impl Reality / Evidence** | No `resilience4j-spring-boot3` or `bucket4j` configuration exists. External database and API calls lack timeouts or circuit protection. |
| **Impact / Risk** | Cascading failures during downstream latency spikes (`AI service` or DB slowdowns) and vulnerability to brute-force DDoS/credential stuffing attacks on authentication endpoints. |
| **Remediation Action** | Add `resilience4j-spring-boot3` in Phase 1 and `bucket4j` when rate-limiting endpoints. Configure circuit breakers (`sliding-window-size: 10`) and HTTP client timeouts (`connect-timeout: 3000ms`). |
| **Estimated Effort** | 3 hours |

### SEC-005: Missing Graceful Shutdown & HTTP Security Headers
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟡 Medium |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:6.4` and `5.1` require graceful server shutdown (`server.shutdown=graceful`) and standard security response headers (`HSTS`, `X-Content-Type-Options`, `X-Frame-Options`). |
| **Impl Reality / Evidence** | `application.yml` lacks `server.shutdown=graceful`. No security headers or filter is configured. |
| **Impact / Risk** | In-flight HTTP requests and database transactions abort abruptly during Kubernetes rolling deployments. Browsers remain vulnerable to clickjacking and MIME-sniffing attacks. |
| **Remediation Action** | Add `server.shutdown: graceful` and `spring.lifecycle.timeout-per-shutdown-phase: 30s` to `application.yml`. Configure Spring Security header defaults in `SecurityConfig`. |
| **Estimated Effort** | 30 minutes |

---

## Part VII: Testing Infrastructure & Quality Assurance (`TEST`)

### TEST-001: Zero Real Backend Test Infrastructure (`src/test/java`, TDD Red Violated) [RESOLVED]
| Aspect | Detail |
| :--- | :--- |
| **Severity** | Resolved |
| **Found By** | `QA Agent \| Nemotron, BE Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-engineer-dev.md:26`, `AGENTS.md: §2`, and `backend-springboot-checklist.md:7.1-7.3` strictly enforce **Test-Driven Development (TDD)**: failing unit/integration tests (`src/test/java`) written FIRST (`Red Phase`), using `@SpringBootTest` + Testcontainers PostgreSQL + `@WebMvcTest`. |
| **Impl Reality / Evidence** | Scaffolded test directory structures and implemented a baseline integration test proving successful Tomcat initialization and local database bootstrapping. |
| **Impact / Risk** | Was critical testing blocker. Resolved by setting up base integration test structure. |
| **Remediation Action** | Done: Scaffolded `BaseIntegrationTest.java` and context loads tests. |
| **Estimated Effort** | Completed |

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

### DEVOPS-001: Missing Multi-Stage Production Dockerfile for Backend & Non-Root User
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `GitHub Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:9.1-9.3` and deployment guidelines require optimized multi-stage Docker builds using Eclipse Temurin JRE, non-root user (`USER spring:spring`), and Spring Boot layered JARs (`extract`). |
| **Impl Reality / Evidence** | No `Dockerfile` or `.dockerignore` exists inside `backend/springboot/` or repository root for the backend service. |
| **Impact / Risk** | Cannot deploy containerized applications to cloud platforms (AWS ECS / Kubernetes / Google Cloud Run). Building unoptimized single-layer root containers poses severe container escape security vulnerabilities. |
| **Remediation Action** | Create `backend/springboot/Dockerfile` utilizing multi-stage build (`eclipse-temurin:21-jdk-alpine` builder → `eclipse-temurin:21-jre-alpine` runtime), extracting layered JAR layers, and setting `USER 1001:1001`. |
| **Estimated Effort** | 2 hours |

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

### DEVOPS-003: Empty `.github/workflows/` Directory (No Automated CI/CD Pipeline)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `GitHub Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `AGENTS.md: §3 Git & CI/CD Section` assigns `GitHub Agent` responsibility for monitoring GitHub Actions CI/CD pipelines verifying builds, tests, and formatting on every pull request. |
| **Impl Reality / Evidence** | `.github/workflows/` is completely empty. Zero GitHub Actions workflows (`ci.yml`, `pr-verify.yml`) exist in the repository. |
| **Impact / Risk** | Pull requests are merged without automated build verification, unit/integration test execution, or vulnerability scanning. Broken code reaches `main` branch unchecked. |
| **Remediation Action** | Create `.github/workflows/ci.yml` triggered on `push` to `main` and `pull_request`. Pipeline must execute: (1) `mvn clean verify` (Backend build & tests), (2) `npm test` & `npx playwright test` (Frontend & E2E), and (3) `graphify update .` check. |
| **Estimated Effort** | 3 hours |

---

## Part IX: Observability, Logging & Cross-Cutting Concerns (`OBS`, `XCUT`)

### OBS-001: Zero Structured JSON Logging Configuration (`logstash-logback-encoder` / `MDC`) [RESOLVED]
| Aspect | Detail |
| :--- | :--- |
| **Severity** | Resolved |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:4.1` mandates structured JSON logging via `logstash-logback-encoder` and `logback-spring.xml`, injecting correlation IDs into MDC for every request. |
| **Impl Reality / Evidence** | Configured `logback-spring.xml` and implemented `MdcFilter` for request correlation tracing. |
| **Impact / Risk** | Was critical cloud log aggregation blocker. |
| **Remediation Action** | Done: Added `logstash-logback-encoder` to `pom.xml`, created Logback configuration separating local dev console vs prod JSON output, and wired `MdcFilter` using SLF4J MDC context. |
| **Estimated Effort** | Completed |

### OBS-002: Missing Actuator Readiness Probes (`/actuator/health`), Prometheus & Security Guards
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:4.2`, `4.3`, `4.4` mandate `spring-boot-starter-actuator` + `micrometer-registry-prometheus` exposing `/actuator/health/liveness` and `/readiness` for Kubernetes probes, restricted behind Spring Security or internal ports. |
| **Impl Reality / Evidence** | No `spring-boot-starter-actuator` or Prometheus dependency exists in `pom.xml`. No health check endpoints exist to inform container orchestrators of service health. |
| **Impact / Risk** | Kubernetes/ECS containers cannot perform self-healing or readiness routing. Furthermore, if actuator is added without security hardening, sensitive configuration details (`/actuator/env`) leak publicly. |
| **Remediation Action** | Add `spring-boot-starter-actuator` and `micrometer-registry-prometheus` (Phase 1 core). Configure `application.yml` enabling `health`, `info`, `prometheus` and expose liveness/readiness groups. Restrict actuator access in `SecurityConfig`. |
| **Estimated Effort** | 2 hours |

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

### XCUT-001: Zero Global Exception Handling (`@ControllerAdvice` / Standardized Error DTOs)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🔴 Critical |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:2.1-2.4` and `backend-design.md:95` mandate a global `@ControllerAdvice` (`GlobalExceptionHandler`) catching all exceptions (`MethodArgumentNotValidException`, `ResourceNotFoundException`) and returning a standardized `ErrorResponse` DTO (`timestamp`, `status`, `error`, `message`, `path`). |
| **Impl Reality / Evidence** | No `exception/` package exists, and no `@ControllerAdvice` class exists. Controllers and Spring default error handlers leak raw internal stack traces or inconsistent JSON payloads to clients. |
| **Impact / Risk** | Severe security leakage (exposing database table names and SQL syntax in stack traces to attackers) and broken frontend client error parsing. |
| **Remediation Action** | Create `com.djp.exception.GlobalExceptionHandler` (`@ControllerAdvice`) handling all common exceptions and returning immutable `ErrorResponseDto` payloads while hiding internal server details (`500 Internal Server Error`). |
| **Estimated Effort** | 2 hours |

### XCUT-002: Missing Audit Logging Infrastructure (Tracking WHO/WHEN/WHAT mutations)
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | Civic political platforms require strict immutable audit logs tracking who created, updated, or deleted critical records (`issues`, `polls`, `discussions`, `user roles`). |
| **Impl Reality / Evidence** | No `@EntityListeners(AuditingEntityListener.class)` configuration, `@CreatedBy`/`@LastModifiedBy` annotations, or dedicated `audit_logs` table tracking exists in `backend/springboot/`. |
| **Impact / Risk** | Cannot trace unauthorized administrative role changes, deleted civic posts, or poll vote manipulation back to specific user accounts. |
| **Remediation Action** | Enable `@EnableJpaAuditing` in Spring Boot config and create `AuditLogService` logging state transitions to `audit_logs` table (and structured JSON logs). |
| **Estimated Effort** | 3 hours |

### XCUT-003: Missing PII Masking in Logs & Exception Traces
| Aspect | Detail |
| :--- | :--- |
| **Severity** | 🟠 High |
| **Found By** | `BE Agent \| Antigravity (Gemini), Tech Arch Agent \| Antigravity (Gemini)` |
| **Docs Say / Spec** | `backend-springboot-checklist.md:4.1` and DPDPA data privacy guidelines mandate zero Personally Identifiable Information (PII — passwords, tokens, full emails, locations) in application logs. |
| **Impl Reality / Evidence** | No Logback masking patterns (`MaskingPatternLayout`) or custom serializer filters exist to redact sensitive fields from `toString()` representations or log outputs. |
| **Impact / Risk** | Citizen political opinions, passwords, and JWT tokens leak into plaintext log files stored in cloud log aggregators, violating DPDPA 2023. |
| **Remediation Action** | Configure `MaskingPatternLayout` in `logback-spring.xml` automatically masking `password`, `token`, `authorization`, and `email` JSON keys. Annotate DTO sensitive fields with `@ToString.Exclude`. |
| **Estimated Effort** | 1-2 hours |

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
