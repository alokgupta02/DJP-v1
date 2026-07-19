# BMAD Environment

This folder (`bmad/`) is a **lightweight, fast-iteration development setup** mirroring the core production functionality of DJP (`/frontend` and `/backend`), copied from the battle-tested `prototype/` environment. It is designed to let developers and agents rapidly build, iterate, and verify functional features.

---

## 🏗️ Architecture Summary

* **Frontend (`bmad/frontend/`)**: Standalone Vite + React 19 + Tailwind v4 application, running on port `5175`. Proxy pre-configured to forward API requests (`/djp/api/v1`) directly to the local bmad backend.
* **Backend (`bmad/backend/`)**: Spring Boot 3.4.1 Java 21 service running on port `8082` with active `local` profile (`--spring.profiles.active=local`).
* **Database**: Embedded **in-memory H2 database** (`jdbc:h2:mem:djpdb`) with auto-seeding (`data.sql`) populated with sample users (`citizen@djp.org`) and issues on every boot. H2 Console enabled at `http://localhost:8082/h2-console`.
* **Security & Auth**: Includes a `/djp/api/v1/auth/dev-login` endpoint so the frontend can instantly authenticate and interact with APIs without requiring live external Google/GitHub OAuth API keys during iteration.

---

## 🚀 Quickstart Guide

### 1. Start the BMAD Backend
From `bmad/backend/`:
```bash
cd bmad/backend
mvn spring-boot:run
```
* Backend starts on **`http://localhost:8082`**.
* H2 Database console accessible at `http://localhost:8082/h2-console` (`jdbc:h2:mem:djpdb`, username: `sa`, password: empty).

### 2. Start the BMAD Frontend
From `bmad/frontend/`:
```bash
cd bmad/frontend
npm install   # first time only
npm run dev
```
* Frontend starts on **`http://localhost:5175`**.
* Automatically proxies `/djp/api/v1` to `http://localhost:8082`.

### 3. Verify System Health
From `bmad/tests/`:
```bash
node bmad/tests/api-health.test.mjs
```
This runs an automated check against the local backend to verify issues retrieval and dev authentication.

---

## 🛠️ Key Differences from Production and Prototype

| Aspect | Production (`/`) | Prototype (`prototype/`) | BMAD (`bmad/`) |
| :--- | :--- | :--- | :--- |
| **Ports** | `8080` (BE), `5173` (FE) | `8081` (BE), `5174` (FE) | `8082` (BE), `5175` (FE) |
| **Auth** | OAuth2 (Google/GitHub keys) | Built-in `dev-login` + JWT | Built-in `dev-login` + JWT |
| **Database** | Postgres | Embedded H2 + auto-seeded | Embedded H2 + auto-seeded |
| **Source** | Production root | Production root | Copied from `prototype/` |
