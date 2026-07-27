package com.djp.backend.repository;

import com.djp.backend.model.PollVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PollVoteRepository extends JpaRepository<PollVote, UUID> {
    Optional<PollVote> findByUserIdAndPollId(UUID userId, UUID pollId);
    boolean existsByUserIdAndPollId(UUID userId, UUID pollId);
    long countByPollId(UUID pollId);
}
