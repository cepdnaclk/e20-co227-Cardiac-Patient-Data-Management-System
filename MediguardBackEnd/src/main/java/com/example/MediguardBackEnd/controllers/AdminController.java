package com.example.MediguardBackEnd.controllers;

import com.example.MediguardBackEnd.domains.DoctorDTO;
import com.example.MediguardBackEnd.domains.PatientDTO;
import com.example.MediguardBackEnd.exception.DuplicateException;
import com.example.MediguardBackEnd.services.DoctorService;
import com.example.MediguardBackEnd.services.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final PatientService patientService;
    private final DoctorService doctorService;

    public AdminController(PatientService patientService, DoctorService doctorService) {
        this.patientService = patientService;
        this.doctorService = doctorService;
    }

    // POST multiple patients
    @PostMapping("/patients/bulk")
    public ResponseEntity<List<PatientDTO>> createPatients(@RequestBody String patientsJson) {
        try {
            List<PatientDTO> createdPatients = patientService.createPatients(patientsJson);
            return new ResponseEntity<>(createdPatients, HttpStatus.CREATED);
        } catch (DuplicateException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //Get All Patients
    @GetMapping("/patients/bulk")
    public ResponseEntity<List<PatientDTO>> getAllPatients(){
        List<PatientDTO> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }

    //GET
    @GetMapping("/patient/{id}")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable("id") Long patientId){
        PatientDTO patient = patientService.getPatientById(patientId);
        return ResponseEntity.ok(patient);
    }

    //PUT(UPDATE)
    @PutMapping("/update/patient/{id}")
    public ResponseEntity<PatientDTO> updatePatient(@RequestBody PatientDTO updatedPatient,@PathVariable("id") Long patientID){
        PatientDTO patientDTO = patientService.updatePatient(updatedPatient,patientID);
        return ResponseEntity.ok(patientDTO);
    }

    //DELETE
    @DeleteMapping("/delete/patient/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable("id") Long patientID){
        patientService.deletePatient(patientID);
        return ResponseEntity.ok("Patient deleted Successfully.");
    }


    //GET Doctor
    @GetMapping("/doctor/{id}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable("id") Long doctorId) {
        DoctorDTO doctor = doctorService.getDoctorById(doctorId);
        return ResponseEntity.ok(doctor);
    }

    // POST multiple doctors
    @PostMapping("/doctors/bulk")
    public ResponseEntity<List<DoctorDTO>> createDoctors(@RequestBody String doctorsJson) {
        try {
            List<DoctorDTO> createdDoctors = doctorService.createDoctors(doctorsJson);
            return new ResponseEntity<>(createdDoctors, HttpStatus.CREATED);
        } catch (DuplicateException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // POST (Create Doctor)
    @PostMapping("/createDoctor")
    public ResponseEntity<DoctorDTO> createDoctor(@RequestBody DoctorDTO doctorDTO) {
        DoctorDTO savedDoctor = doctorService.createDoctor(doctorDTO);
        return new ResponseEntity<>(savedDoctor, HttpStatus.CREATED);
    }

    //Get All Doctors
    @GetMapping("/doctors/bulk")
    public ResponseEntity<List<DoctorDTO>> getAllDoctors(){
        List<DoctorDTO> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    //Make an appointment
    @PutMapping("/register/{patientId}/registerTo/{doctorId}")
    public ResponseEntity<PatientDTO> RegisterDoctorsToPatient(@PathVariable Long patientId,@PathVariable Long doctorId){
        PatientDTO patientDTO = patientService.putVisitedDoctors(patientId,doctorId);
        return ResponseEntity.ok(patientDTO);
    }

    //Make an appointment
    @PutMapping("/registerTo/{doctorId}/{patientId}/register")
    public ResponseEntity<PatientDTO> RegisterPatientsToDoctor(@PathVariable Long patientId,@PathVariable Long doctorId){
        PatientDTO patientDTO = patientService.putVisitedDoctors(patientId,doctorId);
        return ResponseEntity.ok(patientDTO);
    }

    //Get the patient by ID for the doctor
    @GetMapping("/patient/{patientId}/{doctorId}/")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable("patientId") Long patientId,@PathVariable("doctorId") Long doctorId){
        PatientDTO patient = patientService.getPatientByIdForDoctor(patientId,doctorId);
        return ResponseEntity.ok(patient);
    }

    // PUT (update) Doctor
    @PutMapping("/update/doctor/{id}")
    public ResponseEntity<DoctorDTO> updateDoctor(@RequestBody DoctorDTO updatedDoctor, @PathVariable("id") Long doctorID) {
        DoctorDTO doctorDTO = doctorService.updateDoctor(updatedDoctor, doctorID);
        return ResponseEntity.ok(doctorDTO);
    }

    // DELETE Doctor
    @DeleteMapping("/delete/doctor/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable("id") Long doctorID) {
        doctorService.deleteDoctor(doctorID);
        return ResponseEntity.ok("Doctor deleted successfully.");
    }
}
