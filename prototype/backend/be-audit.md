# Backend Audit Log (`prototype/backend/be-audit.md`)

> Current state of the prototype backend as of Phase 5 completion (2026-07-27).

---

## 🟢 Fixed / Completed

- [x] Test failures — H2 vs PostgreSQL dialect (Flyway disabled in test, H2 seed files)
- [x] SqlFilePersistenceService writes to `target/` not `src/`
- [x] CORS hardened — explicit origin (`localhost:5173`), not wildcard
- [x] Service layer extracted (IssueService, DiscussionService, PollService, ProfileService, PetitionService, etc.)
- [x] MapStruct DTO mapping added
- [x] Pagination + filtering on list endpoints
- [x] Flyway migrations (V1–V5)
- [x] UPDATE/DELETE endpoints for Issues, Discussions, Polls
- [x] Refresh token rotation + OAuth2 success handler
- [x] DTOs migrated to Java records
- [x] Date types standardized to OffsetDateTime
- [x] PetitionController uses typed `PetitionCreateRequestDto` instead of raw `Map`

---

## 🟠 Remaining Gaps

### Architecture & Performance
1. **InsightsService returns hardcoded data** — departmentEfficiency, aiInsights, topWards, volunteerHours, activeProjects are static. Should compute from real data.
2. **UserStatsController loads all rows in memory** — `findAll().stream().filter(...)` should be JPQL `COUNT` queries for performance.
3. **PetitionService.getPetitions() uses findAll()** — no pagination; OOM risk with many petitions.
4. **RepresentativeService is read-only** — no CRUD endpoints for managing representatives.
5. **No caching layer** — every request hits the database; Redis or Spring Cache not implemented.

### Security
6. **NotificationController extracts UUID from principal** — principal is `String` (email), not `UUID`. `@AuthenticationPrincipal UUID userId` will fail at runtime.
7. **No API rate limiting** — Resilience4j only covers auth service; no per-endpoint rate limiting.

### Code Quality
8. **PetitionService.createPetition uses manual entity construction** — not using MapStruct mapper (unlike Issue/Discussion/Poll services).
9. **No MapStruct mappers for Petition, Representative, Insights** — manual `fromEntity()` methods used.

### Observability & Infra
10. **No WebSocket for real-time notifications** — notification polling only.
11. **No CI/CD configuration** — no `.github/workflows/` or build pipeline.
12. **Subscription/billing fields exist in User entity but no logic** — subscriptionEndsAt, gracePeriodEndsAt, subscriptionStatus unused.

### Test Coverage
13. **Missing tests for:** PetitionController, RepresentativeController, InsightsController, UploadController, UserStatsController, NotificationController (covered but minimal).

---

## 📋 Improvement Priority

| Priority | Task |
| :--- | :--- |
| P0 | Fix NotificationController `@AuthenticationPrincipal UUID userId` → use String |
| P1 | Add pagination to PetitionService.getPetitions() |
| P1 | Add JPQL COUNT queries to UserStatsController |
| P2 | Compute InsightsService from real data instead of hardcoded values |
| P2 | Add MapStruct mapper for Petition entity |
| P2 | Add tests for untested controllers |
| P3 | Add caching layer |
| P3 | Add WebSocket for real-time notifications |
| P3 | Add CI/CD pipeline |
| P3 | Implement subscription/billing logic or remove unused fields |

---

## ✅ Done (from original audit)

- [x] Fix test failures (H2 dialect)
- [x] Stop SqlFilePersistenceService writing to src/
- [x] Fix CORS wildcard
- [x] Add Service layer + MapStruct
- [x] Add pagination + filtering
- [x] Add Flyway migrations
- [x] Implement UPDATE/DELETE endpoints
- [x] Add refresh token + OAuth2 completion
- [x] Migrate DTOs to records + MapStruct
- [x] Standardize date types to OffsetDateTime
- [x] PetitionController raw Map → typed DTO
