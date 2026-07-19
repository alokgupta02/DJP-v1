# ✅ **Production-Ready Spring Boot 3.x & Java 21 Engineering Checklist**

---

| Metadata | Value |
| :--- | :--- |
| **📅 Last Updated** | 2026-07-18 (Engineering Audit v2.0) |
| **📌 Status** | `Stable` |
| **🏷️ Version** | `v2.0.0` |
| **👥 Owner** | `Backend Team Lead / BE Agent` |
| **🔗 Dependencies** | [backend-engineer-dev.md](backend-engineer-dev.md), [backend-design.md](backend-design.md), [global-config.yaml](../../../global-config.yaml) |

---

### 🧱 1. Layered Architecture & Code Structure
* [ ] **Layer Isolation**: Strictly maintain `Controller` → `Service` → `Repository` separation.
* [ ] **DTO Mapping**: Never expose JPA database `@Entity` classes in REST controller endpoints. Always map to immutable record/class DTOs.
* [ ] **Clean Logic**: Keep Controllers thin (request/response routing and validation only). Business logic belongs exclusively in Services.
* [ ] **Modern Java 21**: Leverage Java 21 features (pattern matching, records, virtual threads where applicable).

---

### 🌐 2. REST API & Namespace Contracts (`/djp/api/v1`)
* [ ] **Global Namespace**: Ensure all controllers map under `/djp/api/v1` as defined in `network.base_url` of **[global-config.yaml](../../../global-config.yaml)**.
* [ ] **OpenAPI Contract Binding**: Verify endpoint paths, request bodies, and response codes exactly match **[api-spec.yaml](../../api/api-spec.yaml)**.
* [ ] **HTTP Semantics**: Return `200 OK` for success, `201 Created` for creations, `204 No Content` for deletions, and `400 Bad Request` for validation failures.
* [ ] **Idempotency**: Ensure `PUT` and `DELETE` requests are idempotent.

---

### 📝 3. API Documentation (`springdoc-openapi`)
* [ ] **OpenAPI 3.0 Integration**: Use `springdoc-openapi` (`springdoc-openapi-starter-webmvc-ui`) for automatic Swagger UI and schema generation. (Never use deprecated `springfox`).
* [ ] **Schema Descriptions**: Annotate controllers and DTOs with `@Operation` and `@Schema` for clear frontend API consumption.

---

### ⚠️ 4. Global Exception & Error Handling
* [ ] **Central `@ControllerAdvice`**: Handle all application exceptions centrally with `@ControllerAdvice` (`GlobalExceptionHandler`).
* [ ] **Standardized Error Responses**: Return a consistent JSON error structure (`timestamp`, `status`, `error`, `message`, `path`).
* [ ] **Stack Trace Protection**: Never leak raw Java stack traces or SQL exception details to API clients.

---

### 🔐 5. Security & Authentication (OAuth2 / JWT)
* [ ] **OAuth2 Login Client**: Verify Spring Security OAuth2 Login flows (Google/LinkedIn) and JWT issuance behavior.
* [ ] **Stateless Sessions**: Ensure JWT validation filter (`JwtAuthenticationFilter`) authenticates Bearer tokens on protected `/djp/api/v1` endpoints.
* [ ] **Input Validation**: Validate all incoming DTO payloads with `@Valid`, `@NotNull`, `@Size`, and `@Pattern` to prevent SQLi and XSS.
* [ ] **CORS Policy**: Configure a strict `CorsConfigurationSource` bean allowing only the known frontend origin (`localhost:5173` local, production domain in prod). Do not use `@CrossOrigin(origins = "*")` — this is a security vulnerability.
* [ ] **JWT Secret Strength**: Ensure JWT signing secret is at least 256-bit entropy, stored exclusively as an environment variable (never hardcoded or in `application.yml`).
* [ ] **Token Expiry Enforcement**: Validate `exp` claim on every request. Return `401` on expired tokens rather than allowing stale sessions.
* [ ] **Method-Level Authorization**: Apply `@PreAuthorize` for role-based endpoint protection (e.g., `LEADER`-only endpoints).
* [ ] **OWASP Top 10 Review**: Conduct review against OWASP Top 10 before each major release (SQLi, XSS, broken auth, IDOR, etc.).

---

### 🧪 6. Test-Driven Development (TDD Gates)
* [ ] **TDD Red Phase**: Automated integration (`@SpringBootTest`) and unit (`Mockito`) tests must be written and failing **before** implementation code is added.
* [ ] **TDD Green Phase**: Write the minimum clean code required to make all tests pass (`MockMvc` requests verifying HTTP status, JSON payloads, and DB state).
* [ ] **Test Coverage**: Ensure >80% coverage on domain service layers and 100% coverage on security/auth filter chains.

---

### 🛢️ 7. Database & JPA Mapping (`db-design.md`)
* [ ] **Schema Alignment**: Verify all JPA entity columns, foreign keys, and indexes match **[db-design.md](db-design.md)**.
* [ ] **Connection Pooling**: Configure HikariCP connection pool settings cleanly for both `H2` (local) and `Supabase PostgreSQL` (production).
* [ ] **Query Performance**: Avoid `N+1` select queries by using `JOIN FETCH` or `@EntityGraph` when loading relational collections.
* [ ] **Database Migrations**: Use **Flyway** or **Liquibase** for versioned, repeatable schema migrations. Do **not** rely on `ddl-auto: update` in production (currently missing — critical gap).
* [ ] **H2 Console Disabled in Production**: Ensure `spring.h2.console.enabled=false` in all non-local profiles.

---

### ⚙️ 8. Configuration & Environment Profiles
* [ ] **Profile Separation**: Maintain distinct configuration profiles (`application.yml` / `application-local.yml` / `application-prod.yml`).
* [ ] **Externalized Secrets**: Never commit secrets (OAuth client secrets, Supabase DB credentials). Load via environment variables (`${OAUTH_GOOGLE_SECRET}`).
* [ ] **Default Profile Guard**: Ensure no sensitive defaults exist in `application.yml` (e.g., `SUPABASE_PASSWORD:secret-password` is a critical security risk — must be removed).

---

### 🐳 9. Docker & Containerization Readiness
* [ ] **Multi-Stage Builds**: Use a multi-stage `Dockerfile` with lightweight Java 21 base images (`eclipse-temurin:21-jre`).
* [ ] **Non-Root Execution**: Ensure containers run under a non-root user for security compliance.
* [ ] **Health Checks**: Expose Spring Boot Actuator `/actuator/health` endpoint for Docker and Kubernetes readiness probes.
* [ ] **Actuator Security**: Restrict Actuator endpoints (`/actuator/**`) to internal/admin network only. Never expose `threaddump`, `heapdump`, or `env` publicly.

---

### 📊 10. Logging & Observability *(New — Critical Addition)*

#### 10.1 Structured Logging
* [ ] **JSON Log Format**: Configure Logback (or Log4j2) to output structured JSON logs in production profiles. Use `logstash-logback-encoder` or equivalent.
* [ ] **No Plain-Text Logs in Production**: Disable human-readable console format in production; use JSON only for machine-parseable aggregation.
* [ ] **Log Levels by Profile**: Set appropriate log levels per profile:
  - `local`: `DEBUG` for `com.djp` packages, `INFO` for framework
  - `production`: `INFO` for `com.djp`, `WARN` for framework, `ERROR` threshold for third-party noise
* [ ] **Never Log at DEBUG in Production**: Validate that no `logger.debug()` or `show-sql: true` configurations are active in production profiles.

#### 10.2 Correlation & Trace IDs
* [ ] **MDC Correlation ID**: Inject a `correlationId` (or `traceId`) into MDC (`org.slf4j.MDC`) at the earliest point of every inbound HTTP request (e.g., via a `OncePerRequestFilter`).
* [ ] **Propagate Correlation ID**: Include `X-Correlation-ID` as both an inbound-read and outbound-response header so the React frontend and API Gateway can trace full request chains.
* [ ] **Include in All Log Lines**: Confirm Logback pattern or JSON encoder includes `correlationId` and `userId` fields in every log output.
* [ ] **OpenTelemetry Trace ID**: Integrate `spring-boot-starter-actuator` + `micrometer-tracing-bridge-otel` + `opentelemetry-exporter-otlp` for distributed trace propagation across Auth, Core, and AI services.

#### 10.3 Request & Response Logging
* [ ] **Request Logging Filter**: Implement a `CommonsRequestLoggingFilter` (or custom `OncePerRequestFilter`) to log: method, URI, query string, user agent, authenticated user ID (not full body by default).
* [ ] **Response Status Logging**: Log HTTP status code and response time (latency) for every request in the access log.
* [ ] **Never Log Full Request Bodies by Default**: Request/response body logging must be opt-in per endpoint and must redact sensitive fields (passwords, tokens, PII).
* [ ] **Slow Request Alerting**: Log a `WARN` for any request exceeding a configurable latency threshold (e.g., >2000ms).

#### 10.4 Exception & Error Logging
* [ ] **Log All Unhandled Exceptions**: `GlobalExceptionHandler` must log every caught exception at `ERROR` level with full stack trace, correlation ID, and user context.
* [ ] **Distinguish Client vs. Server Errors**: Log `4xx` client errors at `WARN` (not `ERROR`) and `5xx` server errors at `ERROR` to reduce alert noise.
* [ ] **Do Not Swallow Exceptions**: Verify no `catch (Exception e) {}` empty blocks exist anywhere in the codebase.

#### 10.5 Security & Audit Logging
* [ ] **Authentication Events**: Log all login attempts (success + failure), OAuth callback completions, and JWT validation failures.
* [ ] **Authorization Failures**: Log every `403 Forbidden` with user ID, requested resource, and required role/permission.
* [ ] **Audit Trail**: Create a separate `audit.log` (or structured audit events table) for sensitive mutations: user profile updates, subscription changes, content deletion, vote casting.
* [ ] **Security Log Separation**: Separate security events from application logs so they can be routed to a dedicated SIEM or audit store.

#### 10.6 PII Masking
* [ ] **Mask PII in Logs**: Ensure email addresses, phone numbers, location coordinates, and OAuth tokens are never written to logs in plain text. Use a log masking utility or Logback custom converter.
* [ ] **Mask JWT Tokens**: Never log raw Bearer tokens. If JWT content must be logged for debugging, log only the `sub` (subject) claim.
* [ ] **GDPR Compliance**: Confirm log retention policy is defined and logs containing personal data have a TTL enforced at the aggregation layer.

#### 10.7 Metrics & Monitoring
* [ ] **Micrometer Integration**: Add `spring-boot-starter-actuator` and `micrometer-registry-prometheus` to expose `/actuator/prometheus` metrics endpoint.
* [ ] **Custom Business Metrics**: Define and emit counters/gauges for key domain events: `issues.created`, `polls.votes.cast`, `auth.login.success`, `auth.login.failure`.
* [ ] **JVM Metrics**: Ensure default JVM heap, GC, thread, and CPU metrics are exported via Micrometer.
* [ ] **HikariCP Metrics**: Expose database connection pool utilization metrics (`hikaricp.connections.active`, `hikaricp.connections.pending`).

#### 10.8 Alerting Rules
* [ ] **Error Rate Alert**: Alert when `HTTP 5xx` rate exceeds 1% of total requests over a 5-minute rolling window.
* [ ] **Auth Failure Alert**: Alert on >10 failed authentication attempts from a single IP within 1 minute (brute-force indicator).
* [ ] **Latency Degradation Alert**: Alert when p95 response latency exceeds 3 seconds.
* [ ] **Database Connection Exhaustion Alert**: Alert when active DB connections exceed 80% of HikariCP pool size.

#### 10.9 Log Aggregation & Retention
* [ ] **Centralized Aggregation**: Ship logs to a centralized log aggregation system (e.g., ELK stack, Grafana Loki, or Datadog). Avoid relying solely on container stdout.
* [ ] **Log Retention Policy**: Define log retention: minimum 30 days for application logs, minimum 1 year for security/audit logs.
* [ ] **Log Index Strategy**: Ensure log indices are partitioned by date and service name for cost-effective querying.

#### 10.10 Distributed Tracing
* [ ] **OpenTelemetry SDK**: Include `opentelemetry-spring-boot-starter` to auto-instrument HTTP requests, DB queries, and method calls.
* [ ] **Trace Context Propagation**: Propagate `traceparent` / `tracestate` W3C headers between microservices (Auth → Core → AI).
* [ ] **Sampling Rate**: Configure appropriate sampling rate (100% in dev/staging, 5–10% in high-traffic production) to control cost without losing visibility.
* [ ] **Trace Visualization**: Connect traces to Jaeger, Zipkin, or Grafana Tempo for visual waterfall trace inspection.

#### 10.11 Production Troubleshooting
* [ ] **Correlation ID in Error Responses**: Include `correlationId` in all API error response bodies so clients can reference it in support tickets.
* [ ] **Log-to-Trace Linking**: Configure log aggregation to link log records to their parent distributed trace (e.g., via `traceId` field in JSON logs).
* [ ] **Dynamic Log Level Adjustment**: Enable Actuator `/actuator/loggers` endpoint (admin-network-only) to change log levels at runtime without redeployment.

---

### 🚦 11. Rate Limiting & Resilience *(New)*
* [ ] **API Rate Limiting**: Implement rate limiting per user/IP at the Gateway layer or via Spring's `RateLimiter` / Bucket4j to protect against abuse and DoS.
* [ ] **Circuit Breaker**: Apply Resilience4j `@CircuitBreaker` on all cross-service calls (Core → AI service) to prevent cascade failures.
* [ ] **Retry Policy**: Add `@Retry` with exponential backoff on transient external calls (e.g., OAuth provider callbacks).
* [ ] **Timeout Contracts**: Configure explicit `@TimeLimiter` (or `spring.mvc.async.request-timeout`) on all async and external calls.
* [ ] **Graceful Shutdown**: Configure `server.shutdown=graceful` and a drain timeout (`spring.lifecycle.timeout-per-shutdown-phase`) to avoid in-flight request loss on pod termination.

---

### 🔁 12. Post-Task Audit & Cleanup
* [ ] **Dead Code Removal**: Remove unused imports, obsolete TODO comments, and temporary debugging endpoints before raising a PR.
* [ ] **Todo Synchronization**: Mark finished tasks complete immediately in `todo.md` and `be-todo.md`.
* [ ] **Graphify Update**: Run `graphify update .` after every code change to keep the AST knowledge graph current.
* [ ] **Ponytail Review**: Run `/ponytail-review` before every PR to flag over-engineering and eliminate unnecessary abstractions.
