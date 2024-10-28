package com.example.MediguardBackEnd.services.servicesImpl;

import com.example.MediguardBackEnd.domains.PredictionDataDTO;
import com.example.MediguardBackEnd.entity.Patient;
import com.example.MediguardBackEnd.entity.PredictionData;
import com.example.MediguardBackEnd.exception.ResourceNotFoundException;
import com.example.MediguardBackEnd.mapper.PredictionDataMapper;
import com.example.MediguardBackEnd.repositories.PatientRepository;
import com.example.MediguardBackEnd.repositories.PredictionDataRepository;
import com.example.MediguardBackEnd.services.PredictionDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PredictionDataServiceImpl implements PredictionDataService {

    private final PredictionDataRepository predictionDataRepository;
    private final PatientRepository patientRepository;

    @Autowired
    public PredictionDataServiceImpl(PredictionDataRepository predictionDataRepository, PatientRepository patientRepository) {
        this.predictionDataRepository = predictionDataRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public PredictionDataDTO createPredictionData(Long patientId, PredictionDataDTO predictionDataDTO) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + patientId));

        PredictionData predictionData = PredictionDataMapper.mapToPredictionData(predictionDataDTO);
        predictionData.setPatient(patient);
        PredictionData savedPredictionData = predictionDataRepository.save(predictionData);
        return PredictionDataMapper.mapToPredictionDataDTO(savedPredictionData);
    }

    @Override
    public PredictionDataDTO updatePredictionData(Long patientId, PredictionDataDTO predictionDataDTO, Long predictionDataId) {
        PredictionData predictionData = predictionDataRepository.findById(predictionDataId)
                .orElseThrow(() -> new ResourceNotFoundException("Prediction data not found with ID: " + predictionDataId));

        if (!predictionData.getPatient().getPatientId().equals(patientId)) {
            throw new ResourceNotFoundException("Patient with ID: " + patientId + " does not have a record for Prediction data with ID: " + predictionDataId);
        }

        // Update fields from the DTO
        predictionData.setAge(predictionDataDTO.getAge());
        predictionData.setSex(predictionDataDTO.getSex());
        predictionData.setCp(predictionDataDTO.getCp());
        predictionData.setTrestbps(predictionDataDTO.getTrestbps());
        predictionData.setChol(predictionDataDTO.getChol());
        predictionData.setFbs(predictionDataDTO.isFbs());
        predictionData.setRestecg(predictionDataDTO.getRestecg());
        predictionData.setThalach(predictionDataDTO.getThalach());
        predictionData.setExang(predictionDataDTO.isExang());
        predictionData.setOldpeak(predictionDataDTO.getOldpeak());
        predictionData.setSlope(predictionDataDTO.getSlope());
        predictionData.setCa(predictionDataDTO.getCa());
        predictionData.setThal(predictionDataDTO.getThal());

        PredictionData updatedPredictionData = predictionDataRepository.save(predictionData);
        return PredictionDataMapper.mapToPredictionDataDTO(updatedPredictionData);
    }

    @Override
    public PredictionDataDTO getPredictionDataById(Long patientId, Long predictionDataId) {
        PredictionData predictionData = predictionDataRepository.findById(predictionDataId)
                .orElseThrow(() -> new ResourceNotFoundException("Prediction data not found with ID: " + predictionDataId));

        if (!predictionData.getPatient().getPatientId().equals(patientId)) {
            throw new ResourceNotFoundException("Patient with ID: " + patientId + " does not have a record for Prediction data with ID: " + predictionDataId);
        }

        return PredictionDataMapper.mapToPredictionDataDTO(predictionData);
    }

    @Override
    public void deletePredictionData(Long patientId, Long predictionDataId) {
        PredictionData predictionData = predictionDataRepository.findById(predictionDataId)
                .orElseThrow(() -> new ResourceNotFoundException("Prediction data not found with ID: " + predictionDataId));

        if (!predictionData.getPatient().getPatientId().equals(patientId)) {
            throw new ResourceNotFoundException("Patient with ID: " + patientId + " does not have a record for Prediction data with ID: " + predictionDataId);
        }

        predictionDataRepository.deleteById(predictionDataId);
    }

    @Override
    public List<PredictionDataDTO> getPredictionDataByPatientId(Long patientId) {
        List<PredictionData> predictionDataList = predictionDataRepository.findByPatient_PatientId(patientId);
        if (predictionDataList.isEmpty()) {
            throw new ResourceNotFoundException("No prediction data found for patient ID: " + patientId);
        }
        return predictionDataList.stream()
                .map(PredictionDataMapper::mapToPredictionDataDTO)
                .collect(Collectors.toList());
    }
}