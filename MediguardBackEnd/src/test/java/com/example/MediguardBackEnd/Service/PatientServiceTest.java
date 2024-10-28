package com.example.MediguardBackEnd.Service;

import com.example.MediguardBackEnd.domains.PatientDTO;
import com.example.MediguardBackEnd.entity.Patient;
import com.example.MediguardBackEnd.exception.DuplicateException;
import com.example.MediguardBackEnd.exception.ResourceNotFoundException;
import com.example.MediguardBackEnd.mapper.PatientMapper;
import com.example.MediguardBackEnd.repositories.PatientRepository;
import com.example.MediguardBackEnd.services.servicesImpl.PatientServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository;

    @InjectMocks
    private PatientServiceImpl patientService;

    private PatientDTO patientDTO;
    private Patient patientEntity;

    @BeforeEach
    void setUp() {
        // Sample PatientDTO and Patient Entity for testing
        patientDTO = PatientDTO.builder()
                .patientId(1L)
                .nic("123456789V")
                .firstName("John")
                .lastName("Doe")
                .gender("Male")
                .dateOfBirth(LocalDate.of(1980, 1, 1))
                .email("john.doe@example.com")
                .build();

        patientEntity = PatientMapper.mapToPatient(patientDTO);
    }

    @Test
    void testCreatePatient_Success() {
        // Mocking repository behavior
        when(patientRepository.existsByNic(any())).thenReturn(false);
        when(patientRepository.save(any())).thenReturn(patientEntity);

        // Call the service method
        PatientDTO savedPatient = patientService.createPatient(patientDTO);

        // Verify
        assertNotNull(savedPatient);
        assertEquals(patientDTO.getFirstName(), savedPatient.getFirstName());
        assertEquals(patientDTO.getLastName(), savedPatient.getLastName());
        assertEquals(patientDTO.getEmail(), savedPatient.getEmail());

        verify(patientRepository, times(1)).existsByNic(any());
        verify(patientRepository, times(1)).save(any());
    }

    @Test
    void testCreatePatient_DuplicateException() {
        // Mocking repository behavior to return true for existsByNic
        when(patientRepository.existsByNic(any())).thenReturn(true);

        // Verify that DuplicateException is thrown
        assertThrows(DuplicateException.class, () -> patientService.createPatient(patientDTO));

        verify(patientRepository, times(1)).existsByNic(any());
        verify(patientRepository, never()).save(any());
    }

    @Test
    void testGetAllPatients() {
        // Mocking repository behavior to return a list of patients
        List<Patient> patients = new ArrayList<>();
        patients.add(patientEntity);
        when(patientRepository.findAll()).thenReturn(patients);

        // Call the service method
        List<PatientDTO> allPatients = patientService.getAllPatients();

        // Verify
        assertNotNull(allPatients);
        assertEquals(1, allPatients.size());
        assertEquals(patientDTO.getFirstName(), allPatients.get(0).getFirstName());
        assertEquals(patientDTO.getLastName(), allPatients.get(0).getLastName());
        assertEquals(patientDTO.getEmail(), allPatients.get(0).getEmail());

        verify(patientRepository, times(1)).findAll();
    }

    @Test
    void testGetPatientById_Success() {
        // Mocking repository behavior to return an Optional containing the patient entity
        when(patientRepository.findById(any())).thenReturn(Optional.of(patientEntity));

        // Call the service method
        PatientDTO foundPatient = patientService.getPatientById(patientDTO.getPatientId());

        // Verify
        assertNotNull(foundPatient);
        assertEquals(patientDTO.getFirstName(), foundPatient.getFirstName());
        assertEquals(patientDTO.getLastName(), foundPatient.getLastName());
        assertEquals(patientDTO.getEmail(), foundPatient.getEmail());

        verify(patientRepository, times(1)).findById(any());
    }

    @Test
    void testGetPatientById_ResourceNotFoundException() {
        // Mocking repository behavior to return an empty Optional
        when(patientRepository.findById(any())).thenReturn(Optional.empty());

        // Verify that ResourceNotFoundException is thrown
        assertThrows(ResourceNotFoundException.class, () -> patientService.getPatientById(patientDTO.getPatientId()));

        verify(patientRepository, times(1)).findById(any());
    }

    @Test
    void testUpdatePatient_Success() {
        // Mocking repository behavior to return an Optional containing the patient entity
        when(patientRepository.findById(any())).thenReturn(Optional.of(patientEntity));
        when(patientRepository.save(any())).thenReturn(patientEntity);

        // Updating patient DTO
        patientDTO.setFirstName("Updated First Name");
        patientDTO.setEmail("updated.email@example.com");

        // Call the service method
        PatientDTO updatedPatient = patientService.updatePatient(patientDTO, patientDTO.getPatientId());

        // Verify
        assertNotNull(updatedPatient);
        assertEquals(patientDTO.getFirstName(), updatedPatient.getFirstName());
        assertEquals(patientDTO.getLastName(), updatedPatient.getLastName());
        assertEquals(patientDTO.getEmail(), updatedPatient.getEmail());

        verify(patientRepository, times(1)).findById(any());
        verify(patientRepository, times(1)).save(any());
    }

    @Test
    void testUpdatePatient_ResourceNotFoundException() {
        // Mocking repository behavior to return an empty Optional
        when(patientRepository.findById(any())).thenReturn(Optional.empty());

        // Verify that ResourceNotFoundException is thrown
        assertThrows(ResourceNotFoundException.class, () -> patientService.updatePatient(patientDTO, patientDTO.getPatientId()));

        verify(patientRepository, times(1)).findById(any());
        verify(patientRepository, never()).save(any());
    }


}
