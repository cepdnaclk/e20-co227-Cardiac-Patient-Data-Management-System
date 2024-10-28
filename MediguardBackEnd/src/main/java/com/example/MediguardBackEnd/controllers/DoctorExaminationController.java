package com.example.MediguardBackEnd.controllers;

import com.example.MediguardBackEnd.domains.DoctorExaminationDTO;
import com.example.MediguardBackEnd.services.DoctorExaminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors/{patientId}/examines")
public class DoctorExaminationController {

    private final DoctorExaminationService examinationService;

    @Autowired
    public DoctorExaminationController(DoctorExaminationService examinationService){
        this.examinationService = examinationService;
    }

    @PostMapping
    public ResponseEntity<DoctorExaminationDTO> createExaminations(@PathVariable Long patientId, @RequestBody DoctorExaminationDTO examinationDTO) {
        DoctorExaminationDTO createdExaminations = examinationService.createExaminations(patientId, examinationDTO);
        return ResponseEntity.ok(createdExaminations);
    }

    @PutMapping("/{examinationCode}")
    public ResponseEntity<DoctorExaminationDTO> updateExaminations(@PathVariable Long patientId, @PathVariable Integer examinationCode, @RequestBody DoctorExaminationDTO examinationDTO) {
        DoctorExaminationDTO updatedExaminations = examinationService.updateExaminations(patientId, examinationDTO, examinationCode);
        return ResponseEntity.ok(updatedExaminations);
    }

    @GetMapping("/{examinationCode}")
    public ResponseEntity<DoctorExaminationDTO> getExaminationsById(@PathVariable Long patientId, @PathVariable Integer examinationCode) {
        DoctorExaminationDTO examinations = examinationService.getExaminationsById(patientId, examinationCode);
        return ResponseEntity.ok(examinations);
    }

    @DeleteMapping("/{examinationCode}")
    public ResponseEntity<Void> deleteExaminations(@PathVariable Long patientId, @PathVariable Integer examinationCode) {
        examinationService.deleteExaminations(patientId, examinationCode);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<DoctorExaminationDTO>> getExaminationsByPatientId(@PathVariable Long patientId) {
        List<DoctorExaminationDTO> examinationsList = examinationService.getExaminationsByPatientId(patientId);
        return ResponseEntity.ok(examinationsList);
    }


}
