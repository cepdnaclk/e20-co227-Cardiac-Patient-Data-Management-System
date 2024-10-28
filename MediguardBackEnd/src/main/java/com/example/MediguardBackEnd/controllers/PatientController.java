package com.example.MediguardBackEnd.controllers;

import com.example.MediguardBackEnd.domains.PatientDTO;
import com.example.MediguardBackEnd.exception.DuplicateException;
import com.example.MediguardBackEnd.services.PatientService;
import com.example.MediguardBackEnd.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    // POST
    @PostMapping("")
    public ResponseEntity<?> createPatient(@Valid @RequestBody PatientDTO patientDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }
        try {
            PatientDTO savedPatient = patientService.createPatient(patientDTO);
            return new ResponseEntity<>(savedPatient, HttpStatus.CREATED);
        } catch (DuplicateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT); // 409 Conflict
        }
    }

//    //GET
//    @GetMapping("{id}")
//    public ResponseEntity<PatientDTO> getPatientById(@PathVariable("id") int userId){
//        Long patientId = userService.getPatientByUserId(userId);
//        PatientDTO patient = patientService.getPatientById(patientId);
//        return ResponseEntity.ok(patient);
//    }

    //GET
    @GetMapping("{id}")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable("id") Long patientId){
        PatientDTO patient = patientService.getPatientById(patientId);
        return ResponseEntity.ok(patient);
    }

    //PUT(UPDATE)
    @PutMapping("{id}")
    public ResponseEntity<PatientDTO> updatePatient(@RequestBody PatientDTO updatedPatient,@PathVariable("id") Long patientID){
        PatientDTO patientDTO = patientService.updatePatient(updatedPatient,patientID);
        return ResponseEntity.ok(patientDTO);
    }

    //DELETE
    @DeleteMapping("{id}")
    public ResponseEntity<String> deletePatient(@PathVariable("id") Long patientID){
        patientService.deletePatient(patientID);
        return ResponseEntity.ok("Patient deleted Successfully.");
    }

//    @PutMapping("/{patientUserId}/registerTo/{doctorUserId}")
//    public ResponseEntity<PatientDTO> RegisterDoctorsToPatient(@PathVariable int patientUserId,@PathVariable int doctorUserId){
//        PatientDTO patientDTO = patientService.putVisitedDoctors(userService.getPatientByUserId(patientUserId),
//                userService.getDoctorByUserId(doctorUserId));
//        return ResponseEntity.ok(patientDTO);
//    }

//    @PutMapping("/{patientId}/registerTo/{doctorId}")
//    public ResponseEntity<PatientDTO> RegisterDoctorsToPatient(@PathVariable Long patientId,@PathVariable Long doctorId){
//        PatientDTO patientDTO = patientService.putVisitedDoctors(patientId,doctorId);
//        return ResponseEntity.ok(patientDTO);
//    }


}
