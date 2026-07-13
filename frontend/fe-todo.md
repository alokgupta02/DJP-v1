# DJP Frontend Task Tracker (`frontend/fe-todo.md`)

> **Domain Role:** ⭐ **SINGLE SOURCE OF TRUTH (SSOT)** for Frontend UI & React Execution
> **Sprint Progress:** 100% `[████████████████████████████████]` 5/5 tasks completed
> **Completed Tasks Archive:** All completed tasks are moved to [`archive/todo.md`](file:///home/ap/git-repo/DJP-v1/archive/todo.md) (SSOT for historical completed work).

---

## 🚀 Active Sprint & Executing Tasks

| Phase / Sprint | Task Description | Assigned Agent | Status |
| :--- | :--- | :--- | :--- |
| **UI Fixes Sprint** | All 5 UI layout & visual polish tasks completed | **FE Agent** | ✅ Completed (Archived) |

---

## 📋 Backlog & Planned Phases

### Phase 6 — Live Backend Integration (Upcoming Sprint)
- [ ] Connect TanStack Query hooks in `/issues` to live Spring Boot `/api/v1/issues` endpoints
- [ ] Connect Feed & Discussions views to live Spring Boot `/api/v1/discussions` endpoints
- [ ] Connect Polls voting UI to live `/api/v1/polls` endpoints
- [ ] Replace mock JWT/OAuth stubs with live Spring Security JWT cookies/headers

---

## 📝 Technical Notes & Architectural Reference

- See [`archive/todo.md`](file:///home/ap/git-repo/DJP-v1/archive/todo.md) for all 45 previously completed migration tasks and post-migration audit fixes.
- Stack: React 18, TypeScript, Vite, Tailwind CSS, TanStack Query, Zustand, React Hook Form, Zod
- Styling rule: Prefer inline Tailwind classes over abstract CSS wrapper components
- Prototype reference: Prototype files under `prototype/` must never be modified directly
