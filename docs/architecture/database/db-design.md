# 🗄️ **Database Schema & Relational Design**

---

| Metadata | Value |
| :--- | :--- |
| **📅 Last Updated** | 2026-07-18 00:50 |
| **📌 Status** | `Stable` |
| **🏷️ Version** | `v1.0.0` |
| **👥 Owner** | `Database & Infrastructure Team` |
| **🔗 Dependencies** | [overview.md](overview.md) |

---

## 1. Goal & Architecture Overview

This document specifies the database schemas, entity relations, constraint definitions, and dialect mappings for the **Digital Janata Platform (DJP)** database.

* **Production Target:** Supabase PostgreSQL.
* **Local Development & Unit Tests:** In-memory H2 Database.
* **JPA Mapping:** Entities are mapped via Spring Data JPA with CamelCase-to-snake_case naming strategies.

---

## 2. Database Schema Definition (SQL)

The following tables define the relational database structure. All table names, column names, and identifiers are strictly **lowercase** to align with PostgreSQL and Supabase best practices.

```sql
-- 1. Users table (OAuth profiles and subscription status)
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    provider VARCHAR(50) NOT NULL, -- 'GOOGLE', 'LINKEDIN'
    provider_id VARCHAR(255) NOT NULL,
    location VARCHAR(150),
    reputation_score INT DEFAULT 0, -- Lifetime badge score
    subscription_status VARCHAR(20) DEFAULT 'INACTIVE', -- 'ACTIVE', 'INACTIVE', 'SUSPENDED'
    subscription_ends_at TIMESTAMP WITH TIME ZONE,
    grace_period_ends_at TIMESTAMP WITH TIME ZONE,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    joined_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(20) DEFAULT 'CITIZEN', -- 'CITIZEN', 'LEADER'
    UNIQUE(provider, provider_id)
);

-- 2. Issues table (ELJ civic problems)
CREATE TABLE issues (
    id VARCHAR(36) PRIMARY KEY,
    author_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- e.g., 'Water', 'Education', 'Roads'
    priority VARCHAR(20) NOT NULL, -- 'LOW', 'MEDIUM', 'HIGH', 'URGENT', 'CRITICAL'
    status VARCHAR(20) DEFAULT 'REPORTED', -- 'REPORTED', 'VERIFIED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'
    workflow_step INT DEFAULT 0,
    location VARCHAR(150),
    supports_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Discussions table (general conversation threads)
CREATE TABLE discussions (
    id VARCHAR(36) PRIMARY KEY,
    author_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    related_issue_id VARCHAR(36),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (related_issue_id) REFERENCES issues(id) ON DELETE SET NULL
);

-- 4. Discussion replies table
CREATE TABLE discussion_replies (
    id VARCHAR(36) PRIMARY KEY,
    discussion_id VARCHAR(36) NOT NULL,
    author_id VARCHAR(36) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (discussion_id) REFERENCES discussions(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Polls table (citizen confidence polls)
CREATE TABLE polls (
    id VARCHAR(36) PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    options VARCHAR_ARRAY NOT NULL, -- local H2; maps to VARCHAR[] in Supabase PostgreSQL
    status VARCHAR(20) DEFAULT 'ACTIVE', -- 'ACTIVE', 'CLOSED'
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Poll votes table (ensures exactly 1 vote per user per poll)
CREATE TABLE poll_votes (
    id VARCHAR(36) PRIMARY KEY,
    poll_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    option_index INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(poll_id, user_id),
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. Reputation Transactions table (for rolling 6-month calculations)
CREATE TABLE reputation_transactions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    points INT NOT NULL,
    action_type VARCHAR(50) NOT NULL, -- e.g. 'ISSUE_REPORTED', 'FIX_VERIFIED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 3. Database Dialect Differences

| Feature | Local (H2 Dialect) | Production (Supabase PostgreSQL Dialect) | Mapping Rule |
| :--- | :--- | :--- | :--- |
| **Arrays** | `VARCHAR_ARRAY` | `VARCHAR[]` | Hibernate maps standard `List<String>` entity fields automatically based on the active profile. |
| **UUIDs** | `VARCHAR(36)` | `UUID` | H2 handles UUIDs as VARCHAR strings; PostgreSQL uses native binary UUID formats. |
| **JSON** | `VARCHAR` | `JSONB` | Local testing uses serialized strings; Supabase uses native indexing binary JSON. |

---

## 4. Entity Relation Rules
* **Cascading Deletes:** Deleting a user must delete their issues, discussions, and votes.
* **Referential Integrity:** Deleting an issue must **not** delete related discussions (sets foreign key `related_issue_id` to `NULL`).
