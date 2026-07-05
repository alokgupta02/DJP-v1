# AI Agent Interaction Guide

**Purpose**: Guide AI agents on how to read, write, and navigate this codebase  
**Audience**: AI agents, developers  
**Dependencies**: [Architecture Overview](../architecture/overview.md)  
**Status**: Stable  

---

## Overview

This document helps AI agents (and developers) efficiently navigate the DJ Dashboard codebase. Follow these conventions to maintain consistency and avoid common pitfalls.

## Codebase Structure

```
frontend/html/
├── overview.html          # Dashboard - governance metrics
├── judiciary.html         # Judicial data
├── legislatures.html      # Legislative metrics
├── governments.html       # Multi-level admin
├── rep-index.html         # Representatives
├── states.html            # State comparisons
├── municipalities.html    # Municipal analytics
├── parties.html           # Political parties
├── elections.html         # Election tracking
├── docs/
│   ├── architecture/      # Design tokens, components, layout, navigation
│   ├── vision/            # Product vision, roadmap, decisions
│   ├── ux/                # Design principles, features
│   ├── development/       # Agent guide, patterns
│   └── deployment/        # Hosting, CI/CD
└── *.md                   # Root-level doc references
```

## Key Conventions

### HTML Pages
- All 9 pages share identical sidebar and header structure
- Each page has a unique `<body id="page-{name}">`
- CSS and JavaScript are embedded (no external files except Chart.js CDN)
- No build process - static files deploy as-is

### Design System
- Colors are hardcoded hex values (no CSS variables for compatibility)
- Single source of truth: [Colors & Typography](../architecture/colors-typography.md)
- Breakpoints: 768px (mobile), 1024px (tablet)

### Navigation
- Direct file links only (no hash anchors for pages)
- Active state managed via `.active` class on sidebar links
- Sidebar toggle uses `.collapsed` class

## Documentation Navigation

| Topic | Document |
|-------|----------|
| Architecture overview | [overview.md](../architecture/overview.md) |
| Design tokens | [colors-typography.md](../architecture/colors-typography.md) |
| UI components | [components.md](../architecture/components.md) |
| Responsive layout | [layout.md](../architecture/layout.md) |
| Navigation system | [navigation.md](../architecture/navigation.md) |
| JavaScript patterns | [javascript.md](../architecture/javascript.md) |
| Design principles | [design-principles.md](../ux/design-principles.md) |
| Deployment guide | [deployment.md](../deployment/deployment.md) |

## Common Tasks

### Adding a New Page
1. Copy an existing `.html` file
2. Update `<body id="page-newname">`
3. Add menu item to all 9 pages' sidebars
4. Update documentation references

### Modifying Styles
1. Edit CSS in `<style>` tags of the relevant page (or all 9 for global changes)
2. Use hex colors from [colors-typography.md](../architecture/colors-typography.md)
3. Test at 768px, 1024px, and desktop breakpoints

### Updating Documentation
- Add metadata header (Purpose, Audience, Status) to new docs
- Cross-link related documents with relative paths
- Keep the dependency graph acyclic

## Related Documentation

- [Architecture Overview](../architecture/overview.md)
- [Components](../architecture/components.md)
- [JavaScript Patterns](../architecture/javascript.md)
- [Navigation System](../architecture/navigation.md)
- [Design Principles](../ux/design-principles.md)
