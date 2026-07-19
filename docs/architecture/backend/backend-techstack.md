# 🛠️ **Modular Microservices Backend Architecture & Tech Stack**

---

| Metadata | Value |
| :--- | :--- |
| **📅 Last Updated** | 2026-07-18 20:25 |
| **📌 Status** | `Stable` |
| **🏷️ Version** | `v1.0.0` |
| **👥 Owner** | `Principal Technical Architect` |
| **🔗 Dependencies** | [overview.md](overview.md), [backend-design.md](backend-design.md), [global-config.yaml](../../../global-config.yaml) |

---

## 1. Global Tech Stack & Constants

Our backend is structured as **Modular Microservices** communicating via REST APIs under the standardized namespace defined in **[global-config.yaml](../../../global-config.yaml)** (`/djp/api/v1`).

* **Core Language**: Java 21 (LTS)
* **Application Framework**: Spring Boot 3.x (Spring Web, Spring Security OAuth2 Client, Spring Data JPA)
* **API Documentation**: OpenAPI 3.0 via `springdoc-openapi` (auto-generated from `/djp/api/v1` endpoints)
* **Database & Persistence**: H2 In-Memory (Local Profile) / Supabase PostgreSQL with `pgvector` (Production Profile)
* **API Gateway / Router**: Spring Cloud Gateway / Kong
* **Asynchronous Event Bus**: Kafka / RabbitMQ (for cross-service event notifications)
* **Containerization**: Docker & Kubernetes

---

## 2. Microservice Technology Matrix

| Microservice | Directory Path | Language / Framework | Database / Store | Primary Responsibility |
| :--- | :--- | :--- | :--- | :--- |
| **Auth Service** | `backend/auth-service` | Java 21 + Spring Boot 3 | H2 / Supabase PostgreSQL | OAuth2 Login (Google/LinkedIn), JWT issuance, user profile persistence |
| **Core Service** | `backend/core-service` | Java 21 + Spring Boot 3 | H2 / Supabase PostgreSQL | Citizen issues, discussions, feed, and poll voting |
| **AI / Analytics** | `backend/ai-service` | Python 3.11 + FastAPI | Supabase PostgreSQL + `pgvector` | LLM processing, text summarization, recommendations, and semantic search |

---

> [!NOTE]
> For complete engineering specifications, package structures, and REST API implementation plans, refer to **[backend-design.md](backend-design.md)**. For centralized service ports and base paths, see **[global-config.yaml](../../../global-config.yaml)**.
