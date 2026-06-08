package com.fitcore.repository;

import com.fitcore.model.WorkoutSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface WorkoutSessionRepository extends JpaRepository<WorkoutSession, Long> {
    Page<WorkoutSession> findByUserIdOrderByStartedAtDesc(Long userId, Pageable pageable);
    Optional<WorkoutSession> findByIdAndUserId(Long id, Long userId);
}
