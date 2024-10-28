package com.example.MediguardBackEnd.repositories;

import com.example.MediguardBackEnd.entity.DoctorExamination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface DoctorExaminationRepository extends JpaRepository<DoctorExamination, Integer> {
    List<DoctorExamination> findByPatient_PatientId(Long patientId);

    void deleteByPatient_PatientId(Long patientId);
}
