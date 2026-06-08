package com.fitcore.dto;

import com.fitcore.model.Exercise;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

@Data
public class CreateExerciseRequest {
    @NotBlank
    private String name;
    private Exercise.MuscleGroup muscleMain;
    private List<String> musclesSec;
    private Exercise.Equipment equipment;
    private String instructions;
    private String gifUrl;
}
