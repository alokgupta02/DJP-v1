package com.djp.backend.service;

import com.djp.backend.model.Discussion;
import com.djp.backend.model.Issue;
import com.djp.backend.model.Poll;
import com.djp.backend.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

@Service
public class SqlFilePersistenceService {

    private static final Logger log = LoggerFactory.getLogger(SqlFilePersistenceService.class);

    @Value("${app.persistence.sql-file.enabled:true}")
    private boolean enabled = true;

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    private synchronized void appendToFiles(String filename, String sqlStatement) {
        if (!enabled) {
            return;
        }

        String[] basePaths = {
                "src/main/resources/data/" + filename,
                "target/classes/data/" + filename
        };

        for (String basePath : basePaths) {
            Path path = Path.of(basePath);
            try {
                if (Files.exists(path)) {
                    String content = Files.readString(path);
                    if (!content.contains(sqlStatement.trim())) {
                        Files.writeString(path, "\n" + sqlStatement, StandardOpenOption.APPEND);
                        log.info("Successfully appended SQL to: {}", basePath);
                    }
                } else {
                    log.warn("SQL file not found at path: {}, creating it.", basePath);
                    if (path.getParent() != null) {
                        Files.createDirectories(path.getParent());
                    }
                    Files.writeString(path, sqlStatement, StandardOpenOption.CREATE, StandardOpenOption.WRITE);
                }
            } catch (Exception e) {
                log.error("Failed to append SQL to {}: {}", basePath, e.getMessage(), e);
            }
        }
    }

    private String escapeSql(String input) {
        if (input == null) return "NULL";
        return "'" + input.replace("'", "''") + "'";
    }

    public void appendUser(User user) {
        if (!enabled || user == null || user.getId() == null) return;
        String sql = String.format(
                "MERGE INTO users (id, email, name, provider, provider_id, role, reputation_score, subscription_status, onboarding_completed, privacy_consent_given, privacy_consent_timestamp, joined_date, location, pincode, country, state, district, city, locality, ward, constituency, occupation, bio, topics, dob, gender, phone_number)\n" +
                "KEY (id)\n" +
                "VALUES ('%s', %s, %s, %s, %s, %s, %d, %s, %b, %b, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);",
                user.getId(),
                escapeSql(user.getEmail()),
                escapeSql(user.getName()),
                user.getProvider() != null ? "'" + user.getProvider() + "'" : "'DEV'",
                escapeSql(user.getProviderId()),
                user.getRole() != null ? "'" + user.getRole() + "'" : "'CITIZEN'",
                user.getReputationScore() != null ? user.getReputationScore() : 0,
                user.getSubscriptionStatus() != null ? "'" + user.getSubscriptionStatus() + "'" : "'ACTIVE'",
                Boolean.TRUE.equals(user.getOnboardingCompleted()),
                Boolean.TRUE.equals(user.getPrivacyConsentGiven()),
                escapeSql(user.getLocation()),
                escapeSql(user.getPincode()),
                escapeSql(user.getCountry()),
                escapeSql(user.getState()),
                escapeSql(user.getDistrict()),
                escapeSql(user.getCity()),
                escapeSql(user.getLocality()),
                escapeSql(user.getWard()),
                escapeSql(user.getConstituency()),
                escapeSql(user.getOccupation()),
                escapeSql(user.getBio()),
                escapeSql(user.getTopics()),
                escapeSql(user.getDob()),
                escapeSql(user.getGender()),
                escapeSql(user.getPhoneNumber())
        );
        appendToFiles("users.sql", sql);
    }


    public void appendIssue(Issue issue) {
        if (!enabled || issue == null || issue.getId() == null) return;
        if (issue.getAuthor() != null) {
            appendUser(issue.getAuthor());
        }
        String authorId = issue.getAuthor() != null ? "'" + issue.getAuthor().getId() + "'" : "NULL";
        String sql = String.format(
                "MERGE INTO issues (id, author_id, title, description, category, priority, status, workflow_step, location, supports_count, comments_count, created_at, updated_at)\n" +
                "KEY (id)\n" +
                "VALUES ('%s', %s, %s, %s, %s, %s, %s, %d, %s, %d, %d, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());",
                issue.getId(),
                authorId,
                escapeSql(issue.getTitle()),
                escapeSql(issue.getDescription()),
                escapeSql(issue.getCategory()),
                issue.getPriority() != null ? "'" + issue.getPriority() + "'" : "'MEDIUM'",
                issue.getStatus() != null ? "'" + issue.getStatus() + "'" : "'REPORTED'",
                issue.getWorkflowStep(),
                escapeSql(issue.getLocation()),
                issue.getSupportsCount(),
                issue.getCommentsCount()
        );
        appendToFiles("issues.sql", sql);
    }

    public void appendDiscussion(Discussion discussion) {
        if (!enabled || discussion == null || discussion.getId() == null) return;
        if (discussion.getAuthor() != null) {
            appendUser(discussion.getAuthor());
        }
        String authorId = discussion.getAuthor() != null ? "'" + discussion.getAuthor().getId() + "'" : "NULL";
        String sql = String.format(
                "MERGE INTO discussions (id, author_id, title, description, category, votes_count, participant_count, proposal_count, proposal_preview, proposal_badge, proposal_badge_variant, created_at, updated_at)\n" +
                "KEY (id)\n" +
                "VALUES ('%s', %s, %s, %s, %s, %d, %d, %d, %s, %s, %s, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());",
                discussion.getId(),
                authorId,
                escapeSql(discussion.getTitle()),
                escapeSql(discussion.getDescription()),
                escapeSql(discussion.getCategory()),
                discussion.getVotesCount(),
                discussion.getParticipantCount(),
                discussion.getProposalCount(),
                escapeSql(discussion.getProposalPreview()),
                escapeSql(discussion.getProposalBadge()),
                escapeSql(discussion.getProposalBadgeVariant())
        );
        appendToFiles("discussions.sql", sql);
    }

    public void appendPoll(Poll poll) {
        if (!enabled || poll == null || poll.getId() == null) return;
        if (poll.getAuthor() != null) {
            appendUser(poll.getAuthor());
        }
        String authorId = poll.getAuthor() != null ? "'" + poll.getAuthor().getId() + "'" : "NULL";
        String sql = String.format(
                "MERGE INTO polls (id, author_id, question, description, category, options_json, votes_count, comments_count, expires_at, created_at, updated_at)\n" +
                "KEY (id)\n" +
                "VALUES ('%s', %s, %s, %s, %s, %s, %d, %d, CURRENT_TIMESTAMP() + INTERVAL '7' DAY, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());",
                poll.getId(),
                authorId,
                escapeSql(poll.getQuestion()),
                escapeSql(poll.getDescription()),
                escapeSql(poll.getCategory()),
                escapeSql(poll.getOptionsJson()),
                poll.getVotesCount(),
                poll.getCommentsCount()
        );
        appendToFiles("polls.sql", sql);
    }
}
