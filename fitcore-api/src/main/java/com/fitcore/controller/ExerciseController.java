package com.fitcore.controller;

import com.fitcore.dto.*;
import com.fitcore.service.*;
import com.fitcore.config.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exercises")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;
    private final WeightSuggestionService weightSuggestionService;

    @GetMapping
    public Page<ExerciseDto> search(
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String muscle,
        @RequestParam(required = false) String equipment,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        Long userId = SecurityUtils.currentUserId();
        return exerciseService.search(userId, search, muscle, equipment, PageRequest.of(page, size, Sort.by("name")));
    }

    @GetMapping("/{id}")
    public ExerciseDto getById(@PathVariable Long id) {
        return exerciseService.getById(id, SecurityUtils.currentUserId());
    }

    @PostMapping
    public ResponseEntity<ExerciseDto> create(@Valid @RequestBody CreateExerciseRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(exerciseService.create(req, SecurityUtils.currentUserId()));
    }

    @GetMapping("/{id}/suggestion")
    public WeightSuggestionDto suggestion(@PathVariable Long id) {
        return weightSuggestionService.suggest(id, SecurityUtils.currentUserId());
    }
}
