# PRD: Comprehensive User Interactions (Reddit-like)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Defines requirements for comprehensive user interactions including reply, upvote, downvote, share, follow, and notifications. |
| **📅 Last Updated** | 2026-07-26 |
| **🏷️ Status / Version** | Active SSOT |
| **👥 Owner / Worker** | Worker/Who: PM Agent |
| **🔗 Upstream / Dependencies** | N/A |

---

## 1. Problem Statement
The platform's current interaction model is visually mocked but functionally incomplete. Users need a complete suite of interactions (Like/Dislike, Reply, Share, Follow) to facilitate true civic engagement and create a dynamic, Reddit-style community experience. Notifications are required to keep users informed about interactions on their content.

## 2. Target Audience
- **Citizens**: To engage deeply, curate content via votes, and follow topics or leaders of interest.
- **Leaders/Officials**: To gauge sentiment via upvotes/downvotes, build followings, and respond to citizens.

## 3. User Stories
- **Reply**: As a user, I want to reply to comments recursively, creating a threaded discussion.
- **Vote (Like/Dislike)**: As a user, I want to upvote or downvote comments, issues, and discussions to influence their visibility and score.
- **Follow**: As a user, I want to follow other users (e.g., civic leaders) or specific threads/issues so I can get updates about their activity.
- **Share**: As a user, I want to share deep-links to specific comments or issues to external platforms.
- **Notifications**: As a user, I want to receive in-app notifications when someone replies to my content, follows me, or (optionally) when a highly upvoted comment crosses a threshold.

## 4. Acceptance Criteria
1. **Database & API**:
   - `Comment` entity supporting polymorphic associations and `parentId` for infinite nesting.
   - `Interaction` or `Vote` entity to record individual user upvotes/downvotes (+1 / -1) to prevent double voting.
   - `Follow` entity to record user-to-user or user-to-entity subscriptions.
   - `Notification` entity to track unread alerts.
2. **Frontend UI**:
   - Voting arrows (Up/Down) reflect the user's current vote state (highlighted if voted) and optimistically update the score.
   - "Reply" opens inline threaded inputs.
   - "Follow" button on user profiles and entity headers.
   - "Share" utilizes the native Web Share API or copies the link to the clipboard with a toast notification.
3. **Notifications**:
   - Notification bar/dropdown aggregates unread activity (Replies, Follows).

## 5. Non-Goals
- Real-time WebSockets/SSE for notifications in v1 (will use short-polling).
- Elaborate feed-ranking algorithms (will sort by simple net score `upvotes - downvotes` and time).
