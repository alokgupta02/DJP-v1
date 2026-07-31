package com.djp.backend.repository;

import com.djp.backend.model.Petition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PetitionRepository extends JpaRepository<Petition, UUID> {
}
