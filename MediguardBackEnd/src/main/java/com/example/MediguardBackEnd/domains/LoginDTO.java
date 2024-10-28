package com.example.MediguardBackEnd.domains;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginDTO {
    @NotBlank(message = "Username is required")
    @Size(min = 4, message = "Username must be at least 4 characters long")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 4, message = "Password must be at least 4 characters long")
    private String password;

    public LoginDTO() {
    }

    public LoginDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Lombok will generate the following:

    // public String getUsername() { return username; }
    // public void setUsername(String username) { this.username = username; }
    // public String getPassword() { return password; }
    // public void setPassword(String password) { this.password = password; }

    // public String toString() { return "LoginDTO(username=" + this.getUsername() + ", password=" + this.getPassword() + ")"; }

    // public boolean equals(Object o) { ... }
    // public int hashCode() { ... }
}
