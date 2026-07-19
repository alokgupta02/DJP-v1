# DJP Prototype Environment

This folder (`prototype/`) is a **lightweight, fast-iteration development setup** mirroring the core production functionality of DJP (`/frontend` and `/backend`), stripped of complex production overhead (such as remote OAuth client secrets and telemetry chains). It is designed to let developers and agents rapidly build, iterate, and verify functional features.

---

## 🏗️ Architecture Summary

* **Frontend (`prototype/frontend/`)**: Standalone Vite + React 19 + Tailwind v4 application, running on port `5174`. Proxy pre-configured to forward API requests (`/djp/api/v1`) directly to the local prototype backend.
* **Backend (`prototype/backend/`)**: Spring Boot 3.4.1 Java 21 service running on port `8081` with active `local` profile (`--spring.profiles.active=local`).
* **Database**: Embedded **in-memory H2 database** (`jdbc:h2:mem:djpdb`) with auto-seeding (`data.sql`) populated with sample users (`citizen@djp.org`) and issues on every boot. H2 Console enabled at `http://localhost:8081/h2-console`.
* **Security & Auth**: Includes a `/djp/api/v1/auth/dev-login` endpoint so the frontend can instantly authenticate and interact with APIs without requiring live external Google/GitHub OAuth API keys during iteration.

---

## 🚀 Quickstart Guide

### 1. Start the Prototype Backend
From `prototype/backend/`:
```bash
cd prototype/backend
./mvnw spring-boot:run
# OR using global maven:
mvn spring-boot:run
```
* Backend starts on **`http://localhost:8081`**.
* H2 Database console accessible at `http://localhost:8081/h2-console` (`jdbc:h2:mem:djpdb`, username: `sa`, password: empty).

### 2. Start the Prototype Frontend
From `prototype/frontend/`:
```bash
cd prototype/frontend
npm run dev
```
* Frontend starts on **`http://localhost:5174`** (or 5173 depending on availability).
* Automatically proxies `/djp/api/v1` to `http://localhost:8081`.

### 3. Verify System Health
From `prototype/tests/`:
```bash
cd prototype/tests
node api-health.test.mjs
```
This runs an automated check against the local backend to verify issues retrieval and dev authentication.

---

## 🛠️ Key Differences from Production (`root/`)

| Aspect | Production (`/`) | Prototype (`prototype/`) |
| :--- | :--- | :--- |
| **Ports** | `8080` (BE), `5173` (FE) | `8081` (BE), `5174` (FE) — zero collision |
| **Auth** | OAuth2 Client required (Google/GitHub keys) | Built-in `dev-login` endpoint + mock JWT issuance |
| **Database** | Postgres (`application-prod.yml`) | Embedded H2 + auto-seeded `data.sql` |
| **Telemetry** | Full Prometheus / Actuator metrics | Streamlined dev observability |