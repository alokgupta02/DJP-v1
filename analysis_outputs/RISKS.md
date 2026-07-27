# Suspicious Patterns

- .agents/skills/analyze-project/scripts/analyze_project.py: repeated `sigmoid` usage detected; review for duplicated post-processing.
- .agents/skills/analyze-project/scripts/analyze_project.py: both `relu` and `sigmoid` appear in the same file; check activation order and intent.
- .agents/skills/analyze-project/scripts/analyze_project.py: review whether dropout-sensitive evaluation behavior is intentional.
