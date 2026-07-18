# DJP Prototype User Request Intake Portal (`prototype/todo.md`)

> **Role:** ⭐ **PROTOTYPE USER REQUEST INTAKE PORTAL**
> Write your simple 1–2 line task request(s) for the prototype below. The **PM Agent** will pick them up, analyze requirements, break them down across target domains (`FE/BE/QA` within prototype), and create the feature specs.
> Executive Dashboard: [`dashboard.md`](file:///home/ap/git-repo/DJP-v1/prototype/dashboard.md) | Archive Logs: [`archive/archive-todo.md`](file:///home/ap/git-repo/DJP-v1/prototype/archive/archive-todo.md)

---

## ✍️ User Input (Add your 1–2 line prototype task or goal items below)

**Frontend (Upcoming Sprint):**
- [ ] Connect TanStack Query hooks in `/issues` to live Spring Boot `/api/v1/issues` endpoints
- [ ] Connect Feed & Discussions views to live Spring Boot `/api/v1/discussions` endpoints
- [ ] Connect Polls voting UI to live `/api/v1/polls` endpoints
- [ ] Replace mock JWT/OAuth stubs with live Spring Security JWT cookies/headers

**Backend (Active Sprint - Phase 1 MVP):**
- [ ] Initialize Spring Boot Maven project (`spring-web`, `spring-security`, `spring-data-jpa`, `validation`, `h2`, `oauth2-client`)
- [ ] Configure `schema.sql` and `data.sql` for H2 schema setup and mock user seeding
- [ ] Configure Spring Security for OAuth2 Login with Google and LinkedIn
- [ ] Implement JWT helper (generate, parse, validate tokens)
- [ ] Create `GET /api/v1/auth/me` endpoint to verify current user context
- [ ] Verify OAuth2 flows locally with integration tests
