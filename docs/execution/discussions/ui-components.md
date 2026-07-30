# 💬 **Civic Discussion UX Specification**

---

| Metadata | Value |
| :--- | :--- |
| **📅 Last Updated** | 2026-07-18 20:30 |
| **📌 Status** | `Stable` |
| **🏷️ Version** | `v1.0.0` |
| **👥 Owner** | `UX / FE Lead` |
| **🔗 Dependencies** | [../../architecture/submission-model.md](../../architecture/submission-model.md), [../../ux/design-principles.md](../../ux/design-principles.md), [../../architecture/global-config.yaml](../../architecture/global-config.yaml) |

---

## 🌟 Overview

The **Discussion UX Specification** outlines the structure, interaction patterns, and moderation guidelines for public conversation threads within the Digital Janata platform.

---

## 📑 Data Schema & UI Fields

| Field Name | Type | UI Presentation & Rules |
| :--- | :--- | :--- |
| **`title`** | `String` | Bold headline input clearly framing the conversation topic |
| **`content`** | `Rich Text` | Main thread argument with markdown styling & mentions |
| **`related_issue_id`** | `UUID (Optional)` | Embedded pill linking back to an associated governance issue |
| **`author`** | `User Object` | Avatar, username, and community reputation badge |
| **`replies`** | `Array<Comment>` | Nested comment tree with upvote/reply actions |
| **`tags`** | `Array<String>` | Searchable category pills |
| **`status`** | `Enum` | `Active` (open for replies) or `Archived` (read-only) |

---

## 💡 UX & Content Guidelines

* [ ] Encourage clear, constructive, and accessible civic language.
* [ ] Support `@mentions` to invite relevant representatives or community members.
* [ ] Automatically link discussions to related polls or issues.
* [ ] Provide clean visual indicators when a discussion transitions to `Archived`.

---

## 📚 Related Documentation

* **[Common Submission Model](../../architecture/submission-model.md)** — Backend discussion schema
* **[Design Principles](../../ux/design-principles.md)** — Platform UX rules
* **[Issue UX Spec](../issues/ui-components.md)** — Linked issue reports
* **[Poll UX Spec](../polls/ui-components.md)** — Linked civic polls

---