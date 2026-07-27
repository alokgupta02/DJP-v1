package com.djp.backend.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "petitions")
public class Petition {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(length = 50)
    private String category;

    @Column(name = "target_authority", length = 150)
    private String targetAuthority;

    @Column(name = "signature_goal", nullable = false)
    private int signatureGoal = 100;

    @Column(name = "signature_count", nullable = false)
    private int signatureCount = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @Column(name = "expires_at")
    private OffsetDateTime expiresAt = OffsetDateTime.now().plusDays(30);

    public Petition() {}

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getTargetAuthority() { return targetAuthority; }
    public void setTargetAuthority(String targetAuthority) { this.targetAuthority = targetAuthority; }
    public int getSignatureGoal() { return signatureGoal; }
    public void setSignatureGoal(int signatureGoal) { this.signatureGoal = signatureGoal; }
    public int getSignatureCount() { return signatureCount; }
    public void setSignatureCount(int signatureCount) { this.signatureCount = signatureCount; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public OffsetDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(OffsetDateTime expiresAt) { this.expiresAt = expiresAt; }
}
