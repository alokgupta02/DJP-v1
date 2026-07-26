package com.djp.backend.repository;

import com.djp.backend.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface VoteRepository extends JpaRepository<Vote, UUID> {
    Optional<Vote> findByUserIdAndEntityIdAndEntityType(UUID userId, UUID entityId, String entityType);
}
