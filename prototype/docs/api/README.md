# Prototype API & Postman Collection Guide (`web-app = prototype`)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Provides instructions for using and maintaining the canonical Postman v2.1.0 collection for our prototype web application (`web-app = prototype`). |
| **📅 Last Updated** | 2026-07-22 |
| **🏷️ Status / Version** | `Active SSOT` / `v1.0.0` |
| **👥 Owner / Worker** | `Worker/Who: Tech Arch Agent & QA Agent | Antigravity (Gemini)` |
| **🔗 Dependencies** | [djp-prototype.postman_collection.json](./djp-prototype.postman_collection.json), [root collection](../../../docs/api/djp-postman_collection.json) |

---

## 1. Overview & File Location

Our prototype backend (`localhost:8081`) exposes comprehensive REST APIs for Authentication, Civic Issues, Discussions, and Community Polls.

To test these APIs locally via Postman, import:
* **[`djp-prototype.postman_collection.json`](./djp-prototype.postman_collection.json)**

---

## 2. Automatic JWT Authentication (Zero-Config Testing)

1. Run the request **`1. Auth & Identity` → `Dev Login (Issues JWT Token)`**.
2. The pre-packaged post-request script automatically grabs the signed JWT (`token`) from the response body and stores it inside your collection variable `{{jwtToken}}`.
3. You can immediately run `POST /issues`, `POST /discussions`, and `POST /polls` without manually copying or pasting headers!

---

## 3. Mandatory Maintenance Protocol

Whenever you create or modify a `@RestController` inside `prototype/backend/src/main/java/com/djp/backend/controller/`:
1. Add the new API route to `djp-prototype.postman_collection.json` (and mirror it to `../../../docs/api/djp-postman_collection.json`).
2. Provide a working sample JSON body for `POST`/`PUT` requests.
3. Ensure all protected endpoints use the `Authorization: Bearer {{jwtToken}}` collection helper.
