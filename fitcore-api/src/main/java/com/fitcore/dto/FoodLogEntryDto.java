package com.fitcore.dto;

import com.fitcore.model.FoodLogEntry;
import lombok.Data;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;

@Data
public class FoodLogEntryDto {
    private Long id;
    private FoodDto food;
    private FoodLogEntry.MealType mealType;
    private BigDecimal quantityG;
    private LocalDate loggedAt;

    // Computed macros for this entry
    private BigDecimal calories;
    private BigDecimal proteinG;
    private BigDecimal carbsG;
    private BigDecimal fatG;

    public static FoodLogEntryDto from(FoodLogEntry entry) {
        FoodLogEntryDto dto = new FoodLogEntryDto();
        dto.setId(entry.getId());
        dto.setFood(FoodDto.from(entry.getFood()));
        dto.setMealType(entry.getMealType());
        dto.setQuantityG(entry.getQuantityG());
        dto.setLoggedAt(entry.getLoggedAt());

        BigDecimal factor = entry.getQuantityG().divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);
        dto.setCalories(multiply(entry.getFood().getCalories100g(), factor));
        dto.setProteinG(multiply(entry.getFood().getProtein100g(), factor));
        dto.setCarbsG(multiply(entry.getFood().getCarbs100g(), factor));
        dto.setFatG(multiply(entry.getFood().getFat100g(), factor));
        return dto;
    }

    private static BigDecimal multiply(BigDecimal a, BigDecimal b) {
        if (a == null) return BigDecimal.ZERO;
        return a.multiply(b).setScale(1, RoundingMode.HALF_UP);
    }
}
