# Antigravity: Training & Error Log

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | A continuous feedback loop logging mistakes, misalignments, and negative points to simulate machine learning weight adjustments and prevent repeated failures. |
| **📅 Last Updated** | 2026-07-24 |
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
