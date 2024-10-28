package com.example.MediguardBackEnd.controllers;

import com.example.MediguardBackEnd.domains.PredictionDataDTO;
import com.example.MediguardBackEnd.services.PredictionDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors/patients/{patientId}/prediction-data")
public class PredictionDataController {

    private final PredictionDataService predictionDataService;

    @Autowired
    public PredictionDataController(PredictionDataService predictionDataService) {
        this.predictionDataService = predictionDataService;
    }

    @PostMapping
    public ResponseEntity<PredictionDataDTO> createPredictionData(@PathVariable Long patientId, @RequestBody PredictionDataDTO predictionDataDTO) {
        PredictionDataDTO createdPredictionData = predictionDataService.createPredictionData(patientId, predictionDataDTO);
        return ResponseEntity.ok(createdPredictionData);
    }

    @PutMapping("/{predictionDataId}")
    public ResponseEntity<PredictionDataDTO> updatePredictionData(@PathVariable Long patientId, @PathVariable Long predictionDataId, @RequestBody PredictionDataDTO predictionDataDTO) {
        PredictionDataDTO updatedPredictionData = predictionDataService.updatePredictionData(patientId, predictionDataDTO, predictionDataId);
        return ResponseEntity.ok(updatedPredictionData);
    }

    @GetMapping("/{predictionDataId}")
    public ResponseEntity<PredictionDataDTO> getPredictionDataById(@PathVariable Long patientId, @PathVariable Long predictionDataId) {
        PredictionDataDTO predictionData = predictionDataService.getPredictionDataById(patientId, predictionDataId);
        return ResponseEntity.ok(predictionData);
    }

    @DeleteMapping("/{predictionDataId}")
    public ResponseEntity<Void> deletePredictionData(@PathVariable Long patientId, @PathVariable Long predictionDataId) {
        predictionDataService.deletePredictionData(patientId, predictionDataId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<PredictionDataDTO>> getPredictionDataByPatientId(@PathVariable Long patientId) {
        List<PredictionDataDTO> predictionDataList = predictionDataService.getPredictionDataByPatientId(patientId);
        return ResponseEntity.ok(predictionDataList);
    }
}