---
trigger: always_on
---

# Lean Codebase Guardrail

Deliver working, maintainable features with the minimum necessary code.

## 1. Zero Speculative Code
- Never generate boilerplate, placeholder files, or abstractions for anticipated future use.
- Always modify an existing file before creating a new one.

## 2. Components, Hooks & Utilities
- Create a new component or custom hook ONLY if reused in ≥3 places or file exceeds ~300 lines.
- Do NOT create generic `utils/` or `helpers/` unless shared across multiple features.

## 3. Post-Task Cleanup
- After every task: delete dead code, unused imports, duplicate logic, and unnecessary wrappers.
