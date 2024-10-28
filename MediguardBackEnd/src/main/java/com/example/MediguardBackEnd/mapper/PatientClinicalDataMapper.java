package com.example.MediguardBackEnd.mapper;

import com.example.MediguardBackEnd.domains.PatientClinicalDataDTO;
import com.example.MediguardBackEnd.entity.PatientClinicalData;

public class PatientClinicalDataMapper {

    public static PatientClinicalDataDTO mapToPatientClinicalDataDTO(PatientClinicalData patientClinicalData) {
        if(patientClinicalData == null){
            return null;
        }
        return new PatientClinicalDataDTO(
                patientClinicalData.getClinicalDataId(),
                patientClinicalData.isDiagnosisOfHeartDisease(),
                patientClinicalData.isPresenceOfAnemia(),
                patientClinicalData.getCreatininePhosphokinase(),
                patientClinicalData.isDiabetes(),
                patientClinicalData.getEjectionFraction(),
                patientClinicalData.getBloodPressure(),
                patientClinicalData.getPlatelets(),
                patientClinicalData.getSerumCreatinine(),
                patientClinicalData.getSerumSodium(),
                patientClinicalData.isSmoking(),
                patientClinicalData.getFollowUpPeriodDays(),
                patientClinicalData.getClinicalDate()

        );
    }

    public static PatientClinicalData mapToPatientClinicalData(PatientClinicalDataDTO patientClinicalDataDTO) {
        if(patientClinicalDataDTO == null){
            return null;
        }
        return new PatientClinicalData(
                patientClinicalDataDTO.getClinicalDataId(),
                patientClinicalDataDTO.isDiagnosisOfHeartDisease(),
                patientClinicalDataDTO.isPresenceOfAnemia(),
                patientClinicalDataDTO.getCreatininePhosphokinase(),
                patientClinicalDataDTO.isDiabetes(),
                patientClinicalDataDTO.getEjectionFraction(),
                patientClinicalDataDTO.getBloodPressure(),
                patientClinicalDataDTO.getPlatelets(),
                patientClinicalDataDTO.getSerumCreatinine(),
                patientClinicalDataDTO.getSerumSodium(),
                patientClinicalDataDTO.isSmoking(),
                patientClinicalDataDTO.getFollowUpPeriodDays(),
                patientClinicalDataDTO.getClinicalDate()


        );
    }
}
