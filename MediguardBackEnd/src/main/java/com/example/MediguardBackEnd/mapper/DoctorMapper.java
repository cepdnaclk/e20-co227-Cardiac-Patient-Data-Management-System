package com.example.MediguardBackEnd.mapper;

import com.example.MediguardBackEnd.domains.DoctorDTO;
import com.example.MediguardBackEnd.domains.PatientDTO;
import com.example.MediguardBackEnd.entity.Doctor;

import java.util.Set;
import java.util.stream.Collectors;

public class DoctorMapper {
    public static DoctorDTO mapToDoctorDTO(Doctor doctor){
        if (doctor == null) {
            return null;
        }

        Set<PatientDTO> patientsForDoctor = doctor.getRegisteredPatientsForDoctor().stream()
                .map(patient ->
                        new PatientDTO(patient.getPatientId(), patient.getNic(), patient.getFirstName(), patient.getLastName(), patient.getGender(), patient.getDateOfBirth(), patient.getEmail()))
                .collect(Collectors.toSet());

        return new DoctorDTO(
                doctor.getDoctorId(),
                doctor.getSurname(),
                doctor.getLastName(),
                doctor.getNic(),
                patientsForDoctor
        );
    }

    public static Doctor mapToDoctor(DoctorDTO doctorDTO){
        if (doctorDTO == null) {
            return null;
        }

        Doctor doctor = new Doctor(
                doctorDTO.getDoctorId(),
                doctorDTO.getSurname(),
                doctorDTO.getLastName(),
                doctorDTO.getNic()
        );
//
//        Set<Patient> patientsForDoctor = doctorDTO.getRegisteredPatientsForDoctor().stream()
//                .map(patientDTO -> new Patient(patientDTO.getPatientId(), patientDTO.getNic(), patientDTO.getFirstName(), patientDTO.getLastName(), patientDTO.getGender(), patientDTO.getDateOfBirth(), patientDTO.getPassword(), patientDTO.getVersion(), patientDTO.getEmail()))
//                .collect(Collectors.toSet());
//
//        doctor.setRegisteredPatientsForDoctor(patientsForDoctor);

        return doctor;
    }
}
