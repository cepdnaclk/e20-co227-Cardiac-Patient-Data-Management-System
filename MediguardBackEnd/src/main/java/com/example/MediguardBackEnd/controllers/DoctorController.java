package com.example.MediguardBackEnd.controllers;

import com.example.MediguardBackEnd.domains.DoctorDTO;
import com.example.MediguardBackEnd.domains.PatientClinicalDataDTO;
import com.example.MediguardBackEnd.domains.PatientDTO;
import com.example.MediguardBackEnd.exception.DuplicateException;
import com.example.MediguardBackEnd.services.DoctorService;
import com.example.MediguardBackEnd.services.PatientClinicalDataService;
import com.example.MediguardBackEnd.services.PatientService;
import com.example.MediguardBackEnd.services.UserService;
import com.example.MediguardBackEnd.services.servicesImpl.PatientClinicalDataServiceImpl;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;
    private final PatientService patientService;
    private final PatientClinicalDataService clinicalDataService;


    public DoctorController(DoctorService doctorService, PatientService patientService, PatientClinicalDataService clinicalDataService) {
        this.doctorService = doctorService;
        this.patientService = patientService;
        this.clinicalDataService = clinicalDataService;
    }


    //GET
    @GetMapping("{id}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable("id") Long doctorId) {
        DoctorDTO doctor = doctorService.getDoctorById(doctorId);
        return ResponseEntity.ok(doctor);
    }

    // GET all Doctors
    @GetMapping("")
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        List<DoctorDTO> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    //Get All Patients relevant to the doctor
    @GetMapping("/patients/bulk/{doctorId}")
    public ResponseEntity<List<PatientDTO>> getAllPatientsForDoctorId(@PathVariable("doctorId") Long doctorId){
        List<PatientDTO> patients = patientService.getAllPatientsForDoctor(doctorId);
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/patient/{patientId}/{doctorId}")
    public ResponseEntity<PatientDTO> getRegisteredPatientsByDoctorId(@PathVariable("patientId") Long patientId,@PathVariable("doctorId") Long doctorId){
        PatientDTO patient = patientService.getPatientByIdForDoctor(patientId,doctorId);
        return ResponseEntity.ok(patient);
    }

    // PUT (update) Doctor
    @PutMapping("{id}")
    public ResponseEntity<DoctorDTO> updateDoctor(@RequestBody DoctorDTO updatedDoctor, @PathVariable("id") Long doctorID) {
        DoctorDTO doctorDTO = doctorService.updateDoctor(updatedDoctor, doctorID);
        return ResponseEntity.ok(doctorDTO);
    }

    // DELETE Doctor
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable("id") Long doctorID) {
        doctorService.deleteDoctor(doctorID);
        return ResponseEntity.ok("Doctor deleted successfully.");
    }



    //Clinical Data
    @PostMapping("/add/clinical-data/patient/{patientId}")
    public ResponseEntity<PatientClinicalDataDTO> createClinicalData(@PathVariable Long patientId, @RequestBody PatientClinicalDataDTO clinicalDataDTO) {
        PatientClinicalDataDTO createdClinicalData = clinicalDataService.createClinicalData(patientId, clinicalDataDTO);
        return ResponseEntity.ok(createdClinicalData);
    }

    @PutMapping("/update/clinical-data/patient/{patientId}/{clinicalDataId}")
    public ResponseEntity<PatientClinicalDataDTO> updateClinicalData(@PathVariable Long patientId, @PathVariable Long clinicalDataId, @RequestBody PatientClinicalDataDTO clinicalDataDTO) {
        PatientClinicalDataDTO updatedClinicalData = clinicalDataService.updateClinicalData(patientId, clinicalDataDTO, clinicalDataId);
        return ResponseEntity.ok(updatedClinicalData);
    }

    @GetMapping("/get/clinical-data/patient/{patientId}/{clinicalDataId}")
    public ResponseEntity<PatientClinicalDataDTO> getClinicalDataById(@PathVariable Long patientId, @PathVariable Long clinicalDataId) {
        PatientClinicalDataDTO clinicalData = clinicalDataService.getClinicalDataById(patientId,clinicalDataId);
        return ResponseEntity.ok(clinicalData);
    }

    @DeleteMapping("/delete/clinical-data/patient/{patientId}/{clinicalDataId}")
    public ResponseEntity<Void> deleteClinicalData(@PathVariable Long patientId,@PathVariable Long clinicalDataId) {
        clinicalDataService.deleteClinicalData(patientId,clinicalDataId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/get/all-clinical-data/patient/{patientId}")
    public ResponseEntity<List<PatientClinicalDataDTO>> getClinicalDataByPatientId(@PathVariable Long patientId) {
        List<PatientClinicalDataDTO> clinicalDataList = clinicalDataService.getClinicalDataByPatientId(patientId);
        return ResponseEntity.ok(clinicalDataList);
    }
}
