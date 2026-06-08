package com.fitcore.dto;

import com.fitcore.model.NutritionGoal;
import lombok.Data;

@Data
public class NutritionGoalDto {
    private Integer caloriesTarget;
    private Integer proteinPct;
    private Integer carbsPct;
    private Integer fatPct;
    // Derived gram targets
    private Integer proteinG;
    private Integer carbsG;
    private Integer fatG;

    public static NutritionGoalDto from(NutritionGoal g) {
        NutritionGoalDto dto = new NutritionGoalDto();
        dto.setCaloriesTarget(g.getCaloriesTarget());
        dto.setProteinPct(g.getProteinPct());
        dto.setCarbsPct(g.getCarbsPct());
        dto.setFatPct(g.getFatPct());
        dto.setProteinG((int) Math.round(g.getCaloriesTarget() * g.getProteinPct() / 100.0 / 4));
        dto.setCarbsG((int) Math.round(g.getCaloriesTarget() * g.getCarbsPct() / 100.0 / 4));
        dto.setFatG((int) Math.round(g.getCaloriesTarget() * g.getFatPct() / 100.0 / 9));
        return dto;
    }
}
