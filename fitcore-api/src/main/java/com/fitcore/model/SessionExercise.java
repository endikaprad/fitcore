package com.fitcore.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "session_exercises")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SessionExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "session_id", nullable = false)
    private WorkoutSession session;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    @Column(name = "target_sets")
    private Integer targetSets;

    @Column(name = "target_reps", length = 20)
    private String targetReps;

    @Column(name = "rest_seconds")
    private Integer restSeconds = 90;

    @OneToMany(mappedBy = "sessionExercise", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("setNumber ASC")
    @Builder.Default
    private List<ExerciseSet> sets = new ArrayList<>();
}
