package com.fitcore.repository;

import com.fitcore.model.NutritionGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NutritionGoalRepository extends JpaRepository<NutritionGoal, Long> {
    Optional<NutritionGoal> findByUserId(Long userId);
}
