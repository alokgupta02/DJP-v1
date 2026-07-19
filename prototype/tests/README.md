# DJP Prototype Test Suites & Automated QA

## Overview
This directory (`prototype/tests/`) contains end-to-end (E2E), integration, and automated verification scripts tailored for the standalone prototype environment (`http://localhost:8081` backend and `http://localhost:5173` frontend).

---

## Key Files & Scripts
* `api-health.test.mjs` — Automated Node.js integration script verifying `POST /djp/api/v1/auth/dev-login` (JWT issuance) and `GET /djp/api/v1/issues` (data retrieval).
* `auth.test.js` — Unit test suite adapted from production to verify login button components and dev-login response structures.
* `test-todo.md` — Single Source of Truth (SSOT) task tracker aligning QA/Tests with FE and BE prototype development.

---

## Running Verification Tests
```bash
# Run API Health Suite against live Spring Boot prototype (port 8081)
node prototype/tests/api-health.test.mjs
```

---

## DJP Prototype Synchronization
QA agents must verify tasks and record test outcomes in [`prototype/tests/.djp_state.md`](file:///home/ap/git-repo/DJP-v1/prototype/tests/.djp_state.md) and [`prototype/.djp_state.md`](file:///home/ap/git-repo/DJP-v1/prototype/.djp_state.md).
