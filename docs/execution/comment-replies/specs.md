# Engineering Specifications: Comprehensive Interactions

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | File-by-file surgical implementation guide for the Interactions feature |
| **📅 Last Updated** | 2026-07-26 |
| **🏷️ Status / Version** | Active SSOT |
| **👥 Owner / Worker** | Worker/Who: TL Agent |
| **🔗 Upstream / Dependencies** | [architecture.md](./architecture.md) |

---

## 1. Backend Implementation (Spring Boot)

### [NEW] `backend/src/main/java/com/djp/backend/model/Comment.java`
- JPA Entity. Fields: `id` (UUID), `content` (TEXT), `author` (User), `parentComment` (Comment, nullable), `entityType` (String), `entityId` (UUID), `score` (Integer), `createdAt`, `updatedAt`.
- Use `@ManyToOne` for `author` and `parentComment`.

### [NEW] `backend/src/main/java/com/djp/backend/model/Vote.java`
- JPA Entity. Fields: `id`, `user` (User), `entityType`, `entityId`, `value` (Integer).
- Table unique constraint on `(user_id, entity_type, entity_id)`.

### [NEW] `backend/src/main/java/com/djp/backend/model/Follow.java`
- JPA Entity. Fields: `id`, `follower` (User), `targetType`, `targetId`.
- Table unique constraint on `(follower_id, target_type, target_id)`.

### [NEW] `backend/src/main/java/com/djp/backend/model/Notification.java`
- JPA Entity. Fields: `id`, `recipient` (User), `actor` (User), `type` (String), `entityId` (UUID), `isRead` (Boolean), `createdAt`.

### [NEW] Repositories (`backend/src/main/java/com/djp/backend/repository/`)
- `CommentRepository.java`: `findByEntityIdAndEntityTypeOrderByCreatedAtAsc`, `findByParentCommentId`.
- `VoteRepository.java`: `findByUserIdAndEntityIdAndEntityType`.
- `FollowRepository.java`: `findByFollowerIdAndTargetIdAndTargetType`.
- `NotificationRepository.java`: `findByRecipientIdOrderByCreatedAtDesc`, `countByRecipientIdAndIsReadFalse`.

### [NEW] Services (`backend/src/main/java/com/djp/backend/service/`)
- `InteractionService.java`: 
  - `addComment(content, entityId, entityType, parentId, authorId)`
  - `vote(entityId, entityType, value, userId)` -> updates or creates Vote, recalcs entity score.
  - `toggleFollow(targetId, targetType, followerId)`
  - `getComments(entityId, entityType)` -> returns nested tree.

### [NEW] Controllers (`backend/src/main/java/com/djp/backend/controller/`)
- `InteractionController.java`: Endpoints mapped to `/djp/api/v1/interactions`.
  - `POST /comments`
  - `GET /comments?entityId=&entityType=`
  - `POST /votes`
  - `POST /follows`
- `NotificationController.java`: Endpoints mapped to `/djp/api/v1/notifications`.
  - `GET /`
  - `GET /unread-count`
  - `POST /{id}/read`

---

## 2. Frontend Implementation (React)

### [NEW] `frontend/src/features/interactions/interactionsApi.ts`
- API client wrapper for `POST /comments`, `GET /comments`, `POST /votes`, `POST /follows`, fetching token from `localStorage`.

### [NEW] `frontend/src/features/notifications/notificationsApi.ts`
- API client for fetching notifications and unread count.

### [NEW] `frontend/src/shared/components/notifications/NotificationBar.tsx`
- Component to sit in `TopNav.tsx`. Uses `useEffect` and `setInterval` (30s) to poll `/unread-count` and display a dropdown when clicked.

### [MODIFY] `frontend/src/shared/components/comments/Comments.tsx`
- Update `CommentThread` to use real backend data (`CommentDto`).
- Add local state for `isReplying` boolean. When true, show `CommentInput`.
- Hook up "Upvote" / "Downvote" arrows to call `interactionsApi.vote` and optimistically update score.
- Hook up "Share" button to use `navigator.share()` or copy to clipboard.

### [MODIFY] `frontend/src/shared/components/layout/TopNav.tsx`
- Import and render `<NotificationBar />`.

### [MODIFY] `frontend/src/features/profile/ProfilePage.tsx`
- Add `<button>Follow</button>` that triggers `interactionsApi.follow`.
