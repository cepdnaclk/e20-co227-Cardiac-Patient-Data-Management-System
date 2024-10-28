package com.example.MediguardBackEnd.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="role_id",updatable = false)
    private int id;

    @Column(nullable = false, unique = true)
    private String name;

}
