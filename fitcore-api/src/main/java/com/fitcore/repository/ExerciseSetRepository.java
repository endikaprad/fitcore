package com.fitcore.repository;

import com.fitcore.model.ExerciseSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ExerciseSetRepository extends JpaRepository<ExerciseSet, Long> {

    @Query("""
        SELECT s FROM ExerciseSet s
        JOIN s.sessionExercise se
        JOIN se.session ws
        WHERE se.exercise.id = :exerciseId
          AND ws.user.id = :userId
          AND ws.finishedAt IS NOT NULL
          AND s.isWarmup = false
        ORDER BY ws.startedAt DESC
        """)
    List<ExerciseSet> findRecentSetsForExercise(
        @Param("exerciseId") Long exerciseId,
        @Param("userId") Long userId
    );
}
