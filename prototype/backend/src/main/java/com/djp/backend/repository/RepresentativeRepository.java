package com.djp.backend.repository;

import com.djp.backend.model.Representative;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RepresentativeRepository extends JpaRepository<Representative, UUID> {
}
