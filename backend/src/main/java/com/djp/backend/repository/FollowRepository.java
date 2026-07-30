package com.djp.backend.repository;

import com.djp.backend.model.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FollowRepository extends JpaRepository<Follow, UUID> {
    Optional<Follow> findByFollowerIdAndTargetIdAndTargetType(UUID followerId, UUID targetId, String targetType);
}
