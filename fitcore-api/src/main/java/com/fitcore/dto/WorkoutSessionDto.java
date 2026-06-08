package com.fitcore.dto;

import com.fitcore.model.WorkoutSession;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class WorkoutSessionDto {
    private Long id;
    private String name;
    private LocalDateTime startedAt;
    private LocalDateTime finishedAt;
    private Integer durationSeconds;
    private String notes;
    private List<SessionExerciseDto> exercises;

    public static WorkoutSessionDto from(WorkoutSession ws) {
        WorkoutSessionDto dto = new WorkoutSessionDto();
        dto.setId(ws.getId());
        dto.setName(ws.getName());
        dto.setStartedAt(ws.getStartedAt());
        dto.setFinishedAt(ws.getFinishedAt());
        dto.setDurationSeconds(ws.getDurationSeconds());
        dto.setNotes(ws.getNotes());
        dto.setExercises(ws.getExercises().stream().map(SessionExerciseDto::from).toList());
        return dto;
    }
}
