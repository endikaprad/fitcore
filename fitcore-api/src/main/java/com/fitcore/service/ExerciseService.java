package com.fitcore.service;

import com.fitcore.dto.*;
import com.fitcore.model.Exercise;
import com.fitcore.model.User;
import com.fitcore.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepository exerciseRepo;
    private final UserRepository userRepo;

    public Page<ExerciseDto> search(Long userId, String search, String muscle, String equipment, Pageable pageable) {
        Exercise.MuscleGroup muscleGroup = parseEnum(Exercise.MuscleGroup.class, muscle);
        Exercise.Equipment eq = parseEnum(Exercise.Equipment.class, equipment);
        return exerciseRepo.search(userId, search, muscleGroup, eq, pageable).map(ExerciseDto::from);
    }

    public ExerciseDto getById(Long id, Long userId) {
        Exercise e = exerciseRepo.findById(id)
            .filter(ex -> ex.getUser() == null || ex.getUser().getId().equals(userId))
            .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException("Exercise not found"));
        return ExerciseDto.from(e);
    }

    public ExerciseDto create(CreateExerciseRequest req, Long userId) {
        User user = userRepo.getReferenceById(userId);
        Exercise e = Exercise.builder()
            .name(req.getName())
            .muscleMain(req.getMuscleMain())
            .musclesSec(req.getMusclesSec())
            .equipment(req.getEquipment())
            .instructions(req.getInstructions())
            .gifUrl(req.getGifUrl())
            .isCustom(true)
            .user(user)
            .build();
        return ExerciseDto.from(exerciseRepo.save(e));
    }

    private <T extends Enum<T>> T parseEnum(Class<T> clazz, String value) {
        if (value == null || value.isBlank()) return null;
        try {
            return Enum.valueOf(clazz, value.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
