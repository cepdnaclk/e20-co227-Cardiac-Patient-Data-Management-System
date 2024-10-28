package com.example.MediguardBackEnd.domains;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class AuthenticationResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer ";
    private Long userId;
    private List<String> roles;
    private List<Map<String, Object>> userRoles;

    public AuthenticationResponseDTO(String accessToken, Long userId, List<String> roles,List<Map<String, Object>> userRoles) {
        this.accessToken = accessToken;
        this.userId = userId;
        this.roles = roles;
        this.userRoles = userRoles;
    }
}
