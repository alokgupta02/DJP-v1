---
trigger: always_on
description: Mandatory Git branching, naming, and integration topology for all AI agents and human developers across DJP-v1.
---

# 🌿 DJP-v1 Canonical Git Branching & Integration Strategy

---

| Metadata | Value |
| :--- | :--- |
| **📌 Purpose** | Defines the exact branching topology, PR destinations, and API versioning rules for the monorepo (`DJP-v1`). |
| **📅 Last Updated** | `2026-07-21` |
| **🏷️ Status / Version** | `Active SSOT (v1.0.0)` |
| **👥 Owner / Worker** | `Worker/Who: [agent-v | Antigravity (Gemini)]` |
| **🔗 Upstream / Dependencies** | `[.agents/AGENTS.md](../AGENTS.md)` |

---

## 1. Branch Topology & Hierarchy (`SSOT`)

All development, feature implementation, and release integration strictly follows this exact tree:

```
master (Protected Production Trunk — API Versioning Required)
  │
  ├── develop (Monorepo Integration Trunk — Auto-synced from master)
  │     ├── feature/prototype (PRs ──► develop)
  │     └── feature/bmad (PRs ──► develop)
  │
  └── mobile (Mobile App Release Track — Rooted off & Auto-synced from master)
        └── mobile/feature-* (PRs ──► mobile)
```

---

## 2. Mandatory Branch Rules & Destinations

| Branch / Namespace | Root Trunk | PR Destination Target | Governance & Integration Rules |
| :--- | :--- | :--- | :--- |
| **`master`** | *Repo Root* | *None (Production)* | **Protected Production Trunk.** No direct commits. All merges require passing CI/CD checks and peer code review (`/ponytail-review`). |
| **`develop`** | `master` | `master` | **Monorepo Integration Trunk.** Convergence point for shared web (`frontend/`), backend (`backend/`), and docs. PRs to `master` only when full regression suites pass green ✅. |
| **`feature/prototype`** | `develop` | `develop` | **Experimental Feature Track.** Used for UI/UX prototypes and exploratory implementations. Must pass TDD checks before merging back to `develop`. |
| **`feature/bmad`** | `develop` | `develop` | **Active BMAD Feature Track.** Dedicated to BMAD specifications and API endpoints. Merges back to `develop` upon QA verification. |
| **`mobile`** | `master` | `master` | **Mobile App Release Track.** Rooted from `master` to ensure mobile builds compile against stable, production-verified API schemas (`api-contract.md`). |
| **`mobile/feature-*`** | `mobile` | `mobile` | **Mobile Feature Namespaces.** All mobile-specific work branches from and PRs back to `mobile`. |

---

## 3. Core Architectural Safeguards

1. **API Backward Compatibility (`Contract First` Rule):**
   Because `mobile` compiles against `master` while `develop` evolves rapidly, any changes to public REST endpoints or database/Supabase schemas (`backend/`) on `develop` **must remain backward-compatible or versioned (`/api/v2/`)** so mobile builds never break.
2. **Auto-Sync Downstream Loop:**
   Whenever a PR merges into `master` (whether from `develop` or `mobile`), `master` must be auto-synced down to `develop` and `mobile` to prevent branch drift.
3. **Reversible Cloud Save (`AGENTS.md` Rule 5):**
   Every commit across all branches must use exact log entry data (`Summary`, `Files Changed`, `Verification`) with `Worker/Who: [Role | Model]`.