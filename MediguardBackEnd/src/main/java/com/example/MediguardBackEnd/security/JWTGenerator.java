package com.example.MediguardBackEnd.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JWTGenerator {

    Logger logger = LoggerFactory.getLogger(JWTGenerator.class);

    private final Key key = Keys.hmacShaKeyFor(SecurityConstants.JWT_SECRET.getBytes());

    public String generateToken(Authentication authentication){
        String username = authentication.getName();
        Instant currentInstant = Instant.now();
        Instant expireInstant = currentInstant.plus(SecurityConstants.JWT_EXPIRATION, ChronoUnit.HOURS);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(Date.from(currentInstant))
                .setExpiration(Date.from(expireInstant))
                .signWith(key)
                .compact();
    }

    //Extracts the username from a JWT
    public String getUsernameFromJWT(String token){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    //Validate the token
//    public boolean validateToken(String token){
//        try{
//            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
//            return true;
//        } catch (Exception e){
//            throw new AuthenticationCredentialsNotFoundException("JWT token is expired or invalid");
//        }
//    }

    public boolean validateToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key) // Ensure that the key matches the one used for signing
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // Check if the token is expired
            Date expirationDate = claims.getExpiration();
            // Log the expiration date
            logger.info("Token expiration date: {}", expirationDate);

            // Check if the token is expired and log the result
            boolean isTokenValid = expirationDate != null && !expirationDate.before(new Date());
            logger.info("Token validation result: {}", isTokenValid);

            return isTokenValid;
        } catch (JwtException | IllegalArgumentException e) {
            // Log the exception for debugging
            logger.error("Token validation failed: {}", e.getMessage());
            return false;
        }
    }


    /*
    Structure of a JSON Web Token (JWT)
        Header
        Payload
        Signature
     */
}