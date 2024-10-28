package com.example.MediguardBackEnd.services;

import com.example.MediguardBackEnd.domains.PatientDTO;
import com.example.MediguardBackEnd.entity.Patient;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.util.List;

public interface PatientService {
    PatientDTO createPatient(PatientDTO patientDTO);
    List<PatientDTO> getAllPatients();
    PatientDTO getPatientById(Long patientId);
    PatientDTO updatePatient(PatientDTO patientDTO, Long patientId);
    void deletePatient(Long patientId);
    List<PatientDTO> createPatients(String patientsJson)throws IOException;
    PatientDTO putVisitedDoctors(Long patientId,Long doctorId);
    PatientDTO getPatientByIdForDoctor(Long patientId,Long doctorId);
    List<PatientDTO> getAllPatientsForDoctor(Long doctorId);
}
