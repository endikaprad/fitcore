package com.fitcore.config;

import com.fitcore.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public final class SecurityUtils {

    private SecurityUtils() {}

    public static String currentEmail() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails ud) return ud.getUsername();
        return principal.toString();
    }

    public static Long currentUserId() {
        // Resolved lazily via ApplicationContext — injected at startup
        return UserIdHolder.resolve(currentEmail());
    }

    // Inner holder to avoid circular dependency
    public static class UserIdHolder {
        private static UserRepository userRepository;

        public static void setUserRepository(UserRepository repo) {
            userRepository = repo;
        }

        static Long resolve(String email) {
            return userRepository.findByEmail(email)
                .map(u -> u.getId())
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found: " + email));
        }
    }
}
