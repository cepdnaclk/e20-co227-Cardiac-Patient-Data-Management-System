package com.example.MediguardBackEnd.mapper;

import com.example.MediguardBackEnd.entity.Patient;
import com.example.MediguardBackEnd.domains.PatientDTO;
import com.example.MediguardBackEnd.domains.DoctorDTO;

import java.util.Set;
import java.util.stream.Collectors;

public class PatientMapper {

    public static PatientDTO mapToPatientDto(Patient patient) {
        if (patient == null) {
            return null;
        }

        Set<DoctorDTO> visitedDoctors = patient.getVisitedDoctorsForPatient().stream()
                .map(doctor -> new DoctorDTO(doctor.getDoctorId(), doctor.getSurname(), doctor.getLastName()))
                .collect(Collectors.toSet());

        return new PatientDTO(
                patient.getPatientId(),
                patient.getNic(),
                patient.getFirstName(),
                patient.getLastName(),
                patient.getGender(),
                patient.getDateOfBirth(),
                patient.getEmail(),
                visitedDoctors
        );

    }

    public static PatientDTO mapToVisitedPatientDto(Patient patient){
        if (patient == null) {
            return null;
        }

        Set<DoctorDTO> visitedDoctors = patient.getVisitedDoctorsForPatient().stream()
                .map(doctor -> new DoctorDTO(doctor.getDoctorId(), doctor.getSurname(), doctor.getLastName()))
                .collect(Collectors.toSet());

        return new PatientDTO(
                patient.getPatientId(),
                patient.getFirstName(),
                patient.getLastName(),
                visitedDoctors
        );
    }

    public static Patient mapToPatient(PatientDTO patientDTO) {
        if (patientDTO == null) {
            return null;
        }

        return new Patient(
                patientDTO.getPatientId(),
                patientDTO.getNic(),
                patientDTO.getFirstName(),
                patientDTO.getLastName(),
                patientDTO.getGender(),
                patientDTO.getDateOfBirth(),
                patientDTO.getEmail()
        );
    }
}
