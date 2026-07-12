# DJP (Developer Journal Prompt & Workspace) - Version 1

## 1. What DJP Is
DJP is an AI-native workspace structured around the **DJPv1 Specification**. It uses three persistent Markdown anchor files at the root to synchronize AI agents, maintain memory across sessions, and enforce strict code quality.

---

## 2. Repository Layout & Core DJPv1 Files

```text
DJP-v1/
├── .djp_identity.md          # Persistent user profile, tech stack, and communication guardrails
├── .djp_state.md             # Active sprint objectives, task breakdown, and session delta logs
├── .djp_rules.md             # Operational protocols, context rules, and quality standards
├── AGENTIC_WORKFLOW_GUIDE.md # Comprehensive guide for agent roles & team workflow
├── todo.md                   # Master task list
├── frontend/                 # React / Next.js / Vite UI application
├── backend/                  # Java 21 Spring Boot 3 microservices & APIs
├── tests/                    # E2E and automated regression test suites
└── docs/                     # Architectural specs, PRDs, and guides
```

---

## 3. How to Run Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 4. How to Run Backend
```bash
cd backend/springboot
./mvnw spring-boot:run
```

---

## 5. Where Documentation Lives
* **Core AI Anchors:** [file:///.djp_identity.md](file:///home/ap/git-repo/DJP-v1/.djp_identity.md), [file:///.djp_state.md](file:///home/ap/git-repo/DJP-v1/.djp_state.md), [file:///.djp_rules.md](file:///home/ap/git-repo/DJP-v1/.djp_rules.md)
* **Agent Rules:** [file:///.agents/AGENTS.md](file:///home/ap/git-repo/DJP-v1/.agents/AGENTS.md)
* **Documentation Sitemap:** [file:///docs/README.md](file:///home/ap/git-repo/DJP-v1/docs/README.md)