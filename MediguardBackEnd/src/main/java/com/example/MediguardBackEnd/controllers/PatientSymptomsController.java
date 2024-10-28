package com.example.MediguardBackEnd.controllers;

import com.example.MediguardBackEnd.domains.PatientSymptomsDTO;
import com.example.MediguardBackEnd.services.PatientSymptomsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors/patients/{patientId}/symptoms")
public class PatientSymptomsController {

    private final PatientSymptomsService symptomsService;

    @Autowired
    public PatientSymptomsController(PatientSymptomsService symptomsService) {
        this.symptomsService = symptomsService;
    }

    @PostMapping
    public ResponseEntity<PatientSymptomsDTO> createSymptoms(@PathVariable Long patientId, @RequestBody PatientSymptomsDTO symptomsDTO) {
        PatientSymptomsDTO createdSymptoms = symptomsService.createSymptoms(patientId, symptomsDTO);
        return ResponseEntity.ok(createdSymptoms);
    }

    @PutMapping("/{symptomCode}")
    public ResponseEntity<PatientSymptomsDTO> updateSymptoms(@PathVariable Long patientId, @PathVariable Integer symptomCode, @RequestBody PatientSymptomsDTO symptomsDTO) {
        PatientSymptomsDTO updatedSymptoms = symptomsService.updateSymptoms(patientId, symptomsDTO, symptomCode);
        return ResponseEntity.ok(updatedSymptoms);
    }

    @GetMapping("/{symptomCode}")
    public ResponseEntity<PatientSymptomsDTO> getSymptomsById(@PathVariable Long patientId, @PathVariable Integer symptomCode) {
        PatientSymptomsDTO symptoms = symptomsService.getSymptomsById(patientId, symptomCode);
        return ResponseEntity.ok(symptoms);
    }

    @DeleteMapping("/{symptomCode}")
    public ResponseEntity<Void> deleteSymptoms(@PathVariable Long patientId, @PathVariable Integer symptomCode) {
        symptomsService.deleteSymptoms(patientId, symptomCode);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<PatientSymptomsDTO>> getSymptomsByPatientId(@PathVariable Long patientId) {
        List<PatientSymptomsDTO> symptomsList = symptomsService.getSymptomsByPatientId(patientId);
        return ResponseEntity.ok(symptomsList);
    }
}
