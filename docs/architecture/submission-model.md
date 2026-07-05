# Common Submission Model

**Purpose**: Define the unified data structure for all civic content types  
**Audience**: Developers, architects, API consumers  
**Status**: Stable  

---

## Overview

The Common Submission Model provides a unified data structure for all civic content types in the Digital Janata platform, enabling consistent handling across different content types while allowing for type-specific extensions.

## Content Types

### Issue
- **Purpose**: Report problems or concerns in governance
- **Fields**:
  - title: Short description of the issue
  - description: Detailed explanation
  - category: Type of issue (e.g., infrastructure, policy, safety)
  - location: Geographic location (city, district, etc.)
  - severity: Low/Medium/High
  - status: Open/In Progress/Closed
  - attachments: Files or images
  - tags: Keywords for categorization

### Discussion
- **Purpose**: Facilitate conversation around issues or topics
- **Fields**:
  - title: Topic heading
  - content: Detailed discussion
  - related_issue_id: Reference to related issue (if any)
  - author: User who started the discussion
  - replies: Array of comments
  - tags: Keywords for categorization
  - status: Active/Archived

### Poll
- **Purpose**: Collect opinions or preferences from users
- **Fields**:
  - question: Main question text
  - options: Array of poll choices
  - option_votes: Array of vote counts for each option
  - start_date: Poll start timestamp
  - end_date: Poll end timestamp
  - results_visibility: Who can see results (participants only or public)
  - status: Active/Closed

### Poll Vote
- **Purpose**: Record user's vote in a poll
- **Fields**:
  - poll_id: Reference to poll
  - user_id: User who voted
  - option_index: Selected option index
  - timestamp: Vote timestamp

### User Profile
- **Purpose**: Store user information and preferences
- **Fields**:
  - user_id: Unique identifier
  - name: Full name
  - email: Contact email
  - location: User's location
  - preferences: User settings and preferences
  - reputation_score: Community reputation metric
  - joined_date: Account creation date

## Data Model Structure

### Base Model
All content types inherit from a base model with common fields:
- id: Unique identifier
- created_at: Creation timestamp
- updated_at: Last update timestamp
- author_id: User who created the content
- status: Current status (active/archived)

### Type-Specific Extensions
Each content type extends the base model with its specific fields as defined above.

## Validation Rules

- All required fields must be present
- Date fields must be valid timestamps
- Location fields must follow geographic format
- Status values must be from predefined sets
- File attachments must meet size and type restrictions

## Extensibility

- New content types can be added by extending the base model
- Type-specific fields can be added without breaking existing systems
- API endpoints can handle multiple content types through polymorphism

## Relationships

- Issues can have related discussions
- Polls can have related discussions
- Users can have multiple submissions
- Content can be linked across different types

## API Representation

The Common Submission Model is represented in the API through:
- Consistent field naming conventions
- Standardized status values
- Unified validation rules
- Consistent data types across content types

## Future Extensions

- Support for multimedia content (videos, audio)
- Integration with external data sources
- Enhanced user reputation system
- Advanced filtering and search capabilities

## Related Documentation

- [Vision](../vision/party-vision.md)
- [Roadmap](../vision/roadmap.md)
- [Decisions](../vision/decisions.md)
- [Design Principles](../ux/design-principles.md)
- [Onboarding](onboarding.md)
- [AI Assistant](ai-assistant.md)
- [Issue](../ux/issue.md)
- [Discussion](../ux/discussion.md)
- [Poll](../ux/poll.md)