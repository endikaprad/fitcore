package com.fitcore.service;

import com.fitcore.dto.*;
import com.fitcore.model.User;
import com.fitcore.repository.UserRepository;
import com.fitcore.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authManager;

    public AuthResponse register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }
        User user = User.builder()
            .email(req.getEmail())
            .password(passwordEncoder.encode(req.getPassword()))
            .name(req.getName())
            .goal(req.getGoal())
            .weightKg(req.getWeightKg())
            .heightCm(req.getHeightCm())
            .age(req.getAge())
            .sex(req.getSex())
            .build();
        userRepo.save(user);
        return buildTokenResponse(user);
    }

    public AuthResponse login(AuthRequest req) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        User user = userRepo.findByEmail(req.getEmail()).orElseThrow();
        return buildTokenResponse(user);
    }

    public AuthResponse refresh(String refreshToken) {
        if (!jwtUtils.validateToken(refreshToken)) {
            throw new IllegalArgumentException("Invalid refresh token");
        }
        String email = jwtUtils.getEmailFromToken(refreshToken);
        User user = userRepo.findByEmail(email).orElseThrow();
        return buildTokenResponse(user);
    }

    private AuthResponse buildTokenResponse(User user) {
        return new AuthResponse(
            jwtUtils.generateAccessToken(user.getEmail()),
            jwtUtils.generateRefreshToken(user.getEmail()),
            UserDto.from(user)
        );
    }
}
