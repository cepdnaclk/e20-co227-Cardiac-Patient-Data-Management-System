package com.example.MediguardBackEnd.services;

import com.example.MediguardBackEnd.domains.PredictionDataDTO;

import java.util.List;

public interface PredictionDataService {
    PredictionDataDTO createPredictionData(Long patientId, PredictionDataDTO predictionDataDTO);
    PredictionDataDTO updatePredictionData(Long patientId, PredictionDataDTO predictionDataDTO, Long predictionDataId);
    PredictionDataDTO getPredictionDataById(Long patientId, Long predictionDataId);
    void deletePredictionData(Long patientId, Long predictionDataId);
    List<PredictionDataDTO> getPredictionDataByPatientId(Long patientId);
}
