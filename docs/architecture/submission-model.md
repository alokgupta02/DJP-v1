# 📦 **Common Submission Model Architecture**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Define the unified polymorphic data structure for all civic content types |
| **👥 Audience** | Developers, Architects, API Consumers |
| **📌 Status** | `Stable` |

---

## 🌟 Overview

The **Common Submission Model** provides a unified data structure for all civic content types in the Digital Janata platform, enabling consistent handling across different civic models while supporting type-specific schema extensions.

---

## 🧱 Core Base Model

All content types inherit from a shared polymorphic base entity:

| Field Name | Type | Description |
| :--- | :--- | :--- |
| **`id`** | `UUID` | Primary unique identifier |
| **`created_at`** | `Timestamp` | Creation timestamp in UTC |
| **`updated_at`** | `Timestamp` | Last modification timestamp in UTC |
| **`author_id`** | `UUID` | Reference to the user who authored the submission |
| **`status`** | `Enum` | Lifecycle status (`active` / `archived` / `deleted`) |

---

## 📂 Content Types & Specific Extensions

### 1️⃣ 🚨 Issue (`type: 'issue'`)
* **🎯 Purpose:** Report problems or concerns in public infrastructure and governance.

| Field | Type | Description |
| :--- | :--- | :--- |
| **`title`** | `String` | Concise headline summary of the issue |
| **`description`** | `Text` | Detailed context and evidence |
| **`category`** | `Enum` | `infrastructure`, `policy`, `safety`, `sanitation`, etc. |
| **`location`** | `GeoJSON` | Geographic coordinates, city, ward, or district |
| **`severity`** | `Enum` | `Low` / `Medium` / `High` / `Critical` |
| **`status`** | `Enum` | `Open` / `In Progress` / `Resolved` / `Closed` |
| **`attachments`** | `Array<URL>` | Evidence photos, PDFs, or documents |
| **`tags`** | `Array<String>` | Searchable keywords |

---

### 2️⃣ 💬 Discussion (`type: 'discussion'`)
* **🎯 Purpose:** Facilitate public conversation around civic topics or specific issues.

| Field | Type | Description |
| :--- | :--- | :--- |
| **`title`** | `String` | Discussion heading |
| **`content`** | `Text` | Main thread prompt or argument |
| **`related_issue_id`** | `UUID (Optional)` | Reference to a linked issue |
| **`replies_count`** | `Integer` | Total nested comments/replies |
| **`tags`** | `Array<String>` | Categorization tags |

---

### 3️⃣ 📊 Poll (`type: 'poll'`)
* **🎯 Purpose:** Collect structured public sentiment and votes.

| Field | Type | Description |
| :--- | :--- | :--- |
| **`question`** | `String` | Main polling question |
| **`options`** | `Array<String>` | Available ballot choices |
| **`option_votes`** | `Array<Integer>` | Tally per choice index |
| **`start_date` / `end_date`** | `Timestamp` | Polling window |
| **`results_visibility`** | `Enum` | `public` / `participants_only` |

---

### 4️⃣ 🗳️ Poll Vote (`type: 'poll_vote'`)
* **🎯 Purpose:** Record an individual citizen's vote inside a poll.

| Field | Type | Description |
| :--- | :--- | :--- |
| **`poll_id`** | `UUID` | Target poll ID |
| **`user_id`** | `UUID` | Voter ID |
| **`option_index`** | `Integer` | Selected option index (`0`-indexed) |

---

## ✅ Validation & API Contracts

* [ ] All required base and type fields must pass strict JSON Schema / Zod validation.
* [ ] Date fields must be valid ISO 8601 UTC timestamps.
* [ ] Location coordinates must conform to standard GeoJSON structures.
* [ ] File attachments enforce strict mime-type checks and size limits (`<= 10MB`).

---

## 📚 Related Documentation

* **[Vision](../vision/party-vision.md)** — Core platform vision
* **[Issue Spec](../ux/issue.md)** — UX breakdown of issues
* **[Discussion Spec](../ux/discussion.md)** — UX breakdown of discussions
* **[Poll Spec](../ux/poll.md)** — UX breakdown of polls

---