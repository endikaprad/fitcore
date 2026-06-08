package com.fitcore.controller;

import com.fitcore.config.SecurityUtils;
import com.fitcore.dto.*;
import com.fitcore.service.WorkoutService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workouts")
@RequiredArgsConstructor
public class WorkoutController {

    private final WorkoutService workoutService;

    @PostMapping
    public ResponseEntity<WorkoutSessionDto> create(@RequestBody CreateWorkoutRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(workoutService.create(req, SecurityUtils.currentUserId()));
    }

    @PostMapping("/{id}/sets")
    public ResponseEntity<SetDto> addSet(
        @PathVariable Long id,
        @Valid @RequestBody AddSetRequest req
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(workoutService.addSet(id, req, SecurityUtils.currentUserId()));
    }

    @PostMapping("/{id}/finish")
    public WorkoutSessionDto finish(@PathVariable Long id) {
        return workoutService.finish(id, SecurityUtils.currentUserId());
    }

    @GetMapping("/{id}")
    public WorkoutSessionDto getById(@PathVariable Long id) {
        return workoutService.getById(id, SecurityUtils.currentUserId());
    }

    @GetMapping("/history")
    public Page<WorkoutSessionDto> history(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return workoutService.history(SecurityUtils.currentUserId(), PageRequest.of(page, size));
    }
}
