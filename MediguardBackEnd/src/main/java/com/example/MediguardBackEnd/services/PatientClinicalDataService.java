package com.example.MediguardBackEnd.services;

import com.example.MediguardBackEnd.domains.PatientClinicalDataDTO;

import java.util.List;

public interface PatientClinicalDataService {
    PatientClinicalDataDTO createClinicalData(Long patientId,PatientClinicalDataDTO clinicalDataDTO);
    PatientClinicalDataDTO updateClinicalData(Long patientId,PatientClinicalDataDTO clinicalDataDTO,Long clinicalDataId);
    PatientClinicalDataDTO getClinicalDataById(Long patientId,Long clinicalDataId);
    void deleteClinicalData(Long patientId,Long clinicalDataId);
    List<PatientClinicalDataDTO> getClinicalDataByPatientId(Long patientId);
}
