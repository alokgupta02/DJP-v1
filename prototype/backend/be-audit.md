🔴 Critical Issues (Blocking Tests)
1. Test Failures - SQL Dialect Mismatch
- Files: ActuatorIntegrationTest, StartupSeedDataIntegrationTest
- Root Cause: Seed SQL files (users.sql, issues.sql, etc.) use H2 syntax (MERGE INTO ... KEY, ON CONFLICT) but application-local.yml configures PostgreSQL
- Fix: Either use H2 for tests (@AutoConfigureTestDatabase) or rewrite seed files in PostgreSQL-compatible syntax (INSERT ... ON CONFLICT DO NOTHING)
2. SqlFilePersistenceService Writes to Source Directory
- File: SqlFilePersistenceService.java:38-40
- Issue: Writes to src/main/resources/data/ at runtime — corrupts version-controlled seed data
- Fix: Write only to target/classes/data/ or a separate runtime directory; disable in production

🟠 Architecture & Design Gaps
3. Missing Service Layer (Anemic Domain Model)
- Controllers directly use Repositories: IssueController, DiscussionController, PollController, UserController
- No transaction boundaries in controllers
- Manual DTO↔Entity mapping in controllers (error-prone, duplicated)
- Fix: Introduce IssueService, DiscussionService, PollService, ProfileService with @Transactional
4. No Pagination/Filtering on List Endpoints
- GET /issues, /discussions, /polls return all records — OOM risk
- Fix: Add Pageable support, filtering, sorting
5. Missing CRUD Operations
- Only GET (list/byId) and POST (create) exist
- Missing: PUT/PATCH (update), DELETE for Issues, Discussions, Polls
- Missing: Vote/comment endpoints in controllers (only in InteractionService)
6. Audit Logging as Side Effect in Controllers
- Files: IssueController:79, DiscussionController:83, PollController:78
- Issue: auditLogService.logAction() called directly — not transactional, fails silently
- Fix: Use Spring Events (@EventListener) or AOP for audit logging

🟡 Security Issues
7. Insecure CORS Configuration
- File: SecurityConfig.java:74
- Issue: allowedOriginPatterns = ["*"] with allowCredentials = true — CSRF risk
- Fix: Restrict to specific origins; use allowedOrigins not patterns with credentials
8. JWT Secret Fallback Default
- File: JwtTokenProvider.java:26-36
- Issue: Generates random key if secret < 32 chars — tokens invalid on restart
- Fix: Fail fast in production if app.jwt.secret not set
9. Dev Login Creates Users with Hardcoded Values
- File: AuthController.java:52-60
- Issue: Auto-creates users with role=CITIZEN, subscriptionStatus=ACTIVE, no validation
- Fix: Restrict to test profile only; use test fixtures
10. No Refresh Token / Token Rotation
- Access tokens only; no refresh mechanism
- Fix: Implement refresh token store with rotation
11. OAuth2 Incomplete
- Only initiation endpoints (/auth/google, /auth/github)
- No token exchange, user mapping, or account linking logic
- Fix: Implement OAuth2SuccessHandler fully or remove unused dependency

🟢 Code Quality & Maintainability
12. DTOs Use JavaBean Pattern (Pre-Java 14)
- Files: IssueCreateRequestDto.java, DiscussionCreateRequestDto.java, etc.
- Fix: Use record types (Java 17+) for immutable DTOs
13. No DTO↔Entity Mapping Library
- Manual mapping in controllers
- Fix: Add MapStruct for compile-time mapping
14. Inconsistent Date Types
- User, Issue, Discussion, Poll use OffsetDateTime
- Comment, Vote, Follow use LocalDateTime (no timezone)
- Fix: Standardize on OffsetDateTime or Instant
15. Comment Entity Missing Indexes
- File: Comment.java — no @Table(indexes=...) on entityId+entityType
- Fix: Add composite index for query performance
16. No Database Migration Tool
- ddl-auto: update in local, validate in prod — no versioned migrations
- Fix: Add Flyway or Liquibase

🔵 Missing Test Coverage (TDD Gaps)
Controller/Component
AuthController
UserController / ProfileController
NotificationController
InteractionController
IssueController
DiscussionController
PollController
Pagination/Filtering
Security (401/403/CSRF)
Validation error formats

📋 Suggested Improvement Priority
Priority	Task
P0	Fix test failures (H2 vs PostgreSQL dialect)
P0	Stop SqlFilePersistenceService writing to src/main/resources
P1	Add Service layer + MapStruct for Issues/Discussions/Polls
P1	Add pagination + filtering to all list endpoints
P1	Fix CORS security issue
P1	Add Flyway migrations
P2	Implement UPDATE/DELETE endpoints
P2	Add comprehensive integration tests (all controllers)
P2	Implement refresh token + OAuth2 completion
P3	Migrate DTOs to record + add MapStruct
P3	Add WebSocket for real-time notifications
P3	Standardize date types to OffsetDateTime

🎯 Quick Wins (Do First)
1. Fix tests: Change application-local.yml to use H2 for test profile, or add @AutoConfigureTestDatabase(replace=ANY) to test classes
2. Secure CORS: Replace allowedOriginPatterns = ["*"] with explicit frontend origin
3. Disable SQL file persistence in tests: Already done via @TestPropertySource(properties = "app.persistence.sql-file.enabled=false") — ensure it's on all test classes
4. Add @Transactional to service methods (when created)
5. Add MapStruct dependency to pom.xml

# Todos
[•] Fix test failures - configure H2 for test profile
[ ] Stop SqlFilePersistenceService writing to src/main/resources
[ ] Fix CORS security issue (allowedOriginPatterns = [*])
[ ] Add Service layer + MapStruct for Issues/Discussions/Polls
[ ] Add pagination + filtering to all list endpoints
[ ] Add Flyway migrations
[ ] Implement UPDATE/DELETE endpoints
[ ] Add comprehensive integration tests (all controllers)
[ ] Implement refresh token + OAuth2 completion
[ ] Migrate DTOs to record + add MapStruct
[ ] Add WebSocket for real-time notifications
[ ] Standardize date types to OffsetDateTime