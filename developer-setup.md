# 🚀 **DJP Developer Onboarding & Local Setup Guide**

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Guidelines and configuration instructions for onboarding new developers and agents to the DJP monorepo. |
| **📅 Last Updated** | 2026-07-19 |
| **🏷️ Status / Version** | Active SSOT / v1.0.0 |
| **👥 Owner / Worker** | Tech Arch Agent | Antigravity (Gemini) |
| **🔗 Upstream / Dependencies** | [DoD.md](docs/development/DoD.md) |

---

## 🛠️ Prerequisites

Before setting up the repository, make sure your machine has the following tools installed:

- **Java Development Kit (JDK):** Version 21 (GraalVM or Eclipse Temurin recommended).
- **Maven:** Version 3.9+ (for backend compilation).
- **Node.js:** Version 20.x+ (LTS recommended) and **npm** (for frontend package management).
- **Git:** For source control management.

---

## ⚙️ Backend Module Setup (`backend/springboot/`)

The backend is built as a Spring Boot 3.2.x Modular Monolith application.

### 1. Configure Environment Variables
Copy the template file to configure local variables:
```bash
cd backend/springboot/
cp .env.example .env
```

### 2. Spring Profiles Separation
DJP segregates properties across two execution contexts:
- **`local` (Default):** Runs an in-memory H2 database (`jdbc:h2:mem:djpdb`) with active console access. This profile does not require any local database installation.
- **`prod`:** Targets production PostgreSQL/Supabase database instances with strict validation configurations (`ddl-auto: validate`).

### 3. Build & Run Command Queue
Run the following Maven lifecycle commands to verify compilation:
```bash
# Compile code
mvn clean compile

# Execute test suite
mvn test

# Run Spring Boot backend locally
mvn spring-boot:run
```

---

## 💻 Frontend Module Setup (`frontend/`)

The frontend is a Vite + React application structured with a workspace package layout.

### 1. Configure Environment Variables
Copy the frontend variables template:
```bash
cd frontend/
cp .env.example .env
```

### 2. Install Packages & Run Dev Server
Install npm dependencies and boot the local server:
```bash
# Install workspace dependencies
npm install

# Boot local Vite development server
npm run dev
```

---

## 🧪 Quality Gate Verification

Prior to pushing any local branch changes, developers and agents MUST verify compliance against the canonical [Definition of Done](docs/development/DoD.md).
- Ensure all Maven unit/integration tests pass cleanly.
- Keep the codebase knowledge graphs synced using the bulk update command: `graphify update .` (triggered every ~10 tasks completed).
