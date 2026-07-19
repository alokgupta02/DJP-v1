# DJP Backend Microservices

## Overview
This directory houses the Java 21 Spring Boot 3 microservices and backend utilities for DJP-v1.

---

## DJPv1 Synchronization
All backend AI agents and developers must adhere to the **DJPv1 Specification**:
* **Identity & Guardrails:** Refer to [file:///.djp_identity.md](file:///home/ap/git-repo/DJP-v1/.djp_identity.md)
* **Active Tasks & Delta Logs:** Synchronize session progress in [file:///.djp_state.md](file:///home/ap/git-repo/DJP-v1/.djp_state.md)
* **Operational Rules:** Follow rules in [file:///.djp_rules.md](file:///home/ap/git-repo/DJP-v1/.djp_rules.md) and [file:///.agents/AGENTS.md](file:///home/ap/git-repo/DJP-v1/.agents/AGENTS.md)
* **Backend Technical Debt & Audit SSOTs:**
  * Canonical Debt Register: [be-debt.md](./be-debt.md) *(or `docs/architecture/backend/be-debt.md`)*
  * Active Execution Backlog: [be-audit-recom.md](./be-audit-recom.md) *(or `docs/architecture/backend/be-audit-recom.md`)*
  * Historical Resolution Ledger: [be-audit-log.md](./be-audit-log.md) *(or `docs/architecture/backend/be-audit-log.md`)*

---

## Running Locally
Navigate to `springboot/` and run:
```bash
./mvnw spring-boot:run
```
