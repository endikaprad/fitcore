package com.fitcore.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.List;

@Entity
@Table(name = "exercises")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "muscle_main", length = 50)
    private MuscleGroup muscleMain;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "muscles_sec", columnDefinition = "json")
    private List<String> musclesSec;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private Equipment equipment;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    @Column(name = "gif_url", length = 255)
    private String gifUrl;

    @Column(name = "is_custom")
    private boolean isCustom = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public enum MuscleGroup {
        CHEST, BACK, LEGS, SHOULDERS, ARMS, CORE, GLUTES, CALVES, FULL_BODY
    }

    public enum Equipment {
        BARBELL, DUMBBELL, CABLE, BODYWEIGHT, MACHINE, KETTLEBELL, RESISTANCE_BAND, OTHER
    }
}
