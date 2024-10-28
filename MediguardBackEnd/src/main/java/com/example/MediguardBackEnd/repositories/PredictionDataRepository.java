package com.example.MediguardBackEnd.repositories;

import com.example.MediguardBackEnd.entity.PatientClinicalData;
import com.example.MediguardBackEnd.entity.PredictionData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PredictionDataRepository extends JpaRepository<PredictionData,Long> {
    List<PredictionData> findByPatient_PatientId(Long patientId);
}
