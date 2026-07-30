# Canonical Postman Collection Guide & API Maintenance Protocol

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Provides instructions for importing, configuring, and maintaining the canonical Postman v2.1.0 collection covering all DJP platform endpoints. |
| **📅 Last Updated** | 2026-07-22 |
| **🏷️ Status / Version** | `Active SSOT` / `v1.0.0` |
| **👥 Owner / Worker** | `Worker/Who: Tech Arch Agent & QA Agent | Antigravity (Gemini)` |
| **🔗 Dependencies** | [djp-postman_collection.json](./djp-postman_collection.json), [prototype collection](../../prototype/docs/api/djp-prototype.postman_collection.json), [api-spec.yaml](./api-spec.yaml) |

---

## 1. Overview & File Locations

To ensure rapid debugging, manual verification, and API consistency across both our **Prototype** (`web-app = prototype`) and production Spring Boot backend, we maintain two identical, synchronized Postman collection files:

* **Monorepo Root SSOT:** [`docs/api/djp-postman_collection.json`](./djp-postman_collection.json)
* **Prototype Domain SSOT:** [`prototype/docs/api/djp-prototype.postman_collection.json`](../../prototype/docs/api/djp-prototype.postman_collection.json)

---

## 2. Quickstart & Import Instructions

1. **Import into Postman:**
   * Open Postman → Click **Import** → Select `docs/api/djp-postman_collection.json`.
2. **Collection Variables (Pre-configured):**
   * `baseUrl`: Defaults to `http://localhost:8081/djp/api/v1` (or `http://localhost:8080` depending on target profile).
   * `jwtToken`: Stored automatically by our test script when you run **Dev Login**.
3. **Automatic JWT Session Capture:**
   * Run **`1. Auth & Identity` → `Dev Login (Issues JWT Token)`**.
   * A post-request test script (`if (pm.response.code === 200) ...`) automatically extracts `token` from the JSON response and stores it in your collection variable `jwtToken`.
   * All subsequent protected requests (`POST /issues`, `POST /discussions`, `POST /polls`) inherit `Authorization: Bearer {{jwtToken}}` automatically!

---

## 3. Endpoints Covered

| Folder | Request Name | Method | Endpoint URL | Protected (JWT) |
| :--- | :--- | :--- | :--- | :--- |
| **1. Auth & Identity** | Dev Login | `POST` | `/auth/dev-login?email=citizen@djp.org` | ❌ No (Issues JWT) |
| | Get Current Profile | `GET` | `/auth/me` | ✅ Yes |
| | Google OAuth2 Redirect | `GET` | `/auth/google` | ❌ No |
| | GitHub OAuth2 Redirect | `GET` | `/auth/github` | ❌ No |
| **2. Civic Issues** | List All Issues | `GET` | `/issues` | ❌ No |
| | Get Issue By ID | `GET` | `/issues/:id` | ❌ No |
| | Create New Issue | `POST` | `/issues` | ✅ Yes |
| **3. Discussions** | List All Discussions | `GET` | `/discussions` | ❌ No |
| | Get Discussion By ID | `GET` | `/discussions/:id` | ❌ No |
| | Create Discussion | `POST` | `/discussions` | ✅ Yes |
| **4. Polls & Voting** | List All Polls | `GET` | `/polls` | ❌ No |
| | Get Poll By ID | `GET` | `/polls/:id` | ❌ No |
| | Create New Poll | `POST` | `/polls` | ✅ Yes |
| **5. Observability** | Actuator Health Check | `GET` | `http://localhost:8081/actuator/health` | ❌ No |

---

## 4. Mandatory Maintenance Rule (For AI Agents & Developers)

Whenever any agent (`BE Agent`, `Tech Arch Agent`, `TL Agent`) or developer introduces a new Spring Boot `@RestController` or `@RequestMapping` endpoint anywhere in the repository (`backend/` or `prototype/backend/`):
1. **Update Collection Files Immediately:** You MUST add the corresponding request definition (`method`, `header`, `body`, and variable references) to both [`djp-postman_collection.json`](./djp-postman_collection.json) and [`prototype/docs/api/djp-prototype.postman_collection.json`](../../prototype/docs/api/djp-prototype.postman_collection.json).
2. **Verify Request Execution:** Test the endpoint locally against `http://localhost:8081` to verify that sample payloads serialize and deserialize cleanly without errors.
3. **Keep Docs in Sync:** Update the endpoint table in this guide and `api-spec.yaml`.
