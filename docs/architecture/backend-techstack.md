# Modular Microservices Backend Architecture & Tech Stack

## 1. System Overview
Our backend is built as **Modular Microservices**, allowing each service to scale independently.

## 2. Global Tech Stack
- **API Gateway / Router**: Spring Cloud Gateway / Kong
- **Service Communication**: REST (JSON) + Kafka / RabbitMQ (Async events)
- **Containerization**: Docker & Kubernetes

## 3. Microservice Definitions

### A. Auth Service (`backend/auth-service`)
- **Language / Framework**: Java 21 + Spring Boot 3
- **Database**: H2 (Local) / Supabase PostgreSQL (Prod)
- **Responsibility**: OAuth2 Login, JWT issuance, session management.

### B. Core Service (`backend/core-service`)
- **Language / Framework**: Java 21 + Spring Boot 3
- **Database**: H2 (Local) / Supabase PostgreSQL (Prod)
- **Responsibility**: Citizen discussions, polls, and issues.

### C. AI / Analytics Service (`backend/ai-service`)
- **Language / Framework**: Python 3.11 + FastAPI
- **Database / Vector Store**: pgvector / Supabase
- **Responsibility**: LLM processing, text summarization, recommendations, and semantic search.
