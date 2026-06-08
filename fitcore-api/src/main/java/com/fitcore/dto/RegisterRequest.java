package com.fitcore.dto;

import com.fitcore.model.User;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @Email @NotBlank
    private String email;

    @NotBlank @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank @Size(min = 2, max = 60)
    private String name;

    private User.Goal goal = User.Goal.MAINTENANCE;
    private Double weightKg;
    private Double heightCm;
    private Integer age;
    private User.Sex sex;
}
