# Architecture: Comprehensive User Interactions

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Defines architecture for upvotes/downvotes, follows, nested comments, and notifications |
| **📅 Last Updated** | 2026-07-26 |
| **🏷️ Status / Version** | Active SSOT |
| **👥 Owner / Worker** | Worker/Who: Tech Arch Agent |
| **🔗 Upstream / Dependencies** | [PRD.md](./PRD.md) |

---

## 1. System Boundaries
- **Frontend (React)**: Component updates across `Comments.tsx`, Entity details pages, and User profiles to support optimistic UI updates for votes and follows. Web Share API for sharing.
- **Backend (Spring Boot + PostgreSQL)**: New JPA Entities (`Comment`, `Vote`, `Follow`, `Notification`). Repositories and REST Controllers for interaction endpoints.

## 2. Data Models

### A. Comment Entity
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | Unique ID |
| `content` | TEXT | Not Null | The comment text |
| `author_id` | UUID | FK -> Users | Who wrote the comment |
| `parent_id` | UUID | FK -> Comments | Nullable. Allows infinite nesting. |
| `entity_type` | VARCHAR | Not Null | 'ISSUE', 'DISCUSSION', 'POLL' |
| `entity_id` | UUID | Not Null | The ID of the target entity |
| `score` | INT | Default 0 | Net score (upvotes - downvotes) |
| `created_at` | TIMESTAMP | Not Null | Creation time |

### B. Vote Entity (Like/Dislike)
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | Unique ID |
| `user_id` | UUID | FK -> Users | The voter |
| `entity_type` | VARCHAR | Not Null | 'COMMENT', 'ISSUE', 'DISCUSSION' |
| `entity_id` | UUID | Not Null | Target entity ID |
| `value` | INT | Not Null | 1 (Upvote) or -1 (Downvote) |
*(Unique Constraint on `user_id`, `entity_type`, `entity_id` to prevent double-voting)*

### C. Follow Entity (Subscriptions)
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | Unique ID |
| `follower_id` | UUID | FK -> Users | The user subscribing |
| `target_type` | VARCHAR | Not Null | 'USER', 'ISSUE', 'DISCUSSION' |
| `target_id` | UUID | Not Null | The target being followed |
*(Unique Constraint on `follower_id`, `target_type`, `target_id`)*

### D. Notification Entity
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | Unique ID |
| `recipient_id` | UUID | FK -> Users | User receiving the notification |
| `actor_id` | UUID | FK -> Users | User triggering the notification |
| `type` | VARCHAR | Not Null | 'REPLY', 'FOLLOW' |
| `entity_id` | UUID | Not Null | ID of the related comment/user |
| `is_read` | BOOLEAN | Default False | Read status |

## 3. Interaction Flows

### Voting (Upvote / Downvote)
1. User clicks Upvote arrow on a Comment.
2. Frontend optimistically increments the score locally.
3. Frontend sends `POST /api/v1/votes` with `{ entityId, entityType, value: 1 }`.
4. Backend inserts or updates `Vote` table.
5. Backend recalculates and updates `score` on the `Comment`.

### Following
1. User clicks "Follow" on a Leader's profile.
2. Frontend updates button to "Following".
3. Frontend sends `POST /api/v1/follows` with `{ targetId, targetType: "USER" }`.
4. Backend creates `Follow` and creates a `Notification` of type `FOLLOW` for the Leader.

### Sharing
1. User clicks "Share".
2. Frontend invokes `navigator.share()` if supported, otherwise copies the URL (e.g. `https://djp.org/issues/{id}#comment-{id}`) to clipboard and displays a Toast notification.
