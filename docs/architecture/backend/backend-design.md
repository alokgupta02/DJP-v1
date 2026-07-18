# ⚙️ **Backend API Engineering Specification**

---

| Metadata | Value |
| :--- | :--- |
| **📅 Last Updated** | 2026-07-18 20:25 |
| **📌 Status** | `Stable` |
| **🏷️ Version** | `v1.0.0` |
| **👥 Owner** | `Principal Technical Architect` |
| **🔗 Dependencies** | [overview.md](overview.md), [db-design.md](db-design.md), [backend-techstack.md](backend-techstack.md), [backend-engineer-dev.md](backend-engineer-dev.md) |

---
## 1. Goal & Architecture Overview
The objective is to implement a robust, lightweight, and test-driven backend for the citizen application using **Spring Boot 3.x** and **Java 21**, exposed via REST APIs.
To support authentication, the system uses **OAuth2 (Google and LinkedIn)**. The application leverages standard Spring Security and Spring Data JPA to map database tables. For details on database tables and schema structures, refer to **[db-design.md](db-design.md)**.
### System Components
* **Global Constants**: All base paths (`/djp/api/v1`), service ports, and security parameters are centralized in **[global-config.yaml](global-config.yaml)**.
* **REST APIs**: Built with Spring Web (REST controllers), conforming to RESTful standards under the `/djp/api/v1` namespace.
* **Security & Auth**: Spring Security configuration acting as an OAuth2 Login Client (Authorization Code Flow) that persists authenticated profiles and issues lightweight JWTs to the React frontend.
---
## 2. Directory & Package Structure
All backend source files will be stored inside the `backend/springboot` directory:
```text
backend/springboot/
├── pom.xml                                 # Maven configuration
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/
    │   │       └── djp/
    │   │           └── backend/
    │   │               ├── BackendApplication.java # Spring Boot bootstrapper
    │   │               ├── config/          # Spring Security, OAuth2, and JWT configuration
    │   │               ├── controller/      # REST API Controllers (Auth, Issues, Discussions, Polls)
    │   │               ├── dto/             # Request & Response Data Transfer Objects (DTOs)
    │   │               ├── exception/       # GlobalExceptionHandler and Custom API Exceptions
    │   │               ├── model/           # JPA Database Entities
    │   │               ├── repository/      # Spring Data JPA Repositories
    │   │               └── service/         # Domain business logic services
    │   └── resources/
    │       ├── application.yml              # Configuration properties (OAuth client secrets, DB credentials)
    │       ├── schema.sql                   # Database table definitions (executed on startup)
    │       └── data.sql                     # Seed data for local testing (executed on startup)
    └── test/                                # Integration and unit test suite
```
---
## 3. Database Schema Design

For complete details on database tables, column types, entity relations, constraints, and dialect mapping configurations, refer to the **[Database Schema & Relational Design Specification](db-design.md)**.

---
## 4. REST API Endpoint Contracts
All controllers will map requests under `/djp/api/v1` (as configured by `network.base_url` in **[global-config.yaml](global-config.yaml)**). Secured endpoints require a valid Bearer JWT.

> [!NOTE]
> **API-First Development:** During the implementation phase, endpoint contracts (paths, schemas, DTOs, request/response bodies) will be created as an executable **`api-spec.yaml`** (OpenAPI 3.0 specification) file under `docs/architecture/` to auto-generate Spring Boot and React/Axios interfaces, avoiding manual text maintenance or drift.

---
## 5. Phased Implementation Plan
We adopt a "Working Model First" (MVP) approach. Each phase is completed using Test-Driven Development (TDD) before implementing production logic.
### Phase 1: Project Setup & OAuth2 (MVP 1)
1. Initialize the Spring Boot maven project with security, web, data-jpa, and validation dependencies.
2. Configure Spring Security for OAuth2 Login with Google and LinkedIn.
3. Implement JWT helper to parse, generate, and validate authorization tokens.
4. Create `/djp/api/v1/auth/me` endpoint to verify current user context.
5. Verify OAuth2 flows locally using integration tests.
### Phase 2: Issues CRUD (MVP 2)
1. Implement `Issue` database entity and `IssueRepository` mapped to `issues` table in `db-design.md`.
2. Create `IssueService` and `IssueController` using TDD (write unit/integration test suites testing search, creation, updates, and deletion).
3. Implement support toggling logic.
4. Connect frontend TanStack Query requests to backend Spring Boot REST endpoints.
### Phase 3: Feed, Discussions & Replies (MVP 3)
1. Implement `Discussion` and `DiscussionReply` JPA entities and repositories.
2. Implement domain entities, JPA relations, service layers, and validation rules.
3. Create controllers under `/djp/api/v1/discussions` to fetch discussion lists and handle posting/replying.
4. Connect frontend Feed and Discussions pages.
### Phase 5: Polls & Votes (MVP 4)
1. Implement `Poll` and `PollVote` JPA entities and repositories.
2. Write custom validation constraint to enforce the unique constraint mapping user to poll voting options.
3. Expose `/djp/api/v1/polls` endpoints.
4. Integrate frontend poll voting logic and real-time visualization bindings.
### Phase 6: Petitions, Notifications, and Representatives (MVP 5+)
1. Map JPA entities and repositories for representative tracking and petitions.
2. Map endpoints for representative tracking and petitions.
3. Wire final frontend views.
---
## 6. Verification & Test Plan
All endpoints will be verified through automated tests and strict architectural standards:
* **Unit Tests**: Using JUnit 5 and Mockito to test services and business logic validation in isolation.
* **Integration Tests**: Using `@SpringBootTest` with active H2 profile to execute web layer requests (`MockMvc`) and database assertions.
* **TDD Enforcement**: Write failing integration test cases first (`Red`), verify failure, then write minimal clean code (`Green`) to make tests pass.
* **Mandatory Engineering Gates**:
  * **Layered Architecture**: Strictly isolate `Controller` → `Service` → `Repository`. Never expose JPA database entities directly to controllers; always map via `DTOs`.
  * **Global Exception Handling**: All API errors must be handled centrally via `@ControllerAdvice` returning standardized HTTP error codes and hiding internal stack traces.
  * **OpenAPI Generation**: All endpoints under `/djp/api/v1` must auto-document via `springdoc-openapi`.
  * **Checklist Binding**: Before completing tasks or raising PRs, developers and agents must verify against **[backend-springboot-checklist.md](backend-springboot-checklist.md)**.