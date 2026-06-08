package com.fitcore.service;

import com.fitcore.dto.*;
import com.fitcore.model.*;
import com.fitcore.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NutritionService {

    private final FoodLogEntryRepository logRepo;
    private final FoodRepository foodRepo;
    private final NutritionGoalRepository goalRepo;
    private final UserRepository userRepo;

    public FoodLogEntryDto log(LogFoodRequest req, Long userId) {
        User user = userRepo.getReferenceById(userId);
        Food food = foodRepo.findById(req.getFoodId())
            .orElseThrow(() -> new EntityNotFoundException("Food not found: " + req.getFoodId()));

        FoodLogEntry entry = FoodLogEntry.builder()
            .user(user)
            .food(food)
            .mealType(req.getMealType())
            .quantityG(req.getQuantityG())
            .loggedAt(req.getLoggedAt() != null ? req.getLoggedAt() : LocalDate.now())
            .build();

        return FoodLogEntryDto.from(logRepo.save(entry));
    }

    @Transactional(readOnly = true)
    public DailyLogDto getDailyLog(Long userId, LocalDate date) {
        List<FoodLogEntry> entries = logRepo.findByUserIdAndLoggedAtOrderByCreatedAtAsc(userId, date);
        return DailyLogDto.from(entries, date);
    }

    public void deleteEntry(Long entryId, Long userId) {
        FoodLogEntry entry = logRepo.findByIdAndUserId(entryId, userId)
            .orElseThrow(() -> new EntityNotFoundException("Log entry not found"));
        logRepo.delete(entry);
    }

    @Transactional(readOnly = true)
    public NutritionGoalDto getGoals(Long userId) {
        NutritionGoal goal = goalRepo.findByUserId(userId)
            .orElseGet(() -> createDefaultGoal(userId));
        return NutritionGoalDto.from(goal);
    }

    public NutritionGoalDto updateGoals(UpdateNutritionGoalRequest req, Long userId) {
        User user = userRepo.getReferenceById(userId);
        NutritionGoal goal = goalRepo.findByUserId(userId).orElseGet(() -> {
            NutritionGoal g = new NutritionGoal();
            g.setUser(user);
            return g;
        });
        goal.setCaloriesTarget(req.getCaloriesTarget());
        goal.setProteinPct(req.getProteinPct());
        goal.setCarbsPct(req.getCarbsPct());
        goal.setFatPct(req.getFatPct());
        return NutritionGoalDto.from(goalRepo.save(goal));
    }

    private NutritionGoal createDefaultGoal(Long userId) {
        User user = userRepo.getReferenceById(userId);
        NutritionGoal g = NutritionGoal.builder()
            .user(user)
            .caloriesTarget(2000)
            .proteinPct(30)
            .carbsPct(40)
            .fatPct(30)
            .build();
        return goalRepo.save(g);
    }
}
