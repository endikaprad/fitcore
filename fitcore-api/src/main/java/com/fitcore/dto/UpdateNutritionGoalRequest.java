package com.fitcore.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UpdateNutritionGoalRequest {
    @NotNull @Min(500) @Max(10000)
    private Integer caloriesTarget;

    @NotNull @Min(0) @Max(100)
    private Integer proteinPct;

    @NotNull @Min(0) @Max(100)
    private Integer carbsPct;

    @NotNull @Min(0) @Max(100)
    private Integer fatPct;

    @AssertTrue(message = "Macronutrient percentages must sum to 100")
    public boolean isMacrosSumValid() {
        if (proteinPct == null || carbsPct == null || fatPct == null) return true;
        return proteinPct + carbsPct + fatPct == 100;
    }
}
