package com.example.MediguardBackEnd.services.servicesImpl;

import com.example.MediguardBackEnd.domains.PatientSymptomsDTO;
import com.example.MediguardBackEnd.entity.Patient;
import com.example.MediguardBackEnd.entity.PatientSymptoms;
import com.example.MediguardBackEnd.exception.ResourceNotFoundException;
import com.example.MediguardBackEnd.mapper.PatientSymptomsMapper;
import com.example.MediguardBackEnd.repositories.PatientRepository;
import com.example.MediguardBackEnd.repositories.PatientSymptomsRepository;
import com.example.MediguardBackEnd.services.PatientSymptomsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientSymptomsServiceImpl implements PatientSymptomsService {

    private final PatientSymptomsRepository symptomsRepository;
    private final PatientRepository patientRepository;

    @Autowired
    public PatientSymptomsServiceImpl(PatientSymptomsRepository symptomsRepository, PatientRepository patientRepository) {
        this.symptomsRepository = symptomsRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public PatientSymptomsDTO createSymptoms(Long patientId, PatientSymptomsDTO symptomsDTO) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + patientId));

        PatientSymptoms symptoms = PatientSymptomsMapper.mapToPatientSymptoms(symptomsDTO);
        symptoms.setPatient(patient);
        PatientSymptoms savedSymptoms = symptomsRepository.save(symptoms);
        return PatientSymptomsMapper.mapToPatientSymptomsDTO(savedSymptoms);
    }

    @Override
    public PatientSymptomsDTO updateSymptoms(Long patientId, PatientSymptomsDTO symptomsDTO, Integer symptomCode) {
        PatientSymptoms patientSymptoms = symptomsRepository.findById(symptomCode)
                .orElseThrow(() -> new ResourceNotFoundException("Symptoms not found with code: " + symptomCode));
        if(!patientSymptoms.getPatient().getPatientId().equals(patientId)){
            throw new ResourceNotFoundException("Patient with patient ID: " + patientId + " does not have a record for Symptoms with code: " + symptomCode);
        }

        patientSymptoms.setBilateralLowerLimbSwelling(symptomsDTO.getBilateralLowerLimbSwelling());
        patientSymptoms.setDyspnoea(symptomsDTO.getDyspnoea());
        patientSymptoms.setOrthopnoea(symptomsDTO.getOrthopnoea());
        patientSymptoms.setParoxysmalNocturnalDyspnoea(symptomsDTO.getParoxysmalNocturnalDyspnoea());
        patientSymptoms.setFatigue(symptomsDTO.getFatigue());
        patientSymptoms.setDoctorRecommendation(symptomsDTO.getDoctorRecommendation());
        patientSymptoms.setSymptomDate(symptomsDTO.getSymptomDate());

        PatientSymptoms updatedSymptoms = symptomsRepository.save(patientSymptoms);
        return PatientSymptomsMapper.mapToPatientSymptomsDTO(updatedSymptoms);
    }

    @Override
    public PatientSymptomsDTO getSymptomsById(Long patientId, Integer symptomCode) {
        PatientSymptoms patientSymptoms = symptomsRepository.findById(symptomCode)
                .orElseThrow(() -> new ResourceNotFoundException("Symptoms not found with code: " + symptomCode));
        if(!patientSymptoms.getPatient().getPatientId().equals(patientId)){
            throw new ResourceNotFoundException("Patient with patient ID: " + patientId + " does not have a record for Symptoms with code: " + symptomCode);
        }
        return PatientSymptomsMapper.mapToPatientSymptomsDTO(patientSymptoms);
    }

    @Override
    public void deleteSymptoms(Long patientId, Integer symptomCode) {
        PatientSymptoms patientSymptoms = symptomsRepository.findById(symptomCode)
                .orElseThrow(() -> new ResourceNotFoundException("Symptoms not found with code: " + symptomCode));

        if(!patientSymptoms.getPatient().getPatientId().equals(patientId)){
            throw new ResourceNotFoundException("Patient with patient ID: " + patientId + " does not have a record for Symptoms with code: " + symptomCode);
        }
        symptomsRepository.deleteById(symptomCode);
    }

    @Override
    public List<PatientSymptomsDTO> getSymptomsByPatientId(Long patientId) {
        List<PatientSymptoms> symptomsList = symptomsRepository.findByPatient_PatientId(patientId);
        if (symptomsList.isEmpty()) {
            throw new ResourceNotFoundException("No symptoms found for patient ID: " + patientId);
        }
        return symptomsList.stream()
                .map(PatientSymptomsMapper::mapToPatientSymptomsDTO)
                .collect(Collectors.toList());
    }
}
