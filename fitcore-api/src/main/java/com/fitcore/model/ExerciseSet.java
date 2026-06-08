package com.fitcore.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "sets")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ExerciseSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "session_exercise_id", nullable = false)
    private SessionExercise sessionExercise;

    @Column(name = "set_number", nullable = false)
    private Integer setNumber;

    @Column(name = "weight_kg", precision = 5, scale = 2)
    private BigDecimal weightKg;

    private Integer reps;

    @Column(columnDefinition = "TINYINT")
    private Integer rpe;

    @Column(name = "is_warmup")
    private boolean isWarmup = false;

    @Column(name = "is_pr")
    private boolean isPr = false;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}
