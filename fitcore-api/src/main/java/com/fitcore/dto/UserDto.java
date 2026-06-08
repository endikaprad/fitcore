package com.fitcore.dto;

import com.fitcore.model.User;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String email;
    private String name;
    private User.Goal goal;
    private Double weightKg;
    private Double heightCm;
    private Integer age;
    private User.Sex sex;

    public static UserDto from(User u) {
        UserDto dto = new UserDto();
        dto.setId(u.getId());
        dto.setEmail(u.getEmail());
        dto.setName(u.getName());
        dto.setGoal(u.getGoal());
        dto.setWeightKg(u.getWeightKg());
        dto.setHeightCm(u.getHeightCm());
        dto.setAge(u.getAge());
        dto.setSex(u.getSex());
        return dto;
    }
}
