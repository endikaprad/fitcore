package com.fitcore.controller;

import com.fitcore.config.SecurityUtils;
import com.fitcore.dto.UserDto;
import com.fitcore.model.User;
import com.fitcore.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepo;

    @GetMapping("/me")
    public UserDto me() {
        Long userId = SecurityUtils.currentUserId();
        return userRepo.findById(userId)
            .map(UserDto::from)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @PutMapping("/me")
    public UserDto update(@RequestBody UserDto dto) {
        Long userId = SecurityUtils.currentUserId();
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));
        if (dto.getName() != null) user.setName(dto.getName());
        if (dto.getGoal() != null) user.setGoal(dto.getGoal());
        if (dto.getWeightKg() != null) user.setWeightKg(dto.getWeightKg());
        if (dto.getHeightCm() != null) user.setHeightCm(dto.getHeightCm());
        if (dto.getAge() != null) user.setAge(dto.getAge());
        if (dto.getSex() != null) user.setSex(dto.getSex());
        return UserDto.from(userRepo.save(user));
    }
}
