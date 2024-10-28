package com.example.MediguardBackEnd.Controller;

import com.example.MediguardBackEnd.controllers.AdminController;
import com.example.MediguardBackEnd.controllers.PatientController;
import com.example.MediguardBackEnd.domains.PatientDTO;
import com.example.MediguardBackEnd.entity.Admin;
import com.example.MediguardBackEnd.exception.DuplicateException;
import com.example.MediguardBackEnd.services.PatientService;
import com.example.MediguardBackEnd.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class PatientControllerTest {

    @Mock
    private PatientService patientService;

    @Mock
    private UserService userService;

    @Mock
    private BindingResult bindingResult;

    @InjectMocks
    private PatientController patientController;
    @InjectMocks
    private AdminController adminController;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        objectMapper = new ObjectMapper();
    }

    @Test
    public void testCreatePatient_Success() throws Exception {
        PatientDTO patientDTO = getPatientDTO();
        when(patientService.createPatient(any(PatientDTO.class))).thenReturn(patientDTO);

        ResponseEntity<?> responseEntity = patientController.createPatient(patientDTO, bindingResult);
        assertEquals(201, responseEntity.getStatusCodeValue());
        assertEquals(patientDTO, responseEntity.getBody());
    }

    @Test
    public void testCreatePatient_DuplicateException() throws Exception {
        PatientDTO patientDTO = getPatientDTO();
        when(patientService.createPatient(any(PatientDTO.class))).thenThrow(new DuplicateException("Duplicate"));

        ResponseEntity<?> responseEntity = patientController.createPatient(patientDTO, bindingResult);
        assertEquals(409, responseEntity.getStatusCodeValue());
    }

    @Test
    public void testCreatePatient_BindingResultErrors() throws Exception {
        when(bindingResult.hasErrors()).thenReturn(true);

        ResponseEntity<?> responseEntity = patientController.createPatient(new PatientDTO(), bindingResult);
        assertEquals(400, responseEntity.getStatusCodeValue());
    }

    @Test
    public void testGetPatientById_Success() {
        PatientDTO patientDTO = getPatientDTO();
        when(userService.getPatientByUserId(anyInt())).thenReturn(1L);
        when(patientService.getPatientById(anyLong())).thenReturn(patientDTO);

        ResponseEntity<PatientDTO> responseEntity = patientController.getPatientById(1L);
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals(patientDTO, responseEntity.getBody());
    }

    @Test
    public void testUpdatePatient_Success() {
        PatientDTO patientDTO = getPatientDTO();
        when(userService.getPatientByUserId(anyInt())).thenReturn(1L);
        when(patientService.updatePatient(any(PatientDTO.class), anyLong())).thenReturn(patientDTO);

        ResponseEntity<PatientDTO> responseEntity = patientController.updatePatient(patientDTO, 1L);
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals(patientDTO, responseEntity.getBody());
    }

    @Test
    public void testRegisterDoctorsToPatient_Success() {
        PatientDTO patientDTO = getPatientDTO();
        when(userService.getPatientByUserId(anyInt())).thenReturn(1L);
        when(userService.getDoctorByUserId(anyInt())).thenReturn(2L);
        when(patientService.putVisitedDoctors(anyLong(), anyLong())).thenReturn(patientDTO);

        ResponseEntity<PatientDTO> responseEntity = adminController.RegisterDoctorsToPatient(1L, 2L);
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals(patientDTO, responseEntity.getBody());
    }

    @Test
    public void testDeletePatient_Success() {
        doNothing().when(patientService).deletePatient(anyLong());
        when(userService.getPatientByUserId(anyInt())).thenReturn(1L);

        ResponseEntity<String> responseEntity = patientController.deletePatient(1L);
        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals("Patient deleted Successfully.", responseEntity.getBody());
    }

    private PatientDTO getPatientDTO() {
        return PatientDTO.builder()
                .patientId(1L)
                .nic("123456789V")
                .firstName("John")
                .lastName("Doe")
                .gender("Male")
                .dateOfBirth(LocalDate.of(1990, 1, 1))
                .email("john.doe@example.com")
                .build();
    }
}
