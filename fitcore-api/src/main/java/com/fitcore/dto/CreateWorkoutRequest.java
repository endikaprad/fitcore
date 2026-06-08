package com.fitcore.dto;

import lombok.Data;
import java.util.List;

@Data
public class CreateWorkoutRequest {
    private String name;
    private List<ExerciseEntry> exercises;

    @Data
    public static class ExerciseEntry {
        private Long exerciseId;
        private Integer targetSets;
        private String targetReps;
        private Integer restSeconds;
    }
}
