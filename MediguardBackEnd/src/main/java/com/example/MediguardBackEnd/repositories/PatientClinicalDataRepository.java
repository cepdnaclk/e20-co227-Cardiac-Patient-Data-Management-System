package com.example.MediguardBackEnd.repositories;

import com.example.MediguardBackEnd.entity.PatientClinicalData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientClinicalDataRepository extends JpaRepository<PatientClinicalData, Long> {
    // Correct method for finding clinical data by patient ID
    List<PatientClinicalData> findByPatient_PatientId(Long patientId);

    // Correct method for deleting clinical data by patient ID
    void deleteByPatient_PatientId(Long patientId);
}
