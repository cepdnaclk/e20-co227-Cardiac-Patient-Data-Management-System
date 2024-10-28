package com.example.MediguardBackEnd.services.servicesImpl;

import com.example.MediguardBackEnd.domains.PatientDTO;
import com.example.MediguardBackEnd.entity.Doctor;
import com.example.MediguardBackEnd.entity.Patient;
import com.example.MediguardBackEnd.exception.DuplicateException;
import com.example.MediguardBackEnd.exception.ResourceNotFoundException;
import com.example.MediguardBackEnd.exception.ServiceException;
import com.example.MediguardBackEnd.mapper.PatientMapper;
import com.example.MediguardBackEnd.repositories.*;
import com.example.MediguardBackEnd.services.PatientService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final PatientClinicalDataRepository clinicalDataRepository;
    private final PatientSymptomsRepository symptomsRepository;
    private final DoctorExaminationRepository examinationRepository;

    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository, DoctorRepository doctorRepository, UserRepository userRepository, ObjectMapper objectMapper, PatientClinicalDataRepository clinicalDataRepository, PatientSymptomsRepository symptomsRepository, DoctorExaminationRepository examinationRepository) {
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
        this.clinicalDataRepository = clinicalDataRepository;
        this.symptomsRepository = symptomsRepository;
        this.examinationRepository = examinationRepository;
    }


    //POST
    @Override
    public PatientDTO createPatient(PatientDTO patientDTO) {
        // Check for existing patient with the same NIC
        if (patientRepository.existsByNic(patientDTO.getNic())) {
            throw new DuplicateException("Patient with NIC " + patientDTO.getNic() + " already exists.");
        }

        Patient patient = PatientMapper.mapToPatient(patientDTO);
        Patient savedPatient = patientRepository.save(patient);
        return PatientMapper.mapToPatientDto(savedPatient);
    }

    @Override
    public List<PatientDTO> createPatients(String patientsJson) throws IOException {
        List<PatientDTO> patientDTOs = objectMapper.readValue(patientsJson, new TypeReference<List<PatientDTO>>() {});
        List<PatientDTO> createdPatients = new ArrayList<>();

        for (PatientDTO patientDTO : patientDTOs) {
            if (patientRepository.existsByNic(patientDTO.getNic())) {
                throw new DuplicateException("Patient with NIC " + patientDTO.getNic() + " already exists.");
            }
            Patient patient = PatientMapper.mapToPatient(patientDTO);
            Patient savedPatient = patientRepository.save(patient);
            createdPatients.add(PatientMapper.mapToPatientDto(savedPatient));
        }
        return createdPatients;
    }

    //GET
    @Override
    public List<PatientDTO> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        return patients.stream().map((PatientMapper::mapToPatientDto))
                .collect(Collectors.toList());
    }


    @Override
    @PreAuthorize("hasRole('USER')")
    public PatientDTO getPatientById(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient is not exist with given id : " + patientId));
        return PatientMapper.mapToPatientDto(patient);
    }

    //UPDATE
    @Override
    public PatientDTO updatePatient(PatientDTO updatedPatient, Long patientId) {
        try {
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new ResourceNotFoundException("Patient is not exist with given id : " + patientId));

            patient.setNic(updatedPatient.getNic());
            patient.setFirstName(updatedPatient.getFirstName());
            patient.setLastName(updatedPatient.getLastName());
            patient.setGender(updatedPatient.getGender());
            patient.setDateOfBirth(updatedPatient.getDateOfBirth());
            patient.setEmail(updatedPatient.getEmail());

            Patient updatedPatientObj = patientRepository.save(patient);
            return PatientMapper.mapToPatientDto(updatedPatientObj);
        } catch(ResourceNotFoundException e){
            throw e;
        } catch (Exception e) {
            throw new ServiceException("An error occurred while updating the patient: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public PatientDTO putVisitedDoctors(Long patientId, Long doctorId) {
        try {
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new ResourceNotFoundException("Patient is not exist with given id : " + patientId));
            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor is not exist with given id : " + doctorId));

            patient.addVisitedDoctors(doctor);
            Patient savedPatient = patientRepository.save(patient);
            return PatientMapper.mapToVisitedPatientDto(savedPatient);
        } catch (Exception e) {
            throw new ServiceException("An error occurred while registering the patient with the doctor: " + e.getMessage());
        }
    }
    //DELETE
    @Override
    @Transactional
    public void deletePatient(Long patientId) {
        try {
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(()-> new ResourceNotFoundException("Patient is not exist with given id : " + patientId));

            // Add null check for clinicalDataRepository
            if (clinicalDataRepository != null) {
                clinicalDataRepository.deleteByPatient_PatientId(patientId);
            } else {
                throw new ServiceException("clinicalDataRepository is null. Cannot delete clinical data.");
            }
            if (symptomsRepository != null) {
                symptomsRepository.deleteByPatient_PatientId(patientId);
            } else {
                throw new ServiceException("clinicalDataRepository is null. Cannot delete clinical data.");
            }
            if (examinationRepository != null) {
                examinationRepository.deleteByPatient_PatientId(patientId);
            } else {
                throw new ServiceException("clinicalDataRepository is null. Cannot delete clinical data.");
            }

            userRepository.deleteById(patient.getUsers().getId());

        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ServiceException("An error occurred while deleting the patient: " + e.getMessage());
        }
    }

    //GET patient by id for relevant doctor
    public PatientDTO getPatientByIdForDoctor(Long patientId,Long doctorId) {
        try {
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Patient do not exist with given id : " + patientId));
            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Doctor do not exist with given id : " + doctorId));
            if (patient.getVisitedDoctorsForPatient().contains(doctor)) {
                return PatientMapper.mapToPatientDto(patient);
            }
            throw new ServiceException("Patient is not belong to the doctor");
        } catch (ResourceNotFoundException e) {
            throw e;
        }
    }

    //GET all patients for relevant doctor
    public List<PatientDTO> getAllPatientsForDoctor(Long doctorId) {

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor do not exist with given id : " + doctorId));
        Set<Patient> patients = doctor.getRegisteredPatientsForDoctor();
        return patients.stream().map((PatientMapper::mapToPatientDto))
                .collect(Collectors.toList());
    }
}
