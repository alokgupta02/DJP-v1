package com.djp.backend.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
    name = "users",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"provider", "provider_id"})
    }
)
@com.fasterxml.jackson.annotation.JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "provider", nullable = false, length = 50)
    private String provider; // 'GOOGLE', 'GITHUB', 'LINKEDIN'

    @Column(name = "provider_id", nullable = false)
    private String providerId;

    @Column(name = "location", length = 150)
    private String location;

    @Column(name = "pincode", length = 20)
    private String pincode;

    @Column(name = "occupation", length = 100)
    private String occupation;

    @Column(name = "bio", length = 1000)
    private String bio;

    @Column(name = "topics", length = 1000)
    private String topics;

    @Column(name = "reputation_score", nullable = false)
    private Integer reputationScore = 0;

    @Column(name = "subscription_status", nullable = false, length = 20)
    private String subscriptionStatus = "INACTIVE"; // 'ACTIVE', 'INACTIVE', 'SUSPENDED'

    @Column(name = "subscription_ends_at")
    private OffsetDateTime subscriptionEndsAt;

    @Column(name = "grace_period_ends_at")
    private OffsetDateTime gracePeriodEndsAt;

    @Column(name = "onboarding_completed", nullable = false)
    private Boolean onboardingCompleted = false;

    @Column(name = "privacy_consent_given", nullable = false)
    private Boolean privacyConsentGiven = false;

    @Column(name = "privacy_consent_timestamp")
    private OffsetDateTime privacyConsentTimestamp;

    @Column(name = "joined_date", nullable = false, updatable = false)
    private OffsetDateTime joinedDate = OffsetDateTime.now();

    @Column(name = "role", nullable = false, length = 20)
    private String role = "CITIZEN"; // 'CITIZEN', 'LEADER'

    public User() {}

    public User(String email, String name, String provider, String providerId) {
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.providerId = providerId;
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getTopics() {
        return topics;
    }

    public void setTopics(String topics) {
        this.topics = topics;
    }

    public Integer getReputationScore() {
        return reputationScore;
    }

    public void setReputationScore(Integer reputationScore) {
        this.reputationScore = reputationScore;
    }

    public String getSubscriptionStatus() {
        return subscriptionStatus;
    }

    public void setSubscriptionStatus(String subscriptionStatus) {
        this.subscriptionStatus = subscriptionStatus;
    }

    public OffsetDateTime getSubscriptionEndsAt() {
        return subscriptionEndsAt;
    }

    public void setSubscriptionEndsAt(OffsetDateTime subscriptionEndsAt) {
        this.subscriptionEndsAt = subscriptionEndsAt;
    }

    public OffsetDateTime getGracePeriodEndsAt() {
        return gracePeriodEndsAt;
    }

    public void setGracePeriodEndsAt(OffsetDateTime gracePeriodEndsAt) {
        this.gracePeriodEndsAt = gracePeriodEndsAt;
    }

    public Boolean getOnboardingCompleted() {
        return onboardingCompleted;
    }

    public void setOnboardingCompleted(Boolean onboardingCompleted) {
        this.onboardingCompleted = onboardingCompleted;
    }

    public Boolean getPrivacyConsentGiven() {
        return privacyConsentGiven;
    }

    public void setPrivacyConsentGiven(Boolean privacyConsentGiven) {
        this.privacyConsentGiven = privacyConsentGiven;
    }

    public OffsetDateTime getPrivacyConsentTimestamp() {
        return privacyConsentTimestamp;
    }

    public void setPrivacyConsentTimestamp(OffsetDateTime privacyConsentTimestamp) {
        this.privacyConsentTimestamp = privacyConsentTimestamp;
    }

    public OffsetDateTime getJoinedDate() {
        return joinedDate;
    }

    public void setJoinedDate(OffsetDateTime joinedDate) {
        this.joinedDate = joinedDate;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
