# 🤖 **AI Civic Assistant Architecture**

---

| Metadata | Details |
| :--- | :--- |
| **🎯 Purpose** | Define the AI assistant capabilities, integration points, and interaction patterns |
| **👥 Audience** | Developers, Designers, Contributors |
| **📌 Status** | `Stable` |

---

## 🌟 Overview

The **AI Civic Assistant** is an intelligent conversational companion that helps citizens navigate the Digital Janata platform, provides guidance during progressive onboarding, assists with drafting civic submissions, and synthesizes governance data insights.

---

## 🧠 Core Capabilities

| Capability | Icon | Description |
| :--- | :-: | :--- |
| **1. Guided Onboarding** | 👋 | Walks users through progressive disclosure flows and explains core civic features. |
| **2. Submission Drafting** | ✍️ | Helps citizens draft well-structured issues, discussions, and polls with title/category suggestions. |
| **3. Data Synthesis** | 📊 | Summarizes complex legislative/judicial metrics and highlights key civic trends. |
| **4. Natural Language Queries** | 💬 | Answers natural language questions regarding governance data, representative voting records, and budgets. |

---

## 🔌 Integration & Touchpoints

```
               ┌──────────────────────────────┐
               │    🤖 AI Civic Assistant     │
               └──────────────┬───────────────┘
                              │
     ┌────────────────────────┼────────────────────────┐
     ▼                        ▼                        ▼
[ 👋 Onboarding ]     [ ✍️ Form Helpers ]      [ 📊 Dashboard Tooltips ]
```

### 1️⃣ Onboarding Integration
* Appears as an optional conversational drawer during onboarding steps.
* Answers immediate clarifying questions about privacy and location settings.

### 2️⃣ Content Creation Form Co-Pilot
* Embedded near submission inputs (`Issue Title`, `Description`).
* Suggests clearer wording, removes ambiguity, and recommends relevant tags.

### 3️⃣ Interactive Chart Explainer
* Integrated with Chart.js tooltip actions.
* Translates raw statistical charts into plain-language civic summaries.

---

## ⚙️ Technical Architecture & Safety

| Layer | Component & Responsibility |
| :--- | :--- |
| **Frontend UI** | Lightweight chat widget (`/components`) integrated with design tokens |
| **Backend NLP** | Secure LLM orchestration gateway with RAG over civic data & docs |
| **Security & Ethics** | PII masking, strict hate-speech/misinformation filtering, prompt guardrails |

---

## ✅ Quality & Safety Checklist

* [ ] Does the assistant clearly disclose its AI identity?
* [ ] Are sensitive personal data fields (PII) stripped before LLM processing?
* [ ] Can users easily dismiss or mute the assistant at any time?
* [ ] Are natural language query responses cited against platform data?

---

## 📚 Related Documentation

* **[Onboarding Architecture](onboarding.md)** — Assistant touchpoints during onboarding
* **[Submission Model](submission-model.md)** — Data structures inspected during drafting
* **[Design Principles](../ux/design-principles.md)** — AI UX guidelines

---