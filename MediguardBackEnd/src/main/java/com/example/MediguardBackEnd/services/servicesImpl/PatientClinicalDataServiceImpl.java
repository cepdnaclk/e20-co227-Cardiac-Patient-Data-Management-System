package com.example.MediguardBackEnd.services.servicesImpl;

import com.example.MediguardBackEnd.domains.PatientClinicalDataDTO;
import com.example.MediguardBackEnd.entity.Patient;
import com.example.MediguardBackEnd.entity.PatientClinicalData;
import com.example.MediguardBackEnd.exception.ResourceNotFoundException;
import com.example.MediguardBackEnd.mapper.PatientClinicalDataMapper;
import com.example.MediguardBackEnd.repositories.PatientClinicalDataRepository;
import com.example.MediguardBackEnd.repositories.PatientRepository;
import com.example.MediguardBackEnd.services.PatientClinicalDataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientClinicalDataServiceImpl implements PatientClinicalDataService {

    private final PatientClinicalDataRepository clinicalDataRepository;
    private final PatientRepository patientRepository;

    @Autowired
    public PatientClinicalDataServiceImpl(PatientClinicalDataRepository clinicalDataRepository, PatientRepository patientRepository) {
        this.clinicalDataRepository = clinicalDataRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public PatientClinicalDataDTO createClinicalData(Long patientId, PatientClinicalDataDTO clinicalDataDTO) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + patientId));

        PatientClinicalData clinicalData = PatientClinicalDataMapper.mapToPatientClinicalData(clinicalDataDTO);
        clinicalData.setPatient(patient);
        PatientClinicalData savedClinicalData = clinicalDataRepository.save(clinicalData);
        return PatientClinicalDataMapper.mapToPatientClinicalDataDTO(savedClinicalData);
    }

    @Override
    public PatientClinicalDataDTO updateClinicalData(Long patientId, PatientClinicalDataDTO clinicalDataDTO, Long clinicalDataId) {
        PatientClinicalData patientClinicalData = clinicalDataRepository.findById(clinicalDataId)
                .orElseThrow(() -> new ResourceNotFoundException("Clinical data not found with ID: " + clinicalDataId));
        if(!patientClinicalData.getPatient().getPatientId().equals(patientId)){
            throw new ResourceNotFoundException("Patient with patient ID : " + patientId + " does not have a record for Clinical data with ID :" + clinicalDataId);
        }

        patientClinicalData.setDiagnosisOfHeartDisease(clinicalDataDTO.isDiagnosisOfHeartDisease());
        patientClinicalData.setPresenceOfAnemia(clinicalDataDTO.isPresenceOfAnemia());
        patientClinicalData.setCreatininePhosphokinase(clinicalDataDTO.getCreatininePhosphokinase());
        patientClinicalData.setDiabetes(clinicalDataDTO.isDiabetes());
        patientClinicalData.setEjectionFraction(clinicalDataDTO.getEjectionFraction());
        patientClinicalData.setBloodPressure(clinicalDataDTO.getBloodPressure());
        patientClinicalData.setPlatelets(clinicalDataDTO.getPlatelets());
        patientClinicalData.setSerumCreatinine(clinicalDataDTO.getSerumCreatinine());
        patientClinicalData.setSerumSodium(clinicalDataDTO.getSerumSodium());
        patientClinicalData.setSmoking(clinicalDataDTO.isSmoking());
        patientClinicalData.setFollowUpPeriodDays(clinicalDataDTO.getFollowUpPeriodDays());

        PatientClinicalData updatedClinicalData = clinicalDataRepository.save(patientClinicalData);
        return PatientClinicalDataMapper.mapToPatientClinicalDataDTO(updatedClinicalData);
    }

    @Override
    public PatientClinicalDataDTO getClinicalDataById(Long patientId, Long clinicalDataId) {
        Logger logger = LoggerFactory.getLogger(this.getClass());
        logger.info("Received request for patientId: {} and clinicalDataId: {}", patientId, clinicalDataId);

        PatientClinicalData patientClinicalData = clinicalDataRepository.findById(clinicalDataId)
                .orElseThrow(() -> new ResourceNotFoundException("Clinical data not found with ID: " + clinicalDataId));
        logger.info("Fetched clinical data belongs to patientId: {}", patientClinicalData.getPatient().getPatientId());

        if (!patientClinicalData.getPatient().getPatientId().equals(patientId)) {
            logger.warn("Mismatch: Path variable patientId: {} does not match the clinical data's patientId: {}",
                    patientId, patientClinicalData.getPatient().getPatientId());

            throw new ResourceNotFoundException("Patient with patient ID : " + patientId +
                    " does not have a record for Clinical data with ID :" + clinicalDataId);
        }

        // Map and return the DTO
        return PatientClinicalDataMapper.mapToPatientClinicalDataDTO(patientClinicalData);
    }

    @Override
    public void deleteClinicalData(Long patientId,Long clinicalDataId) {
        PatientClinicalData patientClinicalData = clinicalDataRepository.findById(clinicalDataId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Clinical data not found with ID: " + clinicalDataId));

        if(!patientClinicalData.getPatient().getPatientId().equals(patientId)){
            throw new ResourceNotFoundException(patientClinicalData.getPatient().getPatientId() + "Patient with patient ID : " + patientId + " does not have a record for Clinical data with ID :" + clinicalDataId);
        }
        clinicalDataRepository.deleteById(clinicalDataId);
    }

    @Override
    public List<PatientClinicalDataDTO> getClinicalDataByPatientId(Long patientId) {
        List<PatientClinicalData> clinicalDataList = clinicalDataRepository.findByPatient_PatientId(patientId);
        if (clinicalDataList.isEmpty()) {
            throw new ResourceNotFoundException("No clinical data found for patient ID: " + patientId);
        }
        return clinicalDataList.stream()
                .map(PatientClinicalDataMapper::mapToPatientClinicalDataDTO)
                .collect(Collectors.toList());
    }
}
