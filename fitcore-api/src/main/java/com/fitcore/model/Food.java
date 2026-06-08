package com.fitcore.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "foods")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, unique = true)
    private String barcode;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 100)
    private String brand;

    @Column(name = "calories_100g", precision = 6, scale = 2)
    private BigDecimal calories100g;

    @Column(name = "protein_100g", precision = 5, scale = 2)
    private BigDecimal protein100g;

    @Column(name = "carbs_100g", precision = 5, scale = 2)
    private BigDecimal carbs100g;

    @Column(name = "sugar_100g", precision = 5, scale = 2)
    private BigDecimal sugar100g;

    @Column(name = "fat_100g", precision = 5, scale = 2)
    private BigDecimal fat100g;

    @Column(name = "fat_sat_100g", precision = 5, scale = 2)
    private BigDecimal fatSat100g;

    @Column(name = "fiber_100g", precision = 5, scale = 2)
    private BigDecimal fiber100g;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Source source = Source.OPENFOODFACTS;

    public enum Source { OPENFOODFACTS, CUSTOM, LOCAL_DB }
}
