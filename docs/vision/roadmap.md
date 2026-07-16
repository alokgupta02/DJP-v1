# 🗺️ **Product Roadmap & Milestones**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Outline the versioned product plan, milestones, and timeline for the DJP platform |
| **👥 Audience** | Stakeholders, Developers, Contributors |
| **📌 Status** | `Stable` |

---

## 📅 Versioned Release Schedule

```
  [ Q3 2026: v1 MVP ]  ──►  [ Q4 2026: v2 Organization ]  ──►  [ Q1 2027: v3 Intelligence ]  ──►  [ Q2 2027: v4 Ecosystem ]
```

---

## 🚀 Milestones & Feature Breakdown

### 1️⃣ Version 1 (MVP) — Citizen Participation Foundation (`Q3 2026`)

#### 🎨 v1.1 — UI/UX Foundation (Current Sprint)
* [x] Core layouts (collapsible sidebar, header search alignment, responsive grid)
* [x] Responsive mobile-first design tokens (`@djp/theme`, `@djp/ui`)
* [ ] Static pages and interactive UI mockups for Issues (I), Discussions (D), Polls (P), and profile dashboards

#### 💻 v1.2 — Core Backend Integration
* [ ] Spring Boot base Maven project and H2 database schema setup
* [ ] Google and LinkedIn OAuth2 authentication flow
* [ ] Basic CRUD REST APIs for Issues, Discussions, and Polls (wired to React TanStack query)

#### ⚡ v1.3 — Advanced Logic & Operations
* [ ] Double-Lock Verification (AI before/after photo comparison and 500m proximity GPS consensus)
* [ ] Paid Leader Subscription gate and 14-day grace period logic
* [ ] Dynamic leadership rank hierarchy (calculated via rolling 6-month reputation score)

---

### 2️⃣ Version 2 — Party Organization & Accountability (`Q4 2026`)
* [ ] Digital membership & volunteer management pipelines
* [ ] Representative performance & voting record tracking
* [ ] Promise and issue resolution audit logs
* [ ] Role-based access control (RBAC) and verified citizen profiles

---

### 3️⃣ Version 3 — Intelligence & Governance (`Q1 2027`)
* [ ] Real-time analytics dashboards & public sentiment tracking
* [ ] Constituency insights & AI-powered policy recommendations
* [ ] Multi-level government performance monitoring
* [ ] Advanced spatial and categorical filtering

---

### 4️⃣ Version 4 — Scale & Ecosystem (`Q2 2027`)
* [ ] Campaign coordination & booth management tooling
* [ ] Multilingual support across major regional languages
* [ ] Offline-first Progressive Web App (PWA) sync
* [ ] Open civic data integrations & AI Civic Assistant

---

## 📚 Related Documentation

* **[Vision Statement](party-vision.md)** — Foundational vision driving this roadmap
* **[Decisions](decisions.md)** — Architectural decisions scoped by version
* **[Architecture Overview](../architecture/overview.md)** — System context

---