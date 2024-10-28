package com.example.MediguardBackEnd.security;

import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import com.example.MediguardBackEnd.services.servicesImpl.CustomUserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(JWTAuthenticationFilter.class);

    @Autowired
    private JWTGenerator tokenGenerator;
    @Autowired
    private CustomUserDetailsServiceImpl customUserDetailsServiceImpl;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");
        logger.warn("Received Authorization header: {}", authorizationHeader);

        String token = getJWTFromRequest(request);
        logger.warn("Extracted token: {}", token);

        if (StringUtils.hasText(token)) {
            logger.warn("Token is present");

            logger.warn("Validating token: {}", token);
            boolean isValid = tokenGenerator.validateToken(token);
            logger.warn("Token validation result: {}", isValid);

            if (isValid) {
                logger.warn("Token is valid");

                String username = tokenGenerator.getUsernameFromJWT(token);
                logger.warn("Extracted username: {}", username);

                UserDetails userDetails = customUserDetailsServiceImpl.loadUserByUsername(username);
                if (userDetails != null) {
                    logger.warn("User details loaded: {} {}", userDetails.getUsername(), userDetails.getAuthorities());

                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                    logger.warn("Authentication set in SecurityContext");
                } else {
                    logger.warn("UserDetails not found for username: {}", username);
                }
            } else {
                logger.warn("Token validation failed...");
            }
        } else {
            logger.warn("No token found in request");
        }

        filterChain.doFilter(request, response);
    }

    private String getJWTFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        logger.warn("Raw Authorization header: {}", bearerToken);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}


//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain) throws ServletException, IOException {
//
//        String path = request.getRequestURI();
//
//        // Bypass authentication for /api/patients
//        if (path.startsWith("/api/patients") || path.startsWith("/api/auth/register/patient") || path.startsWith("/api/auth/login")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//
//        String token = getJWTFromRequest(request);
//        if(StringUtils.hasText(token) && tokenGenerator.validateToken(token)){
//            //Extract Username from Token (this username will be used to retrieve user details from the database)
//            String username = tokenGenerator.getUsernameFromJWT(token);
//            //Getting the username and password (userDetails)
//            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
//            // Create an authentication token for the user
//                /*
//                UsernamePasswordAuthenticationToken, which represents the authenticated user.
//                    userDetails: Provides the user’s information.
//                    null: Represents the credentials (password).
//                            It is set to null because the JWT token itself is used to
//                            authenticate the user, so the password is not needed in this context.
//                    userDetails.getAuthorities(): Provides the user’s authorities (roles/permissions).
//                            These are used to determine what actions the user is permitted to perform.
//                 */
//            UsernamePasswordAuthenticationToken authenticationToken =
//                    new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
//             /*
//             This adds additional details to the authentication token,
//             such as the remote IP address and session ID from the HTTP request.
//             This can be useful for auditing and additional security checks.
//              */
//            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//            // Set the authentication in the SecurityContext
//            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//        }
//
//        filterChain.doFilter(request,response);
//    }









/*
This (doFilterInternal) is a link in the Security filter shade. Before we go in to the controllers
it's going to perform a check to see if there is a token in the header.
 */

/*
Example for bearer Token:
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyTmFtZSIsImV4cCI6MTYzODQyNDQ4MCwiaWF0IjoxNjM4NDIwODgwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

 */