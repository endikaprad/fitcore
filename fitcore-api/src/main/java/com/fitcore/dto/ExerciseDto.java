package com.fitcore.dto;

import com.fitcore.model.Exercise;
import lombok.Data;
import java.util.List;

@Data
public class ExerciseDto {
    private Long id;
    private String name;
    private Exercise.MuscleGroup muscleMain;
    private List<String> musclesSec;
    private Exercise.Equipment equipment;
    private String instructions;
    private String gifUrl;
    private boolean isCustom;

    public static ExerciseDto from(Exercise e) {
        ExerciseDto dto = new ExerciseDto();
        dto.setId(e.getId());
        dto.setName(e.getName());
        dto.setMuscleMain(e.getMuscleMain());
        dto.setMusclesSec(e.getMusclesSec());
        dto.setEquipment(e.getEquipment());
        dto.setInstructions(e.getInstructions());
        dto.setGifUrl(e.getGifUrl());
        dto.setCustom(e.isCustom());
        return dto;
    }
}
