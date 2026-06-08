package com.fitcore.dto;

import com.fitcore.model.FoodLogEntry;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class LogFoodRequest {
    @NotNull
    private Long foodId;

    @NotNull
    private FoodLogEntry.MealType mealType;

    @NotNull @Positive
    private BigDecimal quantityG;

    private LocalDate loggedAt;
}
