package com.fitcore.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "personal_records",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "exercise_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PersonalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Column(name = "weight_kg", precision = 5, scale = 2)
    private BigDecimal weightKg;

    private Integer reps;

    @Column(name = "one_rm", precision = 5, scale = 2)
    private BigDecimal oneRm;

    @Column(name = "achieved_at")
    private LocalDateTime achievedAt;
}
