package com.example.MediguardBackEnd.mapper;

import com.example.MediguardBackEnd.domains.PatientSymptomsDTO;
import com.example.MediguardBackEnd.entity.PatientSymptoms;

public class PatientSymptomsMapper {

    public static PatientSymptomsDTO mapToPatientSymptomsDTO(PatientSymptoms patientSymptoms) {
        if (patientSymptoms == null) {
            return null;
        }
        return new PatientSymptomsDTO(
                patientSymptoms.getSymptomCode(),
                patientSymptoms.getBilateralLowerLimbSwelling(),
                patientSymptoms.getDyspnoea(),
                patientSymptoms.getOrthopnoea(),
                patientSymptoms.getParoxysmalNocturnalDyspnoea(),
                patientSymptoms.getFatigue(),
                patientSymptoms.getDoctorRecommendation(),
                patientSymptoms.getSymptomDate(),
                patientSymptoms.getPatient().getPatientId()
        );
    }

    public static PatientSymptoms mapToPatientSymptoms(PatientSymptomsDTO patientSymptomsDTO) {
        if (patientSymptomsDTO == null) {
            return null;
        }
        return new PatientSymptoms(
                patientSymptomsDTO.getSymptomCode(),
                patientSymptomsDTO.getBilateralLowerLimbSwelling(),
                patientSymptomsDTO.getDyspnoea(),
                patientSymptomsDTO.getOrthopnoea(),
                patientSymptomsDTO.getParoxysmalNocturnalDyspnoea(),
                patientSymptomsDTO.getFatigue(),
                patientSymptomsDTO.getDoctorRecommendation(),
                patientSymptomsDTO.getSymptomDate()
        );
    }
}
