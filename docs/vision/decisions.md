# 📜 **Architectural Decision Records (ADR)**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Document key architectural decisions, technology choices, and design trade-offs |
| **👥 Audience** | Developers, Architects, Contributors |
| **📌 Status** | `Stable` |

---

## 📑 Summary Table of Decisions

| ADR # | Decision Title | Status | Primary Trade-Off |
| :---: | :--- | :---: | :--- |
| **ADR-001** | **Progressive Disclosure UX** | `Accepted` | Simplifies onboarding vs. requires multi-step state tracking |
| **ADR-002** | **Chart.js for Visualizations** | `Accepted` | Lightweight CDN charts vs. manual canvas initialization |
| **ADR-003** | **Mobile-First Responsive Design** | `Accepted` | Democratic mobile access vs. extra desktop desktop styling |
| **ADR-004** | **Vanilla JS Prototype & Shared React Foundation** | `Accepted` | Zero build prototype reference + modular React apps |
| **ADR-005** | **Static File Deployment for Prototypes** | `Accepted` | Deploy anywhere cheaply vs. API backend required separately |
| **ADR-006** | **Modular Microservices Backend** | `Accepted` | Scales domains independently vs. adds network complexity |

---

## 🔍 Detailed Decision Records

### 📌 ADR-001: Progressive Disclosure Pattern
* **Status:** `Accepted`
* **Context:** Need to simplify user onboarding and reduce cognitive load for diverse citizens.
* **Decision:** Implement progressive disclosure across onboarding and complex reporting flows.
* **Consequences:**
  * ✅ **Positive:** Reduced initial complexity, improved user completion rates.
  * ⚠️ **Trade-off:** Requires explicit step tracking and session state retention.

---

### 📌 ADR-002: Chart.js for Visualizations
* **Status:** `Accepted`
* **Context:** Need interactive, responsive civic charts with minimal runtime overhead.
* **Decision:** Use Chart.js library for data visual components.
* **Consequences:**
  * ✅ **Positive:** Responsive canvas rendering, extensive chart options, small footprint.
  * ⚠️ **Trade-off:** Requires manual chart instance lifecycle cleanup.

---

### 📌 ADR-003: Mobile-First Design
* **Status:** `Accepted`
* **Context:** Majority of citizens access the platform via mobile devices on varying networks.
* **Decision:** Design all UI components starting from mobile `<768px` breakpoints.
* **Consequences:**
  * ✅ **Positive:** Accessible, consistent mobile experience for all users.
  * ⚠️ **Trade-off:** Desktop views require thoughtful multi-column expansion grids.

---

### 📌 ADR-004: Vanilla JS Prototypes & Shared React Apps
* **Status:** `Accepted`
* **Context:** Need clear visual prototype reference (`/prototype`) along with scalable production React apps (`apps/citizen`, `apps/admin`).
* **Decision:** Maintain vanilla HTML/CSS in `/prototype` and shared packages (`@djp/*`) for production React apps.
* **Consequences:**
  * ✅ **Positive:** Designers can prototype without build tools; devs compose clean React packages.

---

### 📌 ADR-005: Static & CDN Edge Hosting
* **Status:** `Accepted`
* **Context:** High public traffic demands scalable, low-cost frontend distribution.
* **Decision:** Serve static frontend assets via CDN / Edge networks.
* **Consequences:**
  * ✅ **Positive:** Extremely fast global latency and zero server-side rendering bottlenecks.

---

### 📌 ADR-006: Modular Microservices Backend
* **Status:** `Accepted`
* **Context:** Need resilience, clear domain separation, and distinct tech stacks (Java Spring Boot for Auth/Core, Python for AI/Embeddings).
* **Decision:** Implement a modular microservices backend (Auth, Core, AI Service) communicating via JWT behind an API Gateway.
* **Consequences:**
  * ✅ **Positive:** Independent scaling, isolated deployments, and stack matching.
  * ⚠️ **Trade-off:** Adds gateway maintenance and network/integration complexity.

---

## 📚 Related Documentation

* **[Vision](party-vision.md)** — Product vision driving these decisions
* **[Roadmap](roadmap.md)** — Versioned plan for implementation
* **[Architecture Overview](../architecture/overview.md)** — System context

---