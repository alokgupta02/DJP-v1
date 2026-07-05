# Architectural Decision Records

**Purpose**: Document key architectural decisions, technology choices, and trade-offs  
**Audience**: Developers, architects, contributors  
**Status**: Stable  

---

## ADR-001: Progressive Disclosure Pattern

- **Status**: Accepted
- **Context**: Need to simplify user onboarding and reduce cognitive load
- **Decision**: Implement progressive disclosure in all user flows
- **Consequences**:
  - Positive: Reduced initial complexity, improved user adoption
  - Negative: Requires careful state management

## ADR-002: Chart.js for Visualizations

- **Status**: Accepted
- **Context**: Need for interactive, responsive charts with minimal dependencies
- **Decision**: Use Chart.js library for all data visualizations
- **Consequences**:
  - Positive: Rich charting capabilities, responsive design, CDN available
  - Negative: Requires additional JavaScript knowledge

## ADR-003: Mobile-First Design

- **Status**: Accepted
- **Context**: Majority of users access platform via mobile devices
- **Decision**: Design all UI components with mobile-first approach
- **Consequences**:
  - Positive: Better mobile experience, consistent across devices
  - Negative: May require additional effort for desktop-specific features

## ADR-004: Vanilla JavaScript (No Framework)

- **Status**: Accepted
- **Context**: Need for lightweight, dependency-free frontend
- **Decision**: Use vanilla JavaScript (ES5+) with no frameworks
- **Consequences**:
  - Positive: Zero build step, small footprint, maximum compatibility
  - Negative: Manual state management, no component abstraction

## ADR-005: Static File Deployment

- **Status**: Accepted
- **Context**: Simple hosting requirements with no server-side processing
- **Decision**: Serve as static files on any HTTP server
- **Consequences**:
  - Positive: Deploy anywhere (GitHub Pages, Netlify, S3), no backend costs
  - Negative: No server-side features (auth, database)

## Related Documentation

- [Vision](party-vision.md) — Product vision driving these decisions
- [Roadmap](roadmap.md) — Versioned plan for implementation
- [Architecture Overview](../architecture/overview.md) — System context
- [Design Tokens](../architecture/colors-typography.md) — Color palette and typography
- [Design Principles](../ux/design-principles.md) — UX philosophy