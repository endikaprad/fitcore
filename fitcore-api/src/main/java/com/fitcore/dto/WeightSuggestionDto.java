package com.fitcore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data @AllArgsConstructor
public class WeightSuggestionDto {
    private BigDecimal suggestedWeightKg;
    private BigDecimal lastWeightKg;
    private Integer lastReps;
    private BigDecimal estimatedOneRm;
    private String reason;
}
