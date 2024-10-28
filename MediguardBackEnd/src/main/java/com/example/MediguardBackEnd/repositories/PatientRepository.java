package com.example.MediguardBackEnd.repositories;

import com.example.MediguardBackEnd.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient,Long> {
    boolean existsByNic(String nic);
}
