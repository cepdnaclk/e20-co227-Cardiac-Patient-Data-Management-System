package com.example.MediguardBackEnd.services;

import com.example.MediguardBackEnd.domains.PatientSymptomsDTO;

import java.util.List;

public interface PatientSymptomsService {
    PatientSymptomsDTO createSymptoms(Long patientId, PatientSymptomsDTO symptomsDTO);
    PatientSymptomsDTO updateSymptoms(Long patientId, PatientSymptomsDTO symptomsDTO, Integer symptomCode);
    PatientSymptomsDTO getSymptomsById(Long patientId, Integer symptomCode);
    void deleteSymptoms(Long patientId, Integer symptomCode);
    List<PatientSymptomsDTO> getSymptomsByPatientId(Long patientId);
}
