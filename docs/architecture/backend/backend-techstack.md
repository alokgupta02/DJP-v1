# 🛠️ **Modular Monolith Backend Architecture & Tech Stack**

---

| Metadata | Value |
| :--- | :--- |
| **📅 Last Updated** | 2026-07-19 |
| **📌 Status** | `Stable` |
| **🏷️ Version** | `v2.0.0` |
| **👥 Owner** | `Principal Technical Architect` |
| **🔗 Dependencies** | [overview.md](overview.md), [backend-design.md](backend-design.md), [global-config.yaml](../../../global-config.yaml), [decisions.md](../../vision/decisions.md) |

---

## 1. Global Tech Stack & Constants

Our backend is structured as a **Modular Monolith** per [ADR-008](../../vision/decisions.md#-adr-008-modular-monolith-for-mvp), exposing REST APIs under the standardized namespace defined in **[global-config.yaml](../../../global-config.yaml)** (`/djp/api/v1`).

* **Core Language**: Java 21 (LTS)
* **Application Framework**: Spring Boot 3.x (Spring Web, Spring Security OAuth2 Client, Spring Data JPA)
* **API Documentation**: OpenAPI 3.0 via `springdoc-openapi` (auto-generated from `/djp/api/v1` endpoints)
* **Database & Persistence**: H2 In-Memory (Local Profile) / Supabase PostgreSQL with `pgvector` (Production Profile)
* **Asynchronous Event Handling**: Spring Events / ApplicationEventPublisher (deferring Kafka/RabbitMQ until scale requirements)
* **Containerization**: Docker & Kubernetes

---

## 2. Monolithic Module Matrix

The code is organized into logical modules within a single Spring Boot application at `backend/springboot/`:

| Module / Package | Language / Framework | Database / Store | Primary Responsibility |
| :--- | :--- | :--- | :--- |
| **com.djp.backend.security** (Auth) | Java 21 + Spring Boot 3 | H2 / Supabase PostgreSQL | OAuth2 Login (Google/Apple), JWT issuance, user profile persistence |
| **com.djp.backend.controller/service** (Core) | Java 21 + Spring Boot 3 | H2 / Supabase PostgreSQL | Citizen issues, discussions, feed, and poll voting |
| **com.djp.backend.ai** (AI / Analytics) | Java 21 + Spring Boot 3 (or future sidecar integration) | Supabase PostgreSQL + `pgvector` | LLM processing, text summarization, recommendations, and semantic search |

---

> [!NOTE]
> For complete engineering specifications, package structures, and REST API implementation plans, refer to **[backend-design.md](backend-design.md)**. For centralized service ports and base paths, see **[global-config.yaml](../../../global-config.yaml)**.
