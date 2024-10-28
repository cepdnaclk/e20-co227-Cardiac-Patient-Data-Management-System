package com.example.MediguardBackEnd.security;

import com.example.MediguardBackEnd.services.servicesImpl.CustomUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomUserDetailsServiceImpl userDetailsServiceImpl;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    public SecurityConfig(CustomUserDetailsServiceImpl customUserDetailsServiceImpl, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint) {
        this.userDetailsServiceImpl = customUserDetailsServiceImpl;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        //Basic Authentication
        http
                .csrf(AbstractHttpConfigurer::disable)  // Disable CSRF if needed
                .authorizeHttpRequests(auths -> auths
                                .requestMatchers("/login").permitAll()  // Allow unauthenticated access to the login page
                                .requestMatchers("/api/auth/**").permitAll()
//                                .requestMatchers(HttpMethod.POST, "/api/patients","/api/doctors").permitAll()
//                                .requestMatchers("/api/admin/**").hasRole("ADMIN")
//                                .requestMatchers("/api/patients/**").hasRole("USER")
//                                .requestMatchers("/api/doctors/**").hasRole("DOCTOR")
//                              .requestMatchers(HttpMethod.POST, "/api/doctors").permitAll()
                              .requestMatchers(HttpMethod.POST, "/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/**").permitAll()
                              .requestMatchers(HttpMethod.PUT, "/**").permitAll()
                              .requestMatchers(HttpMethod.DELETE, "/**").permitAll()
                                .anyRequest().authenticated()  // All other requests require authentication
                )
                .userDetailsService(userDetailsServiceImpl)
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint)
                )
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
//                .cors(cors -> cors.configurationSource(corsFilter().getCorsConfigurationSource()))  // Use custom CORS configuration
                .cors(withDefaults())  // Enable CORS with default settings
                .formLogin(withDefaults());  // Use default login page
        //For Custom Login Page
//                .formLogin(formLogin -> formLogin
//                        .loginPage("/login")  // Customize your login page URL
//                        .permitAll()  // Allow unauthenticated access to the login page
//                );

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JWTAuthenticationFilter jwtAuthenticationFilter(){
        return new JWTAuthenticationFilter();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5173"); // Add your frontend URL
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}