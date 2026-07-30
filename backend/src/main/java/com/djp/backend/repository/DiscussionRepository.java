package com.djp.backend.repository;

import com.djp.backend.model.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, UUID>, JpaSpecificationExecutor<Discussion> {
}
