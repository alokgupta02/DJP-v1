# Antigravity: Training & Error Log

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | A continuous feedback loop logging mistakes, misalignments, and negative points to simulate machine learning weight adjustments and prevent repeated failures. |
| **📅 Last Updated** | 2026-07-26 |
| **🏷️ Status** | Active Log |
| **👥 Owner / Worker** | Antigravity (Gemini) |

---

## 🛑 Negative Points (Mistakes to Learn From)

### 1. TDD Process Violation (`-1 Point`)
* **Incident:** During the Profile API separation, I initially rushed into writing the implementation code without writing the failing automated QA tests first.
* **User Feedback:** *"what is this?? are you even following TDD approach? write the automated QA tests that you skipped."*
* **Correction/Learning:** **Never skip the Red Phase.** The `AGENTS.md` rules mandate that tests must be written first. In the future, I must enforce a hard stop to write the test files before touching any `Controller`, `Service`, or `Component`.

### 2. State Tracker Inaccuracy (`-1 Point`)
* **Incident:** After completing the TDD Red Phase and successfully making the test fail, I forgot to update `task.md` from `[/]` (in progress) to `[x]` (completed) before proceeding to the next steps.
* **User Feedback:** *"is this completed?"*
* **Correction/Learning:** **Maintain 100% Tracker Integrity.** When utilizing `replace_file_content` to check off tasks, I must ensure that the markdown diff accurately captures the completion of the exact line item before moving on. Do not let artifacts drift from reality.

### 3. Invalid Tool Usage (Tool Call Error) (`-1 Point`)
* **Incident:** Attempted to use the `write_to_file` tool to create `application-dummy.yml` inside the repository, but incorrectly attached `ArtifactMetadata` to the tool call.
* **System Feedback:** `Error invalid tool call: ... is not a valid artifact path; artifacts must be in /home/ap/.gemini/antigravity/brain/...`
* **Correction/Learning:** **Know tool boundaries.** `ArtifactMetadata` is strictly for files generated inside the agent's `/brain/` directory. Normal project files in the git repository must not use this parameter.

### 4. State Management (Lifting State Up) (`-1 Point`)
* **Incident:** When adding filtering logic to make the FeedFilterBar tabs (Issues, Discussions, Polls) work, I forgot to lift the `activeContent` state out of the `FeedFilterBar` component and into the main `FeedPage`.
* **Correction/Learning:** **Always lift state up when siblings need it.** If a filter bar changes the state that dictates what the parent component should render (like displaying lists of issues vs discussions), the state must live in the parent component and be passed down to the filter bar as props.

### 5. Metadata Maintenance (`-1 Point`)
* **Incident:** When modifying this training log to append a new entry, I forgot to update the `📅 Last Updated` metadata field at the top of the document.
* **Correction/Learning:** **Always update metadata.** According to the Universal Markdown Metadata Guardrail, whenever modifying a markdown document that contains a Front Metadata Header Table, I must ensure that the `📅 Last Updated` field (and any other relevant fields) is updated to the current date (`2026-07-26`).

### 6. Component Consistency (Incomplete Application) (`-1 Point`)
* **Incident:** When adding a "Follow" button to post cards in the feed, I forgot to also add the same button to the individual detail pages (`IssueDetailPage`, `DiscussionDetailPage`, `PollDetailPage`).
* **User Feedback:** *"it is not present inside detail page, add this to @[.agents/antigravity/TRAINING_LOG.md]"*
* **Correction/Learning:** **Apply UI features universally.** Whenever a user requests a new interaction or button (like "Follow" or author icons) for a specific domain/entity, I must proactively search the repository for all occurrences of that entity (e.g. detail pages, feeds, sidebars) and apply the change everywhere to maintain UI consistency.

### 7. Missing Component Props / Silent Failures (`-1 Point`)
* **Incident:** The CommentInput component was not being passed the entityId (the specific issue, discussion, or poll ID) and entityType ("ISSUE", "DISCUSSION", or "POLL") in the frontend code. Without this information, the submit button failed silently to prevent empty data from being sent to the backend.
* **Correction/Learning:** **Verify required props for shared components.** I must ensure that all required props are passed correctly to shared components (`IssueDetailPage.tsx`, `DiscussionDetailPage.tsx`, and `PollDetailPage.tsx`). Silent UI failures are hard to debug, so I should always double-check the integration layer between a parent page and a shared interactive component.
