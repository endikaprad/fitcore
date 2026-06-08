package com.fitcore.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "food_log_entries")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FoodLogEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", length = 20)
    private MealType mealType;

    @Column(name = "quantity_g", nullable = false, precision = 6, scale = 1)
    private BigDecimal quantityG;

    @Column(name = "logged_at", nullable = false)
    private LocalDate loggedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum MealType {
        BREAKFAST, MID_MORNING, LUNCH, SNACK, DINNER, OTHER
    }
}
