package com.djp.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(name = "auth_provider", nullable = false)
    private String authProvider; // 'google' or 'github'

    @Column(name = "provider_id", nullable = false)
    private String providerId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {}

    public User(String email, String name, String authProvider, String providerId) {
        this.email = email;
        this.name = name;
        this.authProvider = authProvider;
        this.providerId = providerId;
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAuthProvider() { return authProvider; }
    public String getProviderId() { return providerId; }
}
