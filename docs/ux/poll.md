# 📊 **Civic Polling UX Specification**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Standardized format and UX interaction patterns for creating and voting in civic polls |
| **👥 Audience** | Developers, Designers, Content Creators |
| **📌 Status** | `Stable` |

---

## 🌟 Overview

The **Civic Polling UX Specification** establishes how public polls are presented, voted upon, and visualized across the Digital Janata platform.

---

## 📑 Poll Schema & UI Representation

| Field Name | Type | UI Presentation & UX Rules |
| :--- | :--- | :--- |
| **`question`** | `String` | Clear, unbiased prompt question presented at the top of the ballot card |
| **`options`** | `Array<String>` | Radio buttons or interactive vote option cards (`2 to 10 choices`) |
| **`option_votes`** | `Array<Integer>` | Animated percentage progress bar rendered after voting |
| **`start_date` / `end_date`** | `Timestamp` | Countdown timer badge showing remaining voting window |
| **`results_visibility`** | `Enum` | `Public` (real-time results) or `Participants Only` (hidden until vote cast) |
| **`status`** | `Status Badge` | `Active` (open for ballots) or `Closed` (final results published) |

---

## 💡 Polling UX Best Practices

* [ ] Ensure all ballot questions are phrased neutrally without leading language.
* [ ] Display immediate animated progress bar feedback once a vote is cast.
* [ ] Prevent double-voting via authenticated voter token verification.

---

## 📚 Related Documentation

* **[Common Submission Model](../architecture/submission-model.md)** — Backend poll entity schema
* **[Design Principles](design-principles.md)** — Platform UX rules
* **[Discussion UX Spec](discussion.md)** — Linked debate threads

---