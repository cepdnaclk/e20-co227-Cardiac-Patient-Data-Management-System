package com.example.MediguardBackEnd.controllers;

import com.example.MediguardBackEnd.domains.PatientClinicalDataDTO;
import com.example.MediguardBackEnd.services.PatientClinicalDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors/patients/{patientId}/clinical-data")
public class PatientClinicalDataController {

    private final PatientClinicalDataService clinicalDataService;

    @Autowired
    public PatientClinicalDataController(PatientClinicalDataService clinicalDataService) {
        this.clinicalDataService = clinicalDataService;
    }

    @PostMapping
    public ResponseEntity<PatientClinicalDataDTO> createClinicalData(@PathVariable Long patientId, @RequestBody PatientClinicalDataDTO clinicalDataDTO) {
        PatientClinicalDataDTO createdClinicalData = clinicalDataService.createClinicalData(patientId, clinicalDataDTO);
        return ResponseEntity.ok(createdClinicalData);
    }

    @PutMapping("/{clinicalDataId}")
    public ResponseEntity<PatientClinicalDataDTO> updateClinicalData(@PathVariable Long patientId, @PathVariable Long clinicalDataId, @RequestBody PatientClinicalDataDTO clinicalDataDTO) {
        PatientClinicalDataDTO updatedClinicalData = clinicalDataService.updateClinicalData(patientId, clinicalDataDTO, clinicalDataId);
        return ResponseEntity.ok(updatedClinicalData);
    }

    @GetMapping("/{clinicalDataId}")
    public ResponseEntity<PatientClinicalDataDTO> getClinicalDataById(@PathVariable Long patientId, @PathVariable Long clinicalDataId) {
        PatientClinicalDataDTO clinicalData = clinicalDataService.getClinicalDataById(patientId,clinicalDataId);
        return ResponseEntity.ok(clinicalData);
    }

    @DeleteMapping("/{clinicalDataId}")
    public ResponseEntity<Void> deleteClinicalData(@PathVariable Long patientId,@PathVariable Long clinicalDataId) {
        clinicalDataService.deleteClinicalData(patientId,clinicalDataId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<PatientClinicalDataDTO>> getClinicalDataByPatientId(@PathVariable Long patientId) {
        List<PatientClinicalDataDTO> clinicalDataList = clinicalDataService.getClinicalDataByPatientId(patientId);
        return ResponseEntity.ok(clinicalDataList);
    }
}
