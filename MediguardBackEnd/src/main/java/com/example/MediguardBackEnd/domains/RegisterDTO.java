package com.example.MediguardBackEnd.domains;

import com.example.MediguardBackEnd.entity.Patient;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class RegisterDTO {
    @NotNull(message = "Username is required")
    @Size(min=4,message = "Username should have at least 4 characters")
    private String username;

    @NotNull(message = "Password is required")
    @Size(min=4,message = "Password should have at least 4 characters")
    private String password;

    private Patient patient;

    public RegisterDTO() {
    }

    public RegisterDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

}
