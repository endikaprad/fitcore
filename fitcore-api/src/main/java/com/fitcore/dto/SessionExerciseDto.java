package com.fitcore.dto;

import com.fitcore.model.SessionExercise;
import lombok.Data;
import java.util.List;

@Data
public class SessionExerciseDto {
    private Long id;
    private ExerciseDto exercise;
    private Integer orderIndex;
    private Integer targetSets;
    private String targetReps;
    private Integer restSeconds;
    private List<SetDto> sets;

    public static SessionExerciseDto from(SessionExercise se) {
        SessionExerciseDto dto = new SessionExerciseDto();
        dto.setId(se.getId());
        dto.setExercise(ExerciseDto.from(se.getExercise()));
        dto.setOrderIndex(se.getOrderIndex());
        dto.setTargetSets(se.getTargetSets());
        dto.setTargetReps(se.getTargetReps());
        dto.setRestSeconds(se.getRestSeconds());
        dto.setSets(se.getSets().stream().map(SetDto::from).toList());
        return dto;
    }
}
