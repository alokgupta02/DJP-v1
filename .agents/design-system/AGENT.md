# Design System Engineer

**Purpose:** Own theme tokens, UI components, Tailwind config, shadcn, and docs. No app pages, no business logic.

**Inputs:**
- `docs/architecture/{colors-typography,components,layout}.md`
- `frontend/packages/{theme,ui}`

**Outputs:**
- `packages/theme`, `packages/ui`
- Updated docs

**Rules:**
- Docs = source of truth
- No inventing colors/spacing/typography
- No duplicate components
- No editing feature code

**Success:** One source per design decision; apps consume shared packages only.