package com.fitcore.repository;

import com.fitcore.model.PersonalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PersonalRecordRepository extends JpaRepository<PersonalRecord, Long> {
    Optional<PersonalRecord> findByUserIdAndExerciseId(Long userId, Long exerciseId);
    List<PersonalRecord> findByUserIdOrderByAchievedAtDesc(Long userId);
}
