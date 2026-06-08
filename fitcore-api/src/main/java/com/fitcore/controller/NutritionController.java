package com.fitcore.controller;

import com.fitcore.config.SecurityUtils;
import com.fitcore.dto.*;
import com.fitcore.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/nutrition")
@RequiredArgsConstructor
public class NutritionController {

    private final NutritionService nutritionService;
    private final OpenFoodFactsService foodFactsService;

    // --- Food search ---

    @GetMapping("/foods/search")
    public List<FoodDto> searchFoods(
        @RequestParam String q,
        @RequestParam(defaultValue = "0") int page
    ) {
        return foodFactsService.search(q, page);
    }

    @GetMapping("/foods/barcode/{code}")
    public ResponseEntity<FoodDto> findByBarcode(@PathVariable String code) {
        return foodFactsService.findByBarcode(code)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // --- Food log ---

    @PostMapping("/log")
    public ResponseEntity<FoodLogEntryDto> log(@Valid @RequestBody LogFoodRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(nutritionService.log(req, SecurityUtils.currentUserId()));
    }

    @GetMapping("/log")
    public DailyLogDto getDailyLog(
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return nutritionService.getDailyLog(
            SecurityUtils.currentUserId(),
            date != null ? date : LocalDate.now()
        );
    }

    @DeleteMapping("/log/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        nutritionService.deleteEntry(id, SecurityUtils.currentUserId());
        return ResponseEntity.noContent().build();
    }

    // --- Goals ---

    @GetMapping("/goals")
    public NutritionGoalDto getGoals() {
        return nutritionService.getGoals(SecurityUtils.currentUserId());
    }

    @PutMapping("/goals")
    public NutritionGoalDto updateGoals(@Valid @RequestBody UpdateNutritionGoalRequest req) {
        return nutritionService.updateGoals(req, SecurityUtils.currentUserId());
    }
}
