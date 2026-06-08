package com.fitcore.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "nutrition_goals")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class NutritionGoal {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "calories_target", nullable = false)
    private Integer caloriesTarget = 2000;

    @Column(name = "protein_pct")
    private Integer proteinPct = 30;

    @Column(name = "carbs_pct")
    private Integer carbsPct = 40;

    @Column(name = "fat_pct")
    private Integer fatPct = 30;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
