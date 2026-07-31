---
trigger: always_on
description: Consult knowledge graph at graphify-out/ for codebase questions.
---

# Graphify Rule

- **Query First**: Run `graphify query "<question>"` before reading raw files.
- **Paths & Concepts**: Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for architecture.
- **Sync After Edits**: Run `graphify update .` after modifying code files to keep the AST graph current.
