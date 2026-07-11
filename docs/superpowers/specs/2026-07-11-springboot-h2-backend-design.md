# Spring Boot + H2 Backend Design Specification

**Author**: Principal Technical Architect  
**Status**: Draft for Review  
**Date**: 2026-07-11  

---

## 1. Goal & Architecture Overview

The objective is to implement a robust, lightweight, and test-driven backend for the citizen application using **Spring Boot 3.x**, **Java 21**, and an embedded **H2 Database**.

To support authentication, the system will use **OAuth2 (Google and LinkedIn)**. The application will leverage standard Spring Security and Spring Data JPA to simplify database mapping. By utilizing an embedded H2 database with local files, we provide a zero-setup local development experience that can be seamlessly migrated to PostgreSQL/Supabase in the future.

### System Components
* **REST APIs**: Built with Spring Web (REST controllers), conforming to RESTful standards under the `/api/v1` namespace.
* **Database**: Embedded H2 Database. Schema setup and initial seeding are managed dynamically on application startup via `schema.sql` and `data.sql`.
* **Security & Auth**: Spring Security configuration acting as an OAuth2 Login Client (Authorization Code Flow) that persists authenticated profiles into the local `users` table and issues lightweight JWTs to the React frontend.

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

## 3. Database Schema Design (H2 SQL)

The following tables will be declared inside `schema.sql` to represent the application models.

```sql
-- 1. Users table (stores OAuth profiles mapped from Google/LinkedIn)
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    provider VARCHAR(50) NOT NULL, -- 'GOOGLE', 'LINKEDIN'
    provider_id VARCHAR(255) NOT NULL,
    location VARCHAR(150),
    reputation_score INT DEFAULT 0,
    joined_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(20) DEFAULT 'CITIZEN',
    UNIQUE(provider, provider_id)
);

-- 2. Issues table
CREATE TABLE issues (
    id VARCHAR(36) PRIMARY KEY,
    author_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    priority VARCHAR(20) NOT NULL, -- 'LOW', 'MEDIUM', 'HIGH', 'URGENT', 'CRITICAL'
    status VARCHAR(20) DEFAULT 'REPORTED', -- 'REPORTED', 'VERIFIED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'
    workflow_step INT DEFAULT 0,
    location VARCHAR(150),
    supports_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Discussions table
CREATE TABLE discussions (
    id VARCHAR(36) PRIMARY KEY,
    author_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    related_issue_id VARCHAR(36),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (related_issue_id) REFERENCES issues(id) ON DELETE SET NULL
);

-- 4. Discussion replies table
CREATE TABLE discussion_replies (
    id VARCHAR(36) PRIMARY KEY,
    discussion_id VARCHAR(36) NOT NULL,
    author_id VARCHAR(36) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (discussion_id) REFERENCES discussions(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Polls table
CREATE TABLE polls (
    id VARCHAR(36) PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    options VARCHAR_ARRAY NOT NULL, -- Array representation for poll answers
    status VARCHAR(20) DEFAULT 'ACTIVE', -- 'ACTIVE', 'CLOSED'
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Poll votes table (ensures exactly 1 vote per user per poll)
CREATE TABLE poll_votes (
    id VARCHAR(36) PRIMARY KEY,
    poll_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    option_index INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(poll_id, user_id),
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 4. REST API Endpoint Contracts

All controllers will map requests under `/api/v1`. Secured endpoints require a valid Bearer JWT.

### A. Authentication (`/api/v1/auth`)
* `GET /login/oauth2/code/google` & `linkedin` (Default Spring Security Callback URLs)
  * Invoked by the OAuth provider. Spring Security intercepts, grabs user info, registers/updates the user in the database, and redirects the client to the frontend with an access JWT.
* `GET /api/v1/auth/me` *(Secured)*
  * **Response**: `200 OK` with User model representation.

### B. Issues (`/api/v1/issues`)
* `GET /api/v1/issues` *(Secured)*
  * **Query Parameters**: `category` (optional), `status` (optional), `priority` (optional)
  * **Response**: `200 OK` listing match results.
* `POST /api/v1/issues` *(Secured)*
  * **Request Payload**:
    ```json
    {
      "title": "Water Pipe Leakage",
      "description": "Clean water wasting on Main street for 2 days.",
      "category": "Water",
      "priority": "HIGH",
      "location": "South Ward"
    }
    ```
  * **Response**: `201 Created` with generated Issue DTO.
* `GET /api/v1/issues/{id}` *(Secured)*
  * **Response**: `200 OK` with full issue details, or `404 Not Found`.
* `PUT /api/v1/issues/{id}` *(Secured)*
  * **Request Payload**: Updates fields like `status` or `workflowStep`.
  * **Response**: `200 OK` with updated Issue DTO.
* `DELETE /api/v1/issues/{id}` *(Secured)*
  * **Response**: `204 No Content` (Permitted only for the issue's author or Admins).
* `POST /api/v1/issues/{id}/support` *(Secured)*
  * Toggles support state. Increments/decrements support count in a transactional block.
  * **Response**: `200 OK` returning updated support count.

---

## 5. Phased Implementation Plan

We adopt a "Working Model First" (MVP) approach. Each phase is completed using Test-Driven Development (TDD) before implementing production logic.

### Phase 1: Project Setup, H2 Integration & OAuth2 (MVP 1)
1. Initialize the Spring Boot maven project with security, web, data-jpa, validation, and H2 dependencies.
2. Configure `schema.sql` and `data.sql` to initialize schema and seed mock users.
3. Configure Spring Security for OAuth2 Login with Google and LinkedIn.
4. Implement JWT helper to parse, generate, and validate authorization tokens.
5. Create `/api/v1/auth/me` endpoint to verify current user context.
6. Verify OAuth2 flows locally using integration tests.

### Phase 2: Issues CRUD (MVP 2)
1. Add the `issues` table definition and mock seed data.
2. Implement `Issue` database entity and `IssueRepository`.
3. Create `IssueService` and `IssueController` using TDD (write unit/integration test suites testing search, creation, updates, and deletion).
4. Implement support toggling logic.
5. Connect frontend TanStack Query requests to backend Spring Boot REST endpoints.

### Phase 3: Feed, Discussions & Replies (MVP 3)
1. Define `discussions` and `discussion_replies` in H2 schema files.
2. Implement domain entities, JPA relations, service layers, and validation rules.
3. Create controllers under `/api/v1/discussions` to fetch discussion lists and handle posting/replying.
4. Connect frontend Feed and Discussions pages.

### Phase 5: Polls & Votes (MVP 4)
1. Implement `polls` and `poll_votes` tables.
2. Write custom validation constraint to enforce the unique constraint mapping user to poll voting options.
3. Expose `/api/v1/polls` endpoints.
4. Integrate frontend poll voting logic and real-time visualization bindings.

### Phase 6: Petitions, Notifications, and Representatives (MVP 5+)
1. Construct supporting database schemas.
2. Map endpoints for representative tracking and petitions.
3. Wire final frontend views.

---

## 6. Verification & Test Plan

All endpoints will be verified through automated tests:
* **Unit Tests**: Using JUnit 5 and Mockito to test services and business logic validation in isolation.
* **Integration Tests**: Using `@SpringBootTest` with active H2 profile to execute web layer requests (`MockMvc`) and database assertions.
* **TDD Enforcement**: Write failing integration test cases first, verify failure, then write minimal clean code to make tests pass.
