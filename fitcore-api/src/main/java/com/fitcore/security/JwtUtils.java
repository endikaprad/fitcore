package com.fitcore.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtils {

    private final SecretKey key;
    private final long expirationMs;
    private final long refreshExpirationMs;

    public JwtUtils(
        @Value("${fitcore.jwt.secret}") String secret,
        @Value("${fitcore.jwt.expiration-ms}") long expirationMs,
        @Value("${fitcore.jwt.refresh-expiration-ms}") long refreshExpirationMs
    ) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
        this.refreshExpirationMs = refreshExpirationMs;
    }

    public String generateAccessToken(String email) {
        return buildToken(email, expirationMs, "access");
    }

    public String generateRefreshToken(String email) {
        return buildToken(email, refreshExpirationMs, "refresh");
    }

    private String buildToken(String subject, long ttl, String type) {
        return Jwts.builder()
            .subject(subject)
            .claim("type", type)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + ttl))
            .signWith(key)
            .compact();
    }

    public String getEmailFromToken(String token) {
        return parseClaims(token).getSubject();
    }

    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }
}
