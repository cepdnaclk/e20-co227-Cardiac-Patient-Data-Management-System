package com.example.MediguardBackEnd.repositories;

import com.example.MediguardBackEnd.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Integer> {
    Optional<UserEntity> findByUsername(String username);
    Boolean existsByUsername(String username);
    void deleteByPatient_PatientId(Long patientId);
}
