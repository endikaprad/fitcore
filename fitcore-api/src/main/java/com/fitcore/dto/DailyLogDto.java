package com.fitcore.dto;

import com.fitcore.model.FoodLogEntry;
import lombok.Data;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Data
public class DailyLogDto {
    private LocalDate date;
    private BigDecimal totalCalories;
    private BigDecimal totalProteinG;
    private BigDecimal totalCarbsG;
    private BigDecimal totalFatG;
    private Map<FoodLogEntry.MealType, List<FoodLogEntryDto>> meals;

    public static DailyLogDto from(List<FoodLogEntry> entries, LocalDate date) {
        DailyLogDto dto = new DailyLogDto();
        dto.setDate(date);

        List<FoodLogEntryDto> dtos = entries.stream().map(FoodLogEntryDto::from).toList();

        dto.setMeals(dtos.stream().collect(
            Collectors.groupingBy(FoodLogEntryDto::getMealType,
                () -> new EnumMap<>(FoodLogEntry.MealType.class),
                Collectors.toList())
        ));

        dto.setTotalCalories(sum(dtos, FoodLogEntryDto::getCalories));
        dto.setTotalProteinG(sum(dtos, FoodLogEntryDto::getProteinG));
        dto.setTotalCarbsG(sum(dtos, FoodLogEntryDto::getCarbsG));
        dto.setTotalFatG(sum(dtos, FoodLogEntryDto::getFatG));
        return dto;
    }

    private static BigDecimal sum(List<FoodLogEntryDto> list,
                                   java.util.function.Function<FoodLogEntryDto, BigDecimal> getter) {
        return list.stream()
            .map(getter)
            .filter(Objects::nonNull)
            .reduce(BigDecimal.ZERO, BigDecimal::add)
            .setScale(1, RoundingMode.HALF_UP);
    }
}
