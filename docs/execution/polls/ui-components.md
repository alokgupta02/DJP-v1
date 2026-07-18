# 📊 **Civic Polling UX Specification**

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

* **[Common Submission Model](../../architecture/submission-model.md)** — Backend poll entity schema
* **[Design Principles](../../ux/design-principles.md)** — Platform UX rules
* **[Discussion UX Spec](../discussions/ui-components.md)** — Linked debate threads

---