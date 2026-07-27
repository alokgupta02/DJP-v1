# DJP Prototype Backend Task Tracker (`prototype/backend/be-todo.md`)

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Single Source of Truth tracking API execution tasks for Spring Boot backend (port 8081). |
| **📅 Last Updated** | 2026-07-27 |
| **🏷️ Status / Version** | Phase 5 Complete / v1.0.0 |
| **👥 Owner / Worker** | BE Agent |

---

## 🚀 Active Sprint

| Task | Priority | Status |
| :--- | :--- | :--- |
| Fix NotificationController `@AuthenticationPrincipal UUID userId` → String | P0 | Pending |
| Add pagination to `PetitionService.getPetitions()` | P1 | Pending |
| Replace in-memory stream filter with JPQL COUNT in `UserStatsController` | P1 | Pending |
| Compute InsightsService from real data instead of hardcoded values | P2 | Pending |
| Add MapStruct mapper for Petition entity | P2 | Pending |
| Write integration tests for Petition, Representative, Insights, Upload, UserStats controllers | P2 | Pending |
| Add caching layer (Redis / Spring Cache) | P3 | Pending |
| Add WebSocket for real-time notifications | P3 | Pending |
| Add CI/CD pipeline | P3 | Pending |
| Implement subscription/billing logic or remove unused User fields | P3 | Pending |

---

## ✅ Completed

- [x] Initialize Spring Boot 3.4.1 project (port 8081) with JWT auth
- [x] Core CRUD: Issues, Discussions, Polls (with pagination, validation, MapStruct)
- [x] Interactions: comments, votes, follows
- [x] OAuth2 Google/GitHub + JWT refresh token rotation
- [x] Flyway migrations (V1–V5)
- [x] User profiles + onboarding
- [x] Notifications (polling)
- [x] File uploads
- [x] Petitions full stack (model, repo, service, DTO, controller)
- [x] Representatives (model, repo, service, DTO, controller, seed data)
- [x] Insights endpoint
- [x] User stats endpoint
- [x] PetitionController uses typed DTO instead of raw Map
- [x] Integration tests (11 classes, 29 tests)
- [x] Audit logging (AOP)
- [x] Actuator health/prometheus/metrics
