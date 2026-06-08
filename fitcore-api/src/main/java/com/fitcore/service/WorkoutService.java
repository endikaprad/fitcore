package com.fitcore.service;

import com.fitcore.dto.*;
import com.fitcore.model.*;
import com.fitcore.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkoutService {

    private final WorkoutSessionRepository sessionRepo;
    private final ExerciseRepository exerciseRepo;
    private final ExerciseSetRepository setRepo;
    private final PersonalRecordRepository prRepo;
    private final UserRepository userRepo;

    public WorkoutSessionDto create(CreateWorkoutRequest req, Long userId) {
        User user = userRepo.getReferenceById(userId);
        WorkoutSession session = WorkoutSession.builder()
            .user(user)
            .name(req.getName())
            .startedAt(LocalDateTime.now())
            .exercises(new ArrayList<>())
            .build();

        if (req.getExercises() != null) {
            int index = 0;
            for (CreateWorkoutRequest.ExerciseEntry entry : req.getExercises()) {
                Exercise exercise = exerciseRepo.findById(entry.getExerciseId())
                    .orElseThrow(() -> new EntityNotFoundException("Exercise not found: " + entry.getExerciseId()));
                SessionExercise se = SessionExercise.builder()
                    .session(session)
                    .exercise(exercise)
                    .orderIndex(index++)
                    .targetSets(entry.getTargetSets())
                    .targetReps(entry.getTargetReps())
                    .restSeconds(entry.getRestSeconds() != null ? entry.getRestSeconds() : 90)
                    .sets(new ArrayList<>())
                    .build();
                session.getExercises().add(se);
            }
        }
        return WorkoutSessionDto.from(sessionRepo.save(session));
    }

    public SetDto addSet(Long sessionId, AddSetRequest req, Long userId) {
        WorkoutSession session = sessionRepo.findByIdAndUserId(sessionId, userId)
            .orElseThrow(() -> new EntityNotFoundException("Workout session not found"));

        SessionExercise se = session.getExercises().stream()
            .filter(e -> e.getId().equals(req.getSessionExerciseId()))
            .findFirst()
            .orElseThrow(() -> new EntityNotFoundException("SessionExercise not found"));

        int nextSetNumber = req.getSetNumber() != null
            ? req.getSetNumber()
            : se.getSets().size() + 1;

        ExerciseSet set = ExerciseSet.builder()
            .sessionExercise(se)
            .setNumber(nextSetNumber)
            .weightKg(req.getWeightKg())
            .reps(req.getReps())
            .rpe(req.getRpe())
            .isWarmup(req.isWarmup())
            .completedAt(LocalDateTime.now())
            .build();

        // PR detection
        if (!req.isWarmup() && req.getWeightKg() != null) {
            boolean isPr = checkAndUpdatePr(session.getUser(), se.getExercise(), req.getWeightKg(), req.getReps());
            set.setPr(isPr);
        }

        se.getSets().add(set);
        sessionRepo.save(session);
        return SetDto.from(set);
    }

    public WorkoutSessionDto finish(Long sessionId, Long userId) {
        WorkoutSession session = sessionRepo.findByIdAndUserId(sessionId, userId)
            .orElseThrow(() -> new EntityNotFoundException("Workout session not found"));
        session.setFinishedAt(LocalDateTime.now());
        long seconds = ChronoUnit.SECONDS.between(session.getStartedAt(), session.getFinishedAt());
        session.setDurationSeconds((int) seconds);
        return WorkoutSessionDto.from(sessionRepo.save(session));
    }

    @Transactional(readOnly = true)
    public Page<WorkoutSessionDto> history(Long userId, Pageable pageable) {
        return sessionRepo.findByUserIdOrderByStartedAtDesc(userId, pageable).map(WorkoutSessionDto::from);
    }

    @Transactional(readOnly = true)
    public WorkoutSessionDto getById(Long sessionId, Long userId) {
        return sessionRepo.findByIdAndUserId(sessionId, userId)
            .map(WorkoutSessionDto::from)
            .orElseThrow(() -> new EntityNotFoundException("Workout session not found"));
    }

    private boolean checkAndUpdatePr(User user, Exercise exercise, BigDecimal weight, Integer reps) {
        BigDecimal oneRm = estimateOneRm(weight, reps != null ? reps : 1);
        return prRepo.findByUserIdAndExerciseId(user.getId(), exercise.getId())
            .map(existing -> {
                if (oneRm != null && oneRm.compareTo(existing.getOneRm() != null ? existing.getOneRm() : BigDecimal.ZERO) > 0) {
                    existing.setWeightKg(weight);
                    existing.setReps(reps);
                    existing.setOneRm(oneRm);
                    existing.setAchievedAt(LocalDateTime.now());
                    prRepo.save(existing);
                    return true;
                }
                return false;
            })
            .orElseGet(() -> {
                prRepo.save(PersonalRecord.builder()
                    .user(user)
                    .exercise(exercise)
                    .weightKg(weight)
                    .reps(reps)
                    .oneRm(oneRm)
                    .achievedAt(LocalDateTime.now())
                    .build());
                return true;
            });
    }

    private BigDecimal estimateOneRm(BigDecimal weight, int reps) {
        if (weight == null || reps <= 0) return null;
        double w = weight.doubleValue();
        return BigDecimal.valueOf(w * (1 + reps / 30.0)).setScale(1, RoundingMode.HALF_UP);
    }
}
