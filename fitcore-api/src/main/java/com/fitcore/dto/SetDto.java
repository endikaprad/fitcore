package com.fitcore.dto;

import com.fitcore.model.ExerciseSet;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class SetDto {
    private Long id;
    private Integer setNumber;
    private BigDecimal weightKg;
    private Integer reps;
    private Integer rpe;
    private boolean isWarmup;
    private boolean isPr;
    private LocalDateTime completedAt;

    public static SetDto from(ExerciseSet s) {
        SetDto dto = new SetDto();
        dto.setId(s.getId());
        dto.setSetNumber(s.getSetNumber());
        dto.setWeightKg(s.getWeightKg());
        dto.setReps(s.getReps());
        dto.setRpe(s.getRpe());
        dto.setWarmup(s.isWarmup());
        dto.setPr(s.isPr());
        dto.setCompletedAt(s.getCompletedAt());
        return dto;
    }
}
