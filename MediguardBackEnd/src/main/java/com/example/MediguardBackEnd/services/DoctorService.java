package com.example.MediguardBackEnd.services;

import com.example.MediguardBackEnd.domains.DoctorDTO;

import java.io.IOException;
import java.util.List;

public interface DoctorService {
    DoctorDTO createDoctor(DoctorDTO doctorDTO);
    List<DoctorDTO> getAllDoctors();
    DoctorDTO getDoctorById(Long doctorId);
    DoctorDTO updateDoctor(DoctorDTO doctorDTO,Long doctorId);
    void deleteDoctor(Long doctorId);
    List<DoctorDTO> createDoctors(String DoctorJson) throws IOException;
}
