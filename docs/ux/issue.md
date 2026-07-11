# 🚨 **Civic Issue Reporting UX Specification**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Standardized UX workflow and schema presentation for reporting and tracking public civic concerns |
| **👥 Audience** | Developers, Designers, Content Creators |
| **📌 Status** | `Stable` |

---

## 🌟 Overview

The **Issue Reporting UX Specification** establishes how citizens report, verify, and track public governance concerns across their local jurisdictions.

---

## 📑 Issue Reporting Fields & UI Presentation

| Field Name | Type | UI Presentation & UX Rules |
| :--- | :--- | :--- |
| **`title`** | `String` | Concise headline summarizing the civic issue (`max 100 chars`) |
| **`description`** | `Rich Text` | Full context, background, and evidence |
| **`category`** | `Select / Pill` | `Infrastructure`, `Sanitation`, `Safety`, `Education`, `Policy` |
| **`location`** | `Map Picker` | Interactive map pin + ward/district selector |
| **`severity`** | `Badge` | Color-coded impact indicator (`Low` / `Medium` / `High` / `Critical`) |
| **`status`** | `Status Pill` | Workflow tracker (`Open` → `In Progress` → `Resolved`) |
| **`attachments`** | `File Uploader` | Photo/document proof uploader with drag-and-drop preview |
| **`tags`** | `Tag Input` | Keyword tags for community discovery |

---

## 💡 Reporting UX Best Practices

* [ ] Provide auto-suggestions for duplicate or existing issues near the citizen's location.
* [ ] Display explicit progress milestones as an issue moves from `Open` to `Resolved`.
* [ ] Allow community verification upvotes to prioritize high-impact issues.

---

## 📚 Related Documentation

* **[Common Submission Model](../architecture/submission-model.md)** — Backend issue entity schema
* **[Design Principles](design-principles.md)** — Platform UX rules
* **[Discussion UX Spec](discussion.md)** — Linked community threads

---