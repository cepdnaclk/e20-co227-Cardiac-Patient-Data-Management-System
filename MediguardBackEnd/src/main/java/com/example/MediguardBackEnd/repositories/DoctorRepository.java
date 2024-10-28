package com.example.MediguardBackEnd.repositories;

import com.example.MediguardBackEnd.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {
    boolean existsByNic(String nic);

}
