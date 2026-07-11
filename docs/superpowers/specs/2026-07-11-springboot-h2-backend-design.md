# 🍃 **Spring Boot + H2 Backend Design Specification**

---

| Metadata | Details |
| :--- | :--- |
| **👤 Author** | Principal Technical Architect |
| **📌 Status** | `Draft for Review` |
| **📅 Date** | `2026-07-11` |

---

## 🌟 1. Goal & Architecture Overview

The objective is to implement a robust, lightweight, and test-driven backend for the citizen application using **Spring Boot 3.x**, **Java 21**, and an embedded **H2 Database**.

To support authentication, the system uses **OAuth2 (Google & LinkedIn)**. By utilizing an embedded H2 database with local files (`schema.sql`, `data.sql`), we provide a zero-setup local development experience that can be seamlessly migrated to PostgreSQL / Supabase.

---

### 🧱 Core Architectural Components

| Component Layer | Technology & Specification |
| :--- | :--- |
| **REST API Layer** | Spring Web MVC REST Controllers conforming to `/api/v1/*` contracts |
| **Persistence Layer**| Embedded H2 SQL Database managed dynamically via `schema.sql` and Spring Data JPA |
| **Security & Auth** | Spring Security OAuth2 Login Client issuing stateless JWT access tokens |

---

## 🏗️ 2. Directory & Package Structure (`backend/springboot`)

```text
backend/springboot/
├── pom.xml                                 # Maven dependencies & build config
└── src/
    ├── main/
    │   ├── java/com/djp/backend/
    │   │   ├── BackendApplication.java     # Spring Boot entry point
    │   │   ├── config/                     # Spring Security, OAuth2 & JWT configuration
    │   │   ├── controller/                 # REST API Controllers (/api/v1/*)
    │   │   ├── dto/                        # Request & Response DTO records
    │   │   ├── exception/                  # GlobalExceptionHandler (@ControllerAdvice)
    │   │   ├── model/                      # JPA Entities (@Entity)
    │   │   ├── repository/                 # Spring Data JPA interfaces
    │   │   └── service/                    # Domain business logic services
    │   └── resources/
    │       ├── application.yml             # App configuration & H2 profiles
    │       ├── schema.sql                  # DDL schema initialization
    │       └── data.sql                    # Seed data for local testing
    └── test/                               # JUnit 5 & MockMvc integration tests
```

---

## 🗄️ 3. Database Schema Specification (`schema.sql`)

```sql
-- 1. Users Table (OAuth2 Authenticated Profiles)
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    provider VARCHAR(50) NOT NULL,
    provider_id VARCHAR(255) NOT NULL,
    location VARCHAR(150),
    reputation_score INT DEFAULT 0,
    joined_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(20) DEFAULT 'CITIZEN',
    UNIQUE(provider, provider_id)
);

-- 2. Issues Table (Public Civic Reports)
CREATE TABLE issues (
    id VARCHAR(36) PRIMARY KEY,
    author_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    priority VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'REPORTED',
    workflow_step INT DEFAULT 0,
    location VARCHAR(150),
    supports_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🔌 4. REST API Endpoint Contracts (`/api/v1`)

| Method | Endpoint Path | Auth Required | Description |
| :---: | :--- | :---: | :--- |
| `GET` | `/api/v1/auth/me` | ✅ Bearer JWT | Returns current authenticated user profile |
| `GET` | `/api/v1/issues` | ✅ Bearer JWT | Lists civic issues with optional filter queries |
| `POST` | `/api/v1/issues` | ✅ Bearer JWT | Creates a new civic issue report (`201 Created`) |
| `GET` | `/api/v1/issues/{id}`| ✅ Bearer JWT | Fetches detailed issue with comment tree |
| `POST` | `/api/v1/issues/{id}/support`| ✅ Bearer JWT | Toggles upvote/support count transactionally |

---

## 📅 5. Phased TDD Implementation Roadmap

```
 [ Phase 1: Security & OAuth2 MVP ] ──► [ Phase 2: Issues CRUD ] ──► [ Phase 3: Feed & Discussions ] ──► [ Phase 4: Polls ]
```

1. **Phase 1 (Security MVP):** OAuth2 authentication pipeline, JWT generation, H2 embedded startup.
2. **Phase 2 (Issues CRUD):** `IssueRepository`, TDD service logic, and REST controllers.
3. **Phase 3 (Discussions):** Nested comment replies and thread search APIs.
4. **Phase 4 (Polls & Voting):** Unique vote constraints and real-time tally responses.

---

## ✅ 6. Quality & Verification Plan

* [ ] **Automated Unit Tests:** JUnit 5 + Mockito verifying service validation rules.
* [ ] **Integration Tests:** `@SpringBootTest` + `MockMvc` testing full HTTP serialization against H2.
* [ ] **TDD Strictness:** Failing integration test written first before any service implementation.

---
