---
trigger: always_on
description: Ensures UI icon consistency across components and mandates global ID propagation across the codebase when database primary keys or dummy UUIDs are changed.
---

# UI and Data Consistency Guardrail

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Prevents UI icon mismatching and enforces global find-and-replace for ID/UUID changes to prevent broken data links. |
| **📅 Last Updated** | 2026-07-25 |
| **🏷️ Status / Version** | Active SSOT |
| **👥 Owner / Worker** | Worker/Who: [FE Agent | Antigravity (Gemini)] |
| **🔗 Upstream / Dependencies** | [markdown-metadata-guardrail.md](./markdown-metadata-guardrail.md) |

---

## 1. UI Icon & Component Consistency
Whenever introducing a new UI component (e.g., a dropdown menu, a shortcut button, or a new page layout) that references existing entities:
- Always check the existing navigation or primary component (e.g., `sidebar.constants.ts` or `SidebarNav.tsx`) to identify the exact icons and terminology currently used for those entities.
- Ensure the new component perfectly matches the existing icon set (e.g., using `TriangleAlert` for Issues rather than a generic `AlertCircle`) to maintain visual consistency across the platform.

## 2. Global Data ID Propagation
Whenever updating hardcoded primary keys, dummy UUIDs, or authentication-related seed data:
- **Do not limit the change to just the backend SQL seed files.**
- You must globally search the entire repository and propagate the ID changes to:
  - Frontend fallback states (e.g., `localStorage` fallbacks or default dev UUIDs in components).
  - Postman collections (`.json`, `.yaml`) and other API testing artifacts.
  - OpenAPI / Swagger annotations (e.g., `@Schema(example="...")` in DTOs).
  - Any markdown documentation or architecture references that hardcode those IDs.
- **Failure to do this will result in broken API links, frontend 404s, and inconsistent testing data.** Always write a script to perform a global find-and-replace rather than doing it manually in isolated files.
