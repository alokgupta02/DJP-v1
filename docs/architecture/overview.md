# Overview

**Purpose**: High-level system architecture, concepts, and data flow  
**Audience**: Developers, designers, contributors, AI agents  
**Status**: Stable  

---

## System Architecture

The Digital Janata (DJ) platform is the **digital operating system of a political party** — a unified ecosystem for citizen participation, party organization, governance, and intelligence, designed to make political participation as simple, transparent, and accessible as sending a message.

### Key Components

- **Frontend**: HTML5, CSS3, JavaScript (ES5+)
- **Visualization**: Chart.js library for interactive charts
- **Styling**: CSS Grid, Flexbox, Media Queries for responsive design
- **Navigation**: Sidebar-based navigation with active state management
- **Data Flow**: Progressive disclosure pattern for user interaction

### Core Concepts

- **Common Submission Model**: Unified data model for issues, discussions, polls, and other civic content
- **Progressive Disclosure**: Step-by-step user interaction to reduce cognitive load
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 1024px
- **Accessibility**: WCAG 2.1 compliance with keyboard navigation and semantic HTML

### Data Flow

1. **User Entry**: Users access the platform through the dashboard
2. **Onboarding**: Progressive disclosure flow to gather user preferences
3. **Content Creation**: Users create issues, discussions, polls, etc.
4. **Data Processing**: Platform processes and visualizes data in real-time
5. **Display**: Visualizations are rendered using Chart.js with responsive design

### Architecture Principles

- **Citizen First**: Every feature serves citizen engagement and public impact
- **Transparency by Default**: All data flows and decisions are auditable and visible
- **Accountability Through Technology**: Track promises, issues, and representative performance
- **Internal Democracy**: Enable grassroots participation and democratic decision-making
- **Modular Design**: Each component has a single responsibility
- **Separation of Concerns**: Clear separation between UI, logic, and data
- **Reusability**: Components and patterns are reusable across pages
- **Maintainability**: Clear structure and documentation for easy updates

### Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES5+)
- **Visualization**: Chart.js (CDN)
- **Styling**: CSS Grid, Flexbox, Media Queries
- **Hosting**: Static file serving (GitHub Pages, Netlify, Vercel)

## Related Documentation

- [Vision](../vision/party-vision.md) — Product vision and goals
- [Roadmap](../vision/roadmap.md) — Versioned plan and timeline
- [Decisions](../vision/decisions.md) — Architectural decisions and trade-offs
- [Submission Model](submission-model.md) — Detailed data model
- [Onboarding](onboarding.md) — Conversational onboarding flow
- [AI Assistant](ai-assistant.md) — AI assistant design
- [Design Principles](../ux/design-principles.md) — UX philosophy and guidelines
- [Components](components.md) — UI component library
- [Layout](layout.md) — Responsive design
- [Colors & Typography](colors-typography.md) — Design tokens
- [Navigation](navigation.md) — Navigation system
- [JavaScript](javascript.md) — JavaScript patterns
- [Agent Guide](../development/agent.md) — AI agent interaction guide