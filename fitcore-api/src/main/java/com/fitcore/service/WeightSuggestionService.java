package com.fitcore.service;

import com.fitcore.dto.WeightSuggestionDto;
import com.fitcore.model.ExerciseSet;
import com.fitcore.repository.ExerciseSetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WeightSuggestionService {

    private final ExerciseSetRepository setRepo;

    private static final int SESSIONS_TO_ANALYZE = 4;
    private static final BigDecimal INCREMENT = BigDecimal.valueOf(2.5);
    private static final BigDecimal DELOAD_FACTOR = BigDecimal.valueOf(0.95);

    public WeightSuggestionDto suggest(Long exerciseId, Long userId) {
        List<ExerciseSet> sets = setRepo.findRecentSetsForExercise(exerciseId, userId);

        if (sets.isEmpty()) {
            return new WeightSuggestionDto(null, null, null, null, "No hay historial para este ejercicio");
        }

        // Get the last working set
        ExerciseSet lastSet = sets.get(0);
        BigDecimal lastWeight = lastSet.getWeightKg();
        int lastReps = lastSet.getReps() != null ? lastSet.getReps() : 0;

        // Estimate 1RM via Epley formula
        BigDecimal oneRm = estimateOneRm(lastWeight, lastReps);

        // Group sets by session (approximate: take first SESSIONS_TO_ANALYZE unique weights)
        BigDecimal suggestedWeight;
        String reason;

        // Check if last session hit all reps (assume target ~8 reps; missing if < target - 2)
        if (lastReps >= 6) {
            suggestedWeight = lastWeight.add(INCREMENT);
            reason = "Completaste las series correctamente. +2.5 kg para la siguiente sesión.";
        } else {
            suggestedWeight = lastWeight.multiply(DELOAD_FACTOR).setScale(2, RoundingMode.HALF_UP);
            // Round to nearest 0.5
            suggestedWeight = roundToHalf(suggestedWeight);
            reason = "Fallaste repeticiones. Se recomienda bajar el peso un 5%.";
        }

        return new WeightSuggestionDto(suggestedWeight, lastWeight, lastReps, oneRm, reason);
    }

    private BigDecimal estimateOneRm(BigDecimal weight, int reps) {
        if (weight == null || reps <= 0) return null;
        // Epley: weight * (1 + reps/30)
        double w = weight.doubleValue();
        double oneRm = w * (1 + reps / 30.0);
        return BigDecimal.valueOf(oneRm).setScale(1, RoundingMode.HALF_UP);
    }

    private BigDecimal roundToHalf(BigDecimal value) {
        return value.multiply(BigDecimal.valueOf(2))
            .setScale(0, RoundingMode.HALF_UP)
            .divide(BigDecimal.valueOf(2));
    }
}
