package com.fitcore.repository;

import com.fitcore.model.FoodLogEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FoodLogEntryRepository extends JpaRepository<FoodLogEntry, Long> {
    List<FoodLogEntry> findByUserIdAndLoggedAtOrderByCreatedAtAsc(Long userId, LocalDate date);
    Optional<FoodLogEntry> findByIdAndUserId(Long id, Long userId);
}
