package com.djp.backend.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "representatives")
public class Representative {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 100)
    private String position;

    @Column(length = 200)
    private String ward;

    @Column(length = 100)
    private String party;

    @Column(length = 20)
    private String since;

    @Column(length = 30)
    private String phone;

    @Column(length = 255)
    private String email;

    @Column(length = 4)
    private String imageInitials;

    @Column(length = 50)
    private String avatarBg;

    @Column(length = 50)
    private String avatarTextColor;

    @Column(name = "issues_resolved")
    private int issuesResolved;

    @Column(name = "meetings_held")
    private int meetingsHeld;

    @Column(length = 10)
    private String attendance;

    @Column(columnDefinition = "TEXT")
    private String biography;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    public Representative() {}

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public String getWard() { return ward; }
    public void setWard(String ward) { this.ward = ward; }
    public String getParty() { return party; }
    public void setParty(String party) { this.party = party; }
    public String getSince() { return since; }
    public void setSince(String since) { this.since = since; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getImageInitials() { return imageInitials; }
    public void setImageInitials(String imageInitials) { this.imageInitials = imageInitials; }
    public String getAvatarBg() { return avatarBg; }
    public void setAvatarBg(String avatarBg) { this.avatarBg = avatarBg; }
    public String getAvatarTextColor() { return avatarTextColor; }
    public void setAvatarTextColor(String avatarTextColor) { this.avatarTextColor = avatarTextColor; }
    public int getIssuesResolved() { return issuesResolved; }
    public void setIssuesResolved(int issuesResolved) { this.issuesResolved = issuesResolved; }
    public int getMeetingsHeld() { return meetingsHeld; }
    public void setMeetingsHeld(int meetingsHeld) { this.meetingsHeld = meetingsHeld; }
    public String getAttendance() { return attendance; }
    public void setAttendance(String attendance) { this.attendance = attendance; }
    public String getBiography() { return biography; }
    public void setBiography(String biography) { this.biography = biography; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
}
