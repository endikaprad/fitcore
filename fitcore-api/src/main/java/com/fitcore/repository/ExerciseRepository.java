package com.fitcore.repository;

import com.fitcore.model.Exercise;
import com.fitcore.model.Exercise.MuscleGroup;
import com.fitcore.model.Exercise.Equipment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    @Query("""
        SELECT e FROM Exercise e
        WHERE (e.user IS NULL OR e.user.id = :userId)
          AND (:search IS NULL OR LOWER(e.name) LIKE LOWER(CONCAT('%', :search, '%')))
          AND (:muscle IS NULL OR e.muscleMain = :muscle)
          AND (:equipment IS NULL OR e.equipment = :equipment)
        """)
    Page<Exercise> search(
        @Param("userId") Long userId,
        @Param("search") String search,
        @Param("muscle") MuscleGroup muscle,
        @Param("equipment") Equipment equipment,
        Pageable pageable
    );
}
