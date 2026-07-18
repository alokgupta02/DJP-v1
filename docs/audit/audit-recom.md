# 📊 **DJP Platform Technical Debt & Audit Recommendations**

---

| Metadata | Value |
| :--- | :--- |
| **📅 Last Updated** | 2026-07-18 |
| **📌 Status** | `Active` |
| **🏷️ Version** | `v1.0.0` |
| **👥 Owner** | `QA Lead / Principal Architect` |
| **🔗 Dependencies** | [overview.md](../architecture/overview.md), [backend-springboot-checklist.md](../architecture/backend-springboot-checklist.md) |

---

## 🔴 1. Critical Debt (11 Items)
*Must resolve immediately before any production release or merge to the main branch.*

| ID | Title | Domain | Risk / Why it Matters |
| :--- | :--- | :---: | :--- |
| **TECH-001** | Wildcard CORS on AuthController (`*`) | Security / BE | Allows any origin to call auth endpoints, enabling CSRF-style attacks. |
| **TECH-008** | Hardcoded Secret Default in Supabase Config | Security / BE | Fallback `secret-password` default exposed in public source control. |
| **TECH-002** | User Entity Missing 7 of 12 Fields from Spec | Database / BE | Spring Boot database model diverges significantly from [db-design.md](../architecture/db-design.md). |
| **TECH-003** | AuthController Is a Stub (No JWT/OAuth wiring) | Technical / BE | Core authentication does not function; controller stubs return static mock data. |
| **TEST-001** | Zero Real Backend Integration Tests Exist | Testing / QA | No integration, database, or JUnit tests exist; fails our mandatory TDD Red Phase. |
| **OBS-001** | Zero Logging Configuration Exists | Observability | No Logback/structured logging configured; application runs completely blind in production. |
| **ARCH-001** | Monolith Deployed vs. Microservices Spec | Architecture | Monolith deployed under `springboot/` while documentation defines 3 distinct services. |
| **DOC-001** | Missing `api-spec.yaml` (OpenAPI Contract) | Documentation | No machine-readable API contract; risks silent client/server schema drift. |
| **DOC-002** | No Developer Onboarding / Environment Guide | Documentation | Missing installation setups and environment templates (`.env.example`) for new devs. |
| **GOV-001** | No Legal / Party Registration (ECI) Structure | Governance | Operating without the required Election Commission of India (ECI) compliance framework. |
| **GOV-002** | No Data Privacy Policy (DPDPA/GDPR Compliance) | Governance | Collecting citizen location/opinions without data minimization or consent checks. |

---

## 🟠 2. High Debt (28 Items)
*Should resolve during the next sprint cycle to stabilize features.*

### 🔐 Security, Architecture & DevOps

| ID | Title | Domain | Description |
| :--- | :--- | :---: | :--- |
| **SEC-001** | No OWASP / Security Review Process | Security | No security review checklist or tooling is integrated into the build process. |
| **SEC-002** | JWT Key & Rotation Strategy Undefined | Security | Signing keys are static and rotation procedures are not documented. |
| **SEC-003** | No Rate Limiting on Auth Endpoints | Security | Vulnerable to credential stuffing, brute force, and API denial-of-service. |
| **SEC-004** | Profile Data Privacy Risk | Security | Citizen location and political activity profile details lack encryption/masking. |
| **TECH-009** | H2 Console Enabled with No Auth | Technical | Development H2 console accessible without credentials, risking local leaks. |
| **TECH-004** | Missing 7 Critical Maven Dependencies | Technical | `pom.xml` lacks security, actuator, database migration (Flyway), and OpenAPI starters. |
| **TECH-005** | No Base `application.yml` | Technical | Missing default profile configuration template. |
| **TECH-006** | Frontend Folder Structure Discrepancy | Technical | React `src/` directory structure does not match the documented monorepo spec. |
| **TECH-007** | QA Test File Lacks Real Assertions | Testing / QA | Test suite contains empty stubs ("Green Theater" stubs without checks). |
| **DEVOPS-001**| No Backend Production Dockerfile | DevOps | Missing containerization blueprint for production deployment. |
| **DEVOPS-002**| No Docker Compose Configuration | DevOps | Multi-service local environment cannot be spun up easily. |
| **ARCH-002** | No API Gateway Setup | Architecture | Missing router layer (Nginx, Kong, or Spring Cloud Gateway). |
| **ARCH-003** | No Database Migration Engine | Architecture | Missing Flyway/Liquibase; currently relying on unsafe startup auto-updates. |

### 📝 Docs, Process & Governance

| ID | Title | Domain | Description |
| :--- | :--- | :---: | :--- |
| **DOC-003** | No Operational Runbooks | Docs | Missing triage and emergency incident recovery guides. |
| **DOC-004** | AI Service Lacks API Docs | Docs | FastAPI service lacks endpoint and schema specifications. |
| **DOC-005** | Schema Conflict | Docs | Mismatch between `db-design.md` and `oauth-login-architecture.md`. |
| **DOC-006** | No Contribution Guidelines | Docs | Missing `CONTRIBUTING.md` for onboarding open-source contributors. |
| **DOC-007** | Deployment Guide Incomplete | Docs | Missing backend release and deployment instructions. |
| **GOV-003** | No Donation/Billing Policies | Governance | Financial transactions and constituent subscriptions are undocumented. |
| **GOV-004** | No Anti-Gaming Safeguards | Governance | Vulnerable to GPS spoofing and reputation farming. |
| **GOV-005** | No Content Moderation Rules | Governance | Missing flag filters and legal liability disclaimers for user-generated content. |
| **GOV-006** | No Leader Removal Process | Governance | No impeachment or constituent appeal workflow designed. |
| **TEST-002** | Missing Playwright Tests | Testing / QA | Playwright automation not configured in `tests/` despite active status. |
| **TEST-003** | No Frontend Unit/Component Tests | Testing / QA | Missing Vitest / Testing Library suites. |
| **TEST-004** | No CI/CD Pipeline | DevOps | `.github/workflows/` directory is empty. |
| **OBS-002** | Actuator & Prometheus Metrics Absent | Observability | No micrometer instrumentation for performance metrics. |
| **LEAD-001** | No Definition of Done (DoD) | Process | No quality gate standards established for feature completion. |
| **LEAD-002** | Stale Dashboard Progress Metrics | Process | `dashboard.md` progress metrics are manually updated, stale, and inaccurate. |

---

## 🟡 3. Medium Debt (11 Items)
*Backlog tasks to address during system stabilization phases.*

| ID | Title | Domain | Description |
| :--- | :--- | :---: | :--- |
| **DOC-008** | Missing Execution PRDs | Docs | PRDs are missing for Issues, Discussions, and Polls features. |
| **DOC-009** | Empty Routes Spec | Docs | `docs/architecture/routes.md` is an empty one-line stub. |
| **DOC-010** | Broken Todo References | Docs | `be-todo.md` references a non-existent specification path. |
| **ARCH-004** | Event Bus Design Absent | Architecture | Message queue system (Kafka/RabbitMQ) is listed but undocumented. |
| **ARCH-005** | pgvector Search Ingestion Undocumented | Architecture | Search vectorization and ingestion pipelines lack documentation. |
| **DEVOPS-003**| No Release Tagging Strategy | DevOps | Missing API deprecation and versioning policies. |
| **OBS-003** | No Distributed Tracing | Observability | OpenTelemetry trace propagation across services is missing. |
| **GOV-007** | No Localization Plan (i18n) | Governance | Missing language translation strategy for regional coverage. |
| **LEAD-003** | Knowledge Silo | Process | Technical specifications reside inside a single agent context instead of shared docs. |
| **LEAD-004** | No Automated Quality Gates in CI | Process | Missing JaCoCo code coverage and dependency vuln checking in pipeline. |
| **LEAD-005** | Spring Boot ADRs Missing | Process | Decisions for choosing Spring Boot, Supabase, and JWT lack formal ADR records. |