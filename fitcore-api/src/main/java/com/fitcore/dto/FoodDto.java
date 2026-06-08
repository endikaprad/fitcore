package com.fitcore.dto;

import com.fitcore.model.Food;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class FoodDto {
    private Long id;
    private String barcode;
    private String name;
    private String brand;
    private BigDecimal calories100g;
    private BigDecimal protein100g;
    private BigDecimal carbs100g;
    private BigDecimal sugar100g;
    private BigDecimal fat100g;
    private BigDecimal fatSat100g;
    private BigDecimal fiber100g;

    public static FoodDto from(Food f) {
        FoodDto dto = new FoodDto();
        dto.setId(f.getId());
        dto.setBarcode(f.getBarcode());
        dto.setName(f.getName());
        dto.setBrand(f.getBrand());
        dto.setCalories100g(f.getCalories100g());
        dto.setProtein100g(f.getProtein100g());
        dto.setCarbs100g(f.getCarbs100g());
        dto.setSugar100g(f.getSugar100g());
        dto.setFat100g(f.getFat100g());
        dto.setFatSat100g(f.getFatSat100g());
        dto.setFiber100g(f.getFiber100g());
        return dto;
    }
}
