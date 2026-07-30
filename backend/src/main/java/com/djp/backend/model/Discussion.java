package com.djp.backend.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "discussions")
public class Discussion {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false, foreignKey = @ForeignKey(name = "fk_discussions_author"))
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User author;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(name = "location", length = 150)
    private String location;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "gov_level", length = 50)
    private String govLevel;

    @Column(name = "votes_count", nullable = false)
    private Integer votesCount = 0;

    @Column(name = "participant_count", nullable = false)
    private Integer participantCount = 1;

    @Column(name = "proposal_count", nullable = false)
    private Integer proposalCount = 0;

    @Column(name = "proposal_preview", columnDefinition = "TEXT")
    private String proposalPreview;

    @Column(name = "proposal_badge", length = 50)
    private String proposalBadge;

    @Column(name = "proposal_badge_variant", length = 20)
    private String proposalBadgeVariant = "primary"; // 'primary', 'warning', 'info', 'muted'

    @Column(name = "comments_count", nullable = false)
    private Integer commentsCount = 0;

    @Column(columnDefinition = "TEXT")
    private String metadata;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt = OffsetDateTime.now();

    public Discussion() {}

    public Discussion(User author, String title, String description, String category) {
        this.author = author;
        this.title = title;
        this.description = description;
        this.category = category;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = OffsetDateTime.now();
        updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getGovLevel() {
        return govLevel;
    }

    public void setGovLevel(String govLevel) {
        this.govLevel = govLevel;
    }

    public Integer getVotesCount() {
        return votesCount;
    }

    public void setVotesCount(Integer votesCount) {
        this.votesCount = votesCount;
    }

    public Integer getParticipantCount() {
        return participantCount;
    }

    public void setParticipantCount(Integer participantCount) {
        this.participantCount = participantCount;
    }

    public Integer getProposalCount() {
        return proposalCount;
    }

    public void setProposalCount(Integer proposalCount) {
        this.proposalCount = proposalCount;
    }

    public String getProposalPreview() {
        return proposalPreview;
    }

    public void setProposalPreview(String proposalPreview) {
        this.proposalPreview = proposalPreview;
    }

    public String getProposalBadge() {
        return proposalBadge;
    }

    public void setProposalBadge(String proposalBadge) {
        this.proposalBadge = proposalBadge;
    }

    public String getProposalBadgeVariant() {
        return proposalBadgeVariant;
    }

    public void setProposalBadgeVariant(String proposalBadgeVariant) {
        this.proposalBadgeVariant = proposalBadgeVariant;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(Integer commentsCount) {
        this.commentsCount = commentsCount;
    }

    public String getMetadata() {
        return metadata;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }
}
