# 📋 DJP-v1 Technical Debt Register

> **Audit Date:** 2026-07-18 | **Scope:** Full repo — docs, backend, frontend, tests, CI/CD, agentic workflow
> All findings are evidence-based. Items ordered by severity within each section.

---

## 📊 Severity Dashboard

| Macro Category | Category | 🔴 Critical | 🟠 High | 🟡 Medium | Total |
|:---|:---|:---:|:---:|:---:|:---:|
| **Engineering / IT Debt**<br>*(Architecture, Code, Security, Testing & DevOps)* | **Documentation** | 2 | 5 | 3 | **10** |
| | **Architecture** | 1 | 2 | 2 | **5** |
| | **Technical** | 4 | 5 | — | **9** |
| | **Security** | — | 4 | — | **4** |
| | **Testing** | 1 | 3 | — | **4** |
| | **DevOps** | — | 2 | 1 | **3** |
| | **Observability** | 1 | 1 | 1 | **3** |
| | *Subtotal: Engineering & IT* | *9* | *22* | *7* | ***38*** |
| | | | | | |
| **Administration & Governance Debt**<br>*(Legal, Compliance, Process & Management)* | **Leadership / Process** | — | 2 | 3 | **5** |
| | **Governance / Legal** | 2 | 4 | 1 | **7** |
| | *Subtotal: Admin & Governance* | *2* | *6* | *4* | ***12*** |
| | | | | | |
| **TOTAL** | | **11** | **28** | **11** | **50** |

### 🚦 Quick Health Status

```
Security       ████████████████████  🔴 CRITICAL — wildcard CORS + hardcoded secrets live now
Observability  ████████████████████  🔴 CRITICAL — zero logging, metrics, or tracing configured
Testing        ███████████████░░░░░  🔴 CRITICAL — only stub tests; TDD Red Phase not started
Backend Code   ██████░░░░░░░░░░░░░░  🔴 CRITICAL — auth is a stub; 3 files total; no JWT
DevOps / CI    ██████░░░░░░░░░░░░░░  🔴 CRITICAL — empty GitHub Actions; no Dockerfile
Architecture   █████████░░░░░░░░░░░  🟠 HIGH — docs describe microservices; monolith is deployed
Documentation  █████████████░░░░░░░  🟠 HIGH — good structure; API contract + runbooks missing
Governance     ████████░░░░░░░░░░░░  🟠 HIGH — no legal structure, funding, or data privacy policy
Process        █████████████░░░░░░░  🟡 MEDIUM — strong workflow design; stale dashboard; no DoD
```

---

## # Governance & Compliance Gaps

> **Perspective:** Strategic CEO-level gaps that could block legal operation or platform trust.

---

### GOV-001 — No Legal / Party Registration Structure
**Severity:** 🔴 Critical  
**Why it matters:** The platform positions itself as a civic party tool yet has no mention of ECI (Election Commission of India) compliance, party symbol registration, party constitution filing, or legal entity formation. Operating without this is not just a documentation gap — it is a legal blocker.  
**Evidence:** Entire `docs/vision/party-vision.md` and `roadmap.md` describe party-building features with no mention of ECI requirements.  
**Recommended action:** Consult a legal expert on ECI registration requirements. Add a `docs/legal/registration.md` documenting the legal pathway.  
**Expected impact:** Prevents the platform from being used illegally as a political party tool before proper registration.  

---

### GOV-002 — No Data Privacy Policy (DPDPA / GDPR-equivalent)
**Severity:** 🔴 Critical  
**Why it matters:** The platform collects sensitive personal data: geographic location, political opinions (votes, issues), identity (OAuth profile), and civic behaviour. India's **Digital Personal Data Protection Act 2023 (DPDPA)** mandates explicit consent and data minimization. No privacy policy, consent flow, or data processing notice is defined.  
**Evidence:** `db-design.md` stores `location`, `reputation_score`, OAuth identity. `onboarding.md` collects geographic jurisdiction. `ai-assistant.md` mentions PII masking but defines no concrete policy.  
**Recommended action:** Create `docs/legal/data-privacy.md` defining: data collected, legal basis, retention period, user deletion rights, third-party sharing policy.  
**Expected impact:** Ensures DPDPA 2023 compliance; reduces legal liability; builds citizen trust.  

---

### GOV-003 — No Funding, Finance, or Donation Policy
**Severity:** 🟠 High  
**Why it matters:** Paid leader subscriptions are a core revenue mechanic (ADR-007). No donation policy, spend disclosure, treasury management, or financial audit process is documented. In India, political party financing is heavily regulated.  
**Evidence:** `roadmap.md` references the "Paid Leader Subscription gate" as revenue. No `docs/legal/` directory or financial policy exists.  
**Recommended action:** Define a financial governance policy: subscription terms, refund policy, donation rules (if any), and annual disclosure plan.  
**Expected impact:** Prevents regulatory scrutiny; ensures transparent financial operation.  

---

### GOV-004 — No Anti-Gaming Safeguards Defined
**Severity:** 🟠 High  
**Why it matters:** The platform's reputation system (issue reporting, verification, ranking) is vulnerable to abuse: GPS-spoofing for proximity verification, coordinated reputation farming, fake account networks, and Sybil attacks. None of these are addressed in any technical or policy document.  
**Evidence:** `overview.md` — "Double-Lock Verification: GPS proximity check-ins within 500m + AI visual analysis". No anti-gaming detection, rate limiting per user, or fraud detection architecture exists.  
**Recommended action:** Add an anti-gaming threat model to `docs/security/threat-model.md`. Design rate limits on issue reporting and verification; add IP + device fingerprinting for verification events.  
**Expected impact:** Protects integrity of civic data and reputation rankings — the platform's core trust asset.  

---

### GOV-005 — No Moderation / Legal Liability Framework
**Severity:** 🟠 High  
**Why it matters:** The platform hosts public Discussions and Issues which could contain defamatory, hateful, or legally actionable content. No moderation policy, no content takedown process, no designated grievance officer (required under India's IT Rules 2021), and no liability disclaimer is defined.  
**Evidence:** `docs/architecture/` describes Discussion and Reply entities with free-text `content TEXT NOT NULL` fields. No moderation model or content policy document exists.  
**Recommended action:** Create `docs/legal/content-policy.md`. Appoint a Grievance Officer as required by IT Rules 2021. Implement content reporting API endpoint.  
**Expected impact:** Reduces legal liability; ensures IT Act 2000 / IT Rules 2021 compliance.  

---

### GOV-006 — No Leader Exit / Dispute Resolution Process
**Severity:** 🟠 High  
**Why it matters:** The platform manages a hierarchy of leaders (Ward → Locality → Area). No process exists for leader removal, demotion due to inactivity or misconduct, member appeals, or dispute resolution between leaders and constituents.  
**Evidence:** ADR-007 describes leadership gates but only for entry (paid subscription + reputation). No exit or appeals mechanism is mentioned anywhere.  
**Recommended action:** Define leader lifecycle in `docs/legal/governance-rules.md`: removal criteria, appeal process, grace period for reinstatement.  
**Expected impact:** Prevents platform governance crises; ensures leaders are accountable to constituents.  

---

### GOV-007 — No Regional / Language Scaling Plan
**Severity:** 🟡 Medium  
**Why it matters:** India has 22 official languages and hundreds of regional dialects. The roadmap mentions multilingual support only in v4 (Q2 2027) with no interim plan. A civic platform targeting diverse Indian citizens that launches only in English will have severely limited reach.  
**Evidence:** `roadmap.md` line 63: "Multilingual support across major regional languages" — listed as v4 only. No i18n architecture, no locale framework, no translation strategy exists.  
**Recommended action:** Add i18n architecture decision (ADR) for React frontend (e.g., `react-i18next`). Plan Hindi support at v1.3 minimum. Design backend to store content in locale-aware fields.  
**Expected impact:** Dramatically expands addressable citizen base; aligns with India's linguistic diversity.  

---

## # Documentation Debt

---

### DOC-001 — Missing api-spec.yaml (OpenAPI Contract)
**Severity:** 🔴 Critical  
**Why it matters:** `backend-design.md` explicitly mandates an API-first `api-spec.yaml` for contract-driven development. Without it, FE and BE diverge silently. All endpoint contracts currently exist only as prose in Markdown — no machine-readable source of truth.  
**Evidence:** `backend-design.md` line 57 — *"endpoint contracts will be created as an executable `api-spec.yaml`"*. `docs/api/` directory is completely empty.  
**Recommended action:** Create `docs/architecture/api-spec.yaml` (OpenAPI 3.0) covering all `/djp/api/v1/auth/*` and `/djp/api/v1/core/*` routes. Add `springdoc-openapi` to `pom.xml` to auto-validate at build time.  
**Expected impact:** Eliminates frontend/backend contract drift; enables auto-generated TypeScript client types; unblocks QA agent test-writing.  

---

### DOC-002 — No Developer Onboarding Guide
**Severity:** 🔴 Critical  
**Why it matters:** No document explains how to set up the development environment from scratch. A new engineer or AI agent has no single authoritative starting point — must reconstruct setup from scattered fragments across README, `be-todo.md`, and architecture docs.  
**Evidence:** `docs/architecture/onboarding.md` describes *user* UX onboarding, not *developer* setup. `README.md` has only 3-line command snippets with no prerequisites or troubleshooting.  
**Recommended action:** Create `docs/development/developer-setup.md` covering: prerequisites (Java 21, Node 20+, Maven), env var configuration, local H2 profile activation, OAuth2 redirect URI setup, and troubleshooting.  
**Expected impact:** Eliminates onboarding friction; reduces time-to-first-PR for new agents and contributors.  

---

### DOC-003 — No Runbooks or Operational Playbooks
**Severity:** 🟠 High  
**Why it matters:** No runbooks exist for production incidents: service restart, database recovery, OAuth provider outage, or log investigation. The deployment guide covers hosting options but nothing on operations.  
**Evidence:** `docs/deployment/deployment.md` is a hosting platform comparison matrix — not a runbook. No `docs/runbooks/` directory exists.  
**Recommended action:** Create `docs/runbooks/` with: `service-restart.md`, `database-recovery.md`, `auth-failure-triage.md`.  
**Expected impact:** Reduces MTTR during production incidents; enables on-call readiness.  

---

### DOC-004 — AI Service Has No Architecture or API Documentation
**Severity:** 🟠 High  
**Why it matters:** The AI Service (Python FastAPI + pgvector) is a first-class microservice in all architecture diagrams, yet has zero implementation documentation, no routes spec, no ML model description, and no integration contract with Core Service.  
**Evidence:** `overview.md` references `AI Service (Python FastAPI - Port 8000)`. `backend-techstack.md` lists `backend/ai-service`. That directory does not exist.  
**Recommended action:** Either create `docs/architecture/ai-service.md` with design intent, or formally descope AI Service from v1 via an ADR to eliminate doc/implementation drift.  
**Expected impact:** Eliminates false confidence in scope; clarifies actual MVP boundaries.  

---

### DOC-005 — Schema Conflict: db-design.md vs oauth-login-architecture.md vs AuthController.java
**Severity:** 🟠 High  
**Why it matters:** Three sources contradict each other on the `users` table schema and OAuth providers.  
**Evidence:**  
- `db-design.md` — `provider` field with values `'GOOGLE', 'LINKEDIN'`; includes 12 full columns
- `oauth-login-architecture.md` — `auth_provider` with values `'google' | 'github'`; only 5 columns
- `AuthController.java` — uses `/auth/github` endpoint
- `global-config.yaml` — lists `google` and `linkedin` as providers

**Recommended action:** Designate `db-design.md` as canonical SSOT. Update `oauth-login-architecture.md` and `AuthController.java`. Make a decision: **GitHub or LinkedIn?**  
**Expected impact:** Eliminates onboarding confusion; prevents mismatched JPA entity definitions.  

---

### DOC-006 — No Contribution Guidelines (CONTRIBUTING.md)
**Severity:** 🟠 High  
**Why it matters:** No `CONTRIBUTING.md` defines branch naming, commit message standards, PR template, review expectations, or Definition of Done for human contributors.  
**Evidence:** `.github/workflows/` is empty. No `CONTRIBUTING.md` at repo root. PR process described only in agent skills.  
**Recommended action:** Create `CONTRIBUTING.md` covering: branch naming, Conventional Commits format, PR checklist, review SLA, and Definition of Done.  
**Expected impact:** Establishes contribution culture; unblocks human contributor team scaling.  

---

### DOC-007 — Deployment Guide Missing Backend Deployment Instructions
**Severity:** 🟠 High  
**Why it matters:** `docs/deployment/deployment.md` covers only static frontend hosting. No documentation exists on deploying the Spring Boot backend, containerization, environment variable injection, or Supabase production connection.  
**Evidence:** Deployment doc covers only CDN platforms. Backend directory has no Dockerfile.  
**Recommended action:** Add `docs/deployment/backend-deployment.md` covering Docker build, env var injection, Supabase profile activation, and health check verification.  
**Expected impact:** Enables the first production backend deployment.  

---

### DOC-008 — Execution PRDs Exist Only for OAuth Login
**Severity:** 🟡 Medium  
**Why it matters:** Workflow mandates PRD + Architecture per feature before coding. Only `oauth-login/PRD.md` exists. Issues, Discussions, and Polls (Phases 2–4) have directory placeholders but are empty.  
**Evidence:** `docs/execution/` has `oauth-login/PRD.md` only. `issues/`, `discussions/`, `polls/` directories are empty.  
**Recommended action:** PM Agent must create PRD and architecture docs for Phases 2–4 before implementation begins.  
**Expected impact:** Enforces the Human Approval Gate; prevents premature coding.  

---

### DOC-009 — docs/architecture/routes.md Is a Stub (131 bytes)
**Severity:** 🟡 Medium  
**Why it matters:** `routes.md` is 131 bytes — effectively empty. Lists no actual React Router routes.  
**Evidence:** File exists at 131 bytes. Content is a one-line placeholder.  
**Recommended action:** Populate with the full React Router route tree for `apps/citizen`: route paths, components, and auth guards.  
**Expected impact:** Improves agent and developer navigation of frontend routing.  

---

### DOC-010 — be-todo.md References a Non-Existent Spec File
**Severity:** 🟡 Medium  
**Why it matters:** A dead reference causes agent navigation failures and false confidence that a spec exists.  
**Evidence:** `be-todo.md` line 62: `docs/superpowers/specs/2026-07-11-springboot-h2-backend-design.md`. That directory does not exist.  
**Recommended action:** Update to point to `docs/architecture/backend-design.md` or remove the dead link.  
**Expected impact:** Removes agent confusion and broken reference navigation.  

---

## # Architecture Debt

---

### ARCH-001 — Monolith Deployed; Microservices Documented (Critical Divergence)
**Severity:** 🔴 Critical  
**Why it matters:** All architecture docs describe Auth (port 8081) and Core (port 8080) as separate microservices. The implementation is a single Spring Boot project at `backend/springboot/` with both co-located. This is a documentation-to-implementation mismatch of architectural scope.  
**Evidence:** `system-boundaries.md` and `overview.md` show separate Auth and Core services. `backend/` contains only `springboot/` — one monolith project with `AuthController` and `User` entity together.  
**Recommended action:** Write ADR-008 explicitly stating Phase 1 MVP uses a monolith intentionally, with microservices split targeted at v2. Align all architecture diagrams.  
**Expected impact:** Eliminates architectural confusion; prevents agents from building ghost microservice wiring.  

---

### ARCH-002 — No API Gateway Exists
**Severity:** 🟠 High  
**Why it matters:** All architecture diagrams show a mandatory API Gateway. None is implemented. `AuthController` uses `@CrossOrigin(origins = "*")` as a workaround — a security anti-pattern.  
**Evidence:** `overview.md` — `Gateway (Port 80/443)`. `backend-techstack.md` — "Spring Cloud Gateway / Kong". No gateway config, no Nginx config, no Docker Compose exists.  
**Recommended action:** For MVP, configure a simple Nginx reverse proxy. Document in `docs/deployment/gateway.md`.  
**Expected impact:** Enables production deployment; removes wildcard CORS workaround.  

---

### ARCH-003 — No Database Migration Strategy (ddl-auto: update in H2)
**Severity:** 🟠 High  
**Why it matters:** `ddl-auto: update` silently mutates schema in unpredictable ways. In production with `validate`, a schema mismatch causes startup failure. No Flyway or Liquibase migration files exist.  
**Evidence:** `application-h2.yml` line 17: `ddl-auto: update`. `application-supabase.yml` line 12: `ddl-auto: validate`. No `db/migration/` directory exists.  
**Recommended action:** Add Flyway to `pom.xml`. Create `V1__init_schema.sql`. Set `ddl-auto: none` in all profiles.  
**Expected impact:** Prevents data loss in production; enables safe schema evolution.  

---

### ARCH-004 — Event Bus (Kafka/RabbitMQ) Listed but Undefined
**Severity:** 🟡 Medium  
**Why it matters:** `backend-techstack.md` lists Kafka/RabbitMQ as the async event bus with no schema, topics, dead-letter strategy, or implementation.  
**Evidence:** `backend-techstack.md` line 24: "Kafka / RabbitMQ (for cross-service event notifications)". No event bus files exist.  
**Recommended action:** Write ADR to defer Kafka/RabbitMQ to v2. Use synchronous REST calls in MVP.  
**Expected impact:** Eliminates premature complexity; clarifies MVP scope.  

---

### ARCH-005 — pgvector / Semantic Store Architecture Undocumented
**Severity:** 🟡 Medium  
**Why it matters:** `system-boundaries.md` shows `pgvector Semantic Store` as a storage layer with no schema, embedding model choice, or AI service integration contract.  
**Evidence:** `system-boundaries.md` shows `VEC[(pgvector Semantic Store)]`. No pgvector docs exist.  
**Recommended action:** Create `docs/architecture/ai-service.md` with pgvector schema and pipeline. Or descope to v3 and remove from current diagrams.  
**Expected impact:** Prevents silent architecture debt accumulation.  

---

## # Technical Debt

---

### TECH-001 — Wildcard CORS on AuthController (`origins = "*"`)
**Severity:** 🔴 Critical  
**Why it matters:** `@CrossOrigin(origins = "*")` allows any origin to call auth endpoints — enables CSRF-style attacks and exposes OAuth flows to untrusted origins.  
**Evidence:** `AuthController.java` line 11: `@CrossOrigin(origins = "*")`.  
**Recommended action:** Remove annotation. Configure global `CorsConfigurationSource` bean with explicit allowed origins.  
**Expected impact:** Eliminates live CORS security vulnerability.  

---

### TECH-002 — User Entity Missing 7 of 12 Fields from db-design.md
**Severity:** 🔴 Critical  
**Why it matters:** `User.java` defines only 5 fields. `db-design.md` specifies 12 including `reputation_score`, `subscription_status`, `role`, `onboarding_completed`. Entity is severely incomplete.  
**Evidence:** `User.java` lines 13–29 vs `db-design.md` lines 31–46.  
**Recommended action:** Align `User.java` with the full schema. Use Lombok `@Builder` for clean entity definition.  
**Expected impact:** Prevents silent data loss; unblocks subscription and reputation features.  

---

### TECH-003 — AuthController Is a Stub (No JWT, No OAuth Wiring)
**Severity:** 🔴 Critical  
**Why it matters:** `AuthController` returns a static `HashMap` with a redirect URL. No JWT service, no OAuth callback, no Spring Security config, no `UserRepository`. The auth flow does not work.  
**Evidence:** `AuthController.java` lines 15–29 — returns static `redirectUrl`. No `JwtService`, `SecurityConfig`, or `UserDetailsService` exists.  
**Recommended action:** Implement Phase 1 `be-todo.md` tasks: Spring Security OAuth2 config, `OAuth2UserService`, `JwtService`, `/djp/api/v1/auth/me` endpoint.  
**Expected impact:** Delivers working Phase 1 MVP backend; unblocks frontend integration.  

---

### TECH-008 — Hardcoded Secret Default in Production Config
**Severity:** 🔴 Critical  
**Why it matters:** `${SUPABASE_PASSWORD:secret-password}` fallback means if env var is unset, the literal string `secret-password` is used silently.  
**Evidence:** `application-supabase.yml` line 9: `password: ${SUPABASE_PASSWORD:secret-password}`.  
**Recommended action:** Remove all default fallback values from secret placeholders. Add startup validation to fail fast on missing secrets.  
**Expected impact:** Eliminates secret default exposure in production.  

---

### TECH-004 — pom.xml Missing 7 Critical Dependencies
**Severity:** 🟠 High  
**Why it matters:** `spring-boot-starter-security`, `spring-boot-starter-oauth2-client`, `spring-boot-starter-validation`, `spring-boot-starter-actuator`, `jjwt`, `springdoc-openapi`, `flyway-core` are all absent. The documented architecture cannot be built without them.  
**Evidence:** `pom.xml` lines 20–43 — only 5 dependencies present.  
**Recommended action:** Add all missing dependencies in Phase 1 setup.  
**Expected impact:** Unblocks all Phase 1 implementation tasks.  

---

### TECH-005 — No Base application.yml (Default Profile Missing)
**Severity:** 🟠 High  
**Why it matters:** Only profile-specific YMLs exist. Without a base `application.yml`, the app cannot start without explicit `--spring.profiles.active`. No common properties (app name, port, logging) are defined.  
**Evidence:** `src/main/resources/` contains only `application-h2.yml` and `application-supabase.yml`.  
**Recommended action:** Create `application.yml` with `spring.application.name`, `server.port=8080`, Actuator config, and Logback config.  
**Expected impact:** Enables clean local startup.  

---

### TECH-006 — frontend/src/ Structure Doesn't Match Documented Architecture
**Severity:** 🟠 High  
**Why it matters:** `frontend/src/` contains only a `components/` directory. The documented feature-oriented architecture (`features/`, `app/`, `shared/`) in `frontend.md` is absent.  
**Evidence:** `frontend/src/` listing shows only `components/`. Documented structure includes `src/app/`, `src/features/`, `src/shared/`.  
**Recommended action:** Verify `apps/citizen/src/`. If root `frontend/src/` is legacy, remove it or clarify in `frontend.md`.  
**Expected impact:** Eliminates structural confusion for agents.  

---

### TECH-007 — QA Test File Contains No Real Assertions (Green Theater)
**Severity:** 🟠 High  
**Why it matters:** `auth.test.js` tests hardcoded local constants — not APIs or DOM. Tests trivially pass and violate the TDD Red Phase requirement.  
**Evidence:** `auth.test.js` line 7: `expect(buttons.length).toBe(2)` — tests an in-file array literal, not a rendered component.  
**Recommended action:** Replace with genuine Playwright E2E tests and `@SpringBootTest` integration tests that actually fail in Red Phase.  
**Expected impact:** Establishes real TDD guardrails; eliminates false confidence.  

---

### TECH-009 — H2 Console Enabled with No Authentication
**Severity:** 🟠 High  
**Why it matters:** `/h2-console` is enabled with default credentials (`sa`, empty password). If activated outside local dev, full database access is exposed.  
**Evidence:** `application-h2.yml` lines 10–13: `enabled: true`, `path: /h2-console`.  
**Recommended action:** Confirm H2 console is `enabled: false` in all non-local profiles. Add a Spring Security rule blocking `/h2-console` outside local.  
**Expected impact:** Eliminates database exposure risk in misconfigured deployments.  

---

## # Security Debt

---

### SEC-001 — No OWASP / Security Review Process Defined
**Severity:** 🟠 High  
**Why it matters:** OWASP Top 10 is mentioned as a goal but no formal review process, threat model, or pentest cadence is defined anywhere. For a politically sensitive civic platform, this is especially high risk.  
**Evidence:** `backend-engineer-dev.md` line 39: "Ensure robust security practices (OWASP Top 10)". No threat model document exists.  
**Recommended action:** Create `docs/security/threat-model.md`. Add OWASP checkpoint to `backend-springboot-checklist.md`.  
**Expected impact:** Proactively identifies platform-specific attack vectors before launch.  

---

### SEC-002 — JWT Signing Key and Rotation Strategy Undefined
**Severity:** 🟠 High  
**Why it matters:** `global-config.yaml` defines JWT expiry but no signing algorithm, key storage, or rotation strategy. A weak or leaked key compromises all user sessions.  
**Evidence:** `global-config.yaml` lines 32–34 — only `header`, `prefix`, `expiration_hours`. No `jwt.secret` or `jwt.algorithm` reference.  
**Recommended action:** Define `JWT_SECRET` as required env var (min 256-bit). Document RS256 as production algorithm. Add key rotation runbook.  
**Expected impact:** Hardens token security against secret exposure.  

---

### SEC-003 — No Rate Limiting on Auth Endpoints
**Severity:** 🟠 High  
**Why it matters:** Auth endpoints have no throttling. A politically targeted DDoS or credential stuffing attack could overwhelm the service unchecked.  
**Evidence:** `AuthController.java` — no rate-limiting annotations or filter references.  
**Recommended action:** Implement Bucket4j or Gateway rate limiting on `/djp/api/v1/auth/*`.  
**Expected impact:** Protects a politically sensitive platform against targeted auth abuse.  

---

### SEC-004 — Citizen Location + Political Activity = High-Risk PII Profile
**Severity:** 🟠 High  
**Why it matters:** The platform combines geographic location, political opinions (votes, issues), and civic identity. This creates a detailed political profile regulated under DPDPA 2023.  
**Evidence:** `db-design.md` stores `location`. `onboarding.md` collects geographic jurisdiction. No data minimization or anonymization policy exists.  
**Recommended action:** Document Data Privacy Policy in `docs/legal/data-privacy.md`: collection scope, retention limits, anonymization, user deletion rights.  
**Expected impact:** Ensures DPDPA 2023 compliance; reduces legal liability.  

---

## # Testing Debt

---

### TEST-001 — Zero Real Backend Integration Tests Exist
**Severity:** 🔴 Critical  
**Why it matters:** No `@SpringBootTest`, no `MockMvc`, no JUnit files exist. TDD Red Phase has not been completed. Backend progress is zero despite `be-todo.md` showing Phase 1 as "Ready to Start."  
**Evidence:** `backend/springboot/src/` has only a `main/` directory — no `test/` directory.  
**Recommended action:** Create `backend/springboot/src/test/` with `AuthControllerIntegrationTest.java` (MockMvc + H2) and `UserRepositoryTest.java` (DataJpaTest). Must fail first.  
**Expected impact:** Establishes TDD Red Phase baseline; gates Phase 1 correctly.  

---

### TEST-002 — No Playwright Tests Despite "Active Sprint" Status on Dashboard
**Severity:** 🟠 High  
**Why it matters:** `dashboard.md` shows QA Phase 2 as "Active Sprint" at 50% progress. No `playwright.config.ts`, no E2E test files exist. Dashboard is wrong.  
**Evidence:** `tests/` has only `auth.test.js` (JavaScript stub, not Playwright) and `test-todo.md`.  
**Recommended action:** Install Playwright. Create `tests/e2e/auth.spec.ts` with a real login flow test. Must fail in Red Phase.  
**Expected impact:** Creates real failing E2E tests; dashboard progress becomes accurate.  

---

### TEST-003 — No Frontend Unit or Component Tests
**Severity:** 🟠 High  
**Why it matters:** `frontend.md` specifies Vitest + React Testing Library. No `vitest.config.ts`, no `*.test.tsx` files exist anywhere.  
**Evidence:** `frontend/apps/citizen/` has no test files. No Vitest config found.  
**Recommended action:** Add Vitest and RTL as dev dependencies. Create component tests for shared `@djp/ui` components. Define coverage threshold in CI.  
**Expected impact:** Protects shared component library from regression.  

---

### TEST-004 — No CI Pipeline for Automated Test Execution
**Severity:** 🟠 High  
**Why it matters:** `.github/workflows/` is empty. No GitHub Actions runs tests on PR. The TDD workflow has no automated enforcement — it's entirely manual.  
**Evidence:** `.github/workflows/` is an empty directory.  
**Recommended action:** Create `.github/workflows/ci.yml` with: `./mvnw test`, `npm run typecheck -ws`, `npm run lint -ws`, Playwright E2E.  
**Expected impact:** Enforces test gates automatically; prevents broken code reaching `main`.  

---

## # DevOps Debt

---

### DEVOPS-001 — No Dockerfile for Backend
**Severity:** 🟠 High  
**Why it matters:** Checklist Section 9 mandates a multi-stage Dockerfile. None exists. The backend cannot be containerized or deployed to any production container platform.  
**Evidence:** `backend/` and `backend/springboot/` — no Dockerfile.  
**Recommended action:** Create `backend/springboot/Dockerfile`: `maven:3.9-eclipse-temurin-21` build stage + `eclipse-temurin:21-jre` runtime stage + non-root user.  
**Expected impact:** Enables containerized deployment; prerequisite for any production infra.  

---

### DEVOPS-002 — No Docker Compose for Local Development
**Severity:** 🟠 High  
**Why it matters:** Full-stack local development (Frontend + Backend + Gateway) requires multiple manual steps. No `docker-compose.yml` exists.  
**Evidence:** No `docker-compose.yml` in the repository root or any subdirectory.  
**Recommended action:** Create `docker-compose.yml` orchestrating `djp-backend` + `djp-frontend` with `.env` injection.  
**Expected impact:** Reduces developer setup to a single `docker compose up`.  

---

### DEVOPS-003 — No Release Strategy or Git Branching Convention
**Severity:** 🟡 Medium  
**Why it matters:** Roadmap defines version milestones but no branching strategy (GitFlow vs trunk-based), release tagging, changelog, or API versioning policy is documented.  
**Evidence:** `.djp_state.md` — `Active Branch: main`. No `CHANGELOG.md`. No branch protection rules.  
**Recommended action:** Document branching strategy in `CONTRIBUTING.md`. Enable branch protection on `main` (require PR + CI green). Add `CHANGELOG.md`.  
**Expected impact:** Prevents direct pushes to `main`; enables rollback via release tags.  

---

## # Observability Debt

---

### OBS-001 — Zero Logging Configuration Exists
**Severity:** 🔴 Critical  
**Why it matters:** Neither application YAML contains a `logging:` block. No Logback XML, no structured JSON output, no correlation ID injection. In production the app emits unstructured console text with no traceability.  
**Evidence:** No `logging:` block in any resource YAML. No `logback-spring.xml` in `src/main/resources/`.  
**Recommended action:** Create `logback-spring.xml` with profile-aware appenders (console for local, JSON for prod). Implement `CorrelationIdFilter` as `OncePerRequestFilter`.  
**Expected impact:** Enables production debugging; prerequisite for log aggregation and alerting.  

---

### OBS-002 — No Metrics or Health Endpoint (Actuator Not in pom.xml)
**Severity:** 🟠 High  
**Why it matters:** Spring Boot Actuator is absent from `pom.xml`. No `/actuator/health` means Docker/Kubernetes health probes will fail. No Micrometer metrics emitted.  
**Evidence:** `pom.xml` — no `spring-boot-starter-actuator` dependency.  
**Recommended action:** Add `spring-boot-starter-actuator` and `micrometer-registry-prometheus`. Configure Prometheus scrape endpoint.  
**Expected impact:** Enables container health probes; enables Grafana/Prometheus monitoring.  

---

### OBS-003 — No Distributed Tracing Between Microservices
**Severity:** 🟡 Medium  
**Why it matters:** Three planned microservices with no OpenTelemetry configuration, no Zipkin/Jaeger export, and no `traceparent` header propagation.  
**Evidence:** No tracing configuration in any file.  
**Recommended action:** Add `micrometer-tracing-bridge-otel` to pom.xml in Phase 1. Document W3C `traceparent` propagation contract.  
**Expected impact:** Enables waterfall trace visualization for multi-service debugging.  

---

## # Leadership / Process Debt

---

### LEAD-001 — No Definition of Done (DoD)
**Severity:** 🟠 High  
**Why it matters:** No single authoritative DoD is applied before any task is marked complete. Completion is subjective, leading to inconsistent quality.  
**Evidence:** `AGENTIC_WORKFLOW_GUIDE.md` describes the TDD workflow but does not define a DoD. The checklist is the closest artefact but not formally gated.  
**Recommended action:** Add a `## Definition of Done` section to `CONTRIBUTING.md` and `AGENTIC_WORKFLOW_GUIDE.md`. Minimum: tests pass, checklist verified, no dead code, docs updated, dashboard accurate.  
**Expected impact:** Standardizes completion criteria; prevents premature task closure.  

---

### LEAD-002 — dashboard.md Progress Metrics Are Stale and Inaccurate
**Severity:** 🟠 High  
**Why it matters:** Dashboard shows QA at 50% progress. Reality: no Playwright tests exist, no Playwright config exists. Dashboard reflects planned state, not actual state.  
**Evidence:** `dashboard.md` — QA "🟡 Active Sprint". `tests/` — only a stub JS file.  
**Recommended action:** Update `dashboard.md` to reflect actual state. Create an agent rule or automation to keep it synchronized with file/test existence.  
**Expected impact:** Restores dashboard as a reliable signal; prevents false confidence.  

---

### LEAD-003 — Knowledge Silo: Single Agent / Owner Context
**Severity:** 🟡 Medium  
**Why it matters:** Entire architecture resides in a single owner's context. No team knowledge transfer, no bus factor analysis, no `CODEOWNERS` file.  
**Evidence:** All doc ownership fields list single roles with no backup contacts. No `.github/CODEOWNERS` exists.  
**Recommended action:** Create `.github/CODEOWNERS` mapping areas to responsible owners. Define escalation paths.  
**Expected impact:** Reduces single-point-of-failure risk as the team grows.  

---

### LEAD-004 — No Enforced Engineering Metrics or Quality Gates
**Severity:** 🟡 Medium  
**Why it matters:** Success metrics are defined (>80% coverage, zero critical vulns) but no tooling measures or enforces them. No JaCoCo, no SonarQube, no OWASP Dependency Check in CI.  
**Evidence:** `.github/workflows/` empty. `pom.xml` has no JaCoCo or SpotBugs plugins.  
**Recommended action:** Add JaCoCo with 80% coverage build gate. Add OWASP Dependency Check to CI.  
**Expected impact:** Makes quality targets measurable and automatically enforced.  

---

### LEAD-005 — ADRs Cover Only Frontend/Product Decisions; Backend Decisions Unrecorded
**Severity:** 🟡 Medium  
**Why it matters:** `decisions.md` has 7 ADRs — all frontend/product. No ADR records choice of Spring Boot 3.x, Java 21, JWT vs sessions, Supabase vs self-hosted PostgreSQL, or H2 for local dev.  
**Evidence:** ADR-001 through ADR-007 — all UX/product decisions.  
**Recommended action:** Add ADR-008 (Spring Boot + Java 21), ADR-009 (Supabase PostgreSQL), ADR-010 (JWT stateless auth), ADR-011 (Flyway migrations).  
**Expected impact:** Preserves decision rationale for future engineers; prevents re-litigation.  
