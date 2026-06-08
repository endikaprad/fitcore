package com.fitcore.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class AddSetRequest {
    @NotNull
    private Long sessionExerciseId;
    private Integer setNumber;
    private BigDecimal weightKg;
    @NotNull
    private Integer reps;
    private Integer rpe;
    private boolean isWarmup = false;
}
