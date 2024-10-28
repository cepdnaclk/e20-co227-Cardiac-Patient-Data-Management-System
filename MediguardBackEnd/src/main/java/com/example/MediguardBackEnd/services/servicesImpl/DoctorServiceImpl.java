package com.example.MediguardBackEnd.services.servicesImpl;

import com.example.MediguardBackEnd.domains.DoctorDTO;
import com.example.MediguardBackEnd.entity.Doctor;
import com.example.MediguardBackEnd.entity.Patient;
import com.example.MediguardBackEnd.exception.DuplicateException;
import com.example.MediguardBackEnd.exception.ResourceNotFoundException;
import com.example.MediguardBackEnd.exception.ServiceException;
import com.example.MediguardBackEnd.mapper.DoctorMapper;
import com.example.MediguardBackEnd.mapper.PatientMapper;
import com.example.MediguardBackEnd.repositories.DoctorRepository;
import com.example.MediguardBackEnd.repositories.PatientRepository;
import com.example.MediguardBackEnd.repositories.UserRepository;
import com.example.MediguardBackEnd.services.DoctorService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorService {


    private final DoctorRepository doctorRepository;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;

    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository, ObjectMapper objectMapper, UserRepository userRepository, PatientRepository patientRepository) {
        this.doctorRepository = doctorRepository;
        this.objectMapper = objectMapper;
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public DoctorDTO createDoctor(DoctorDTO doctorDTO) {
        if (doctorRepository.existsByNic(doctorDTO.getNic())) {
            throw new DuplicateException("Patient with NIC " + doctorDTO.getNic() + " already exists.");
        }
        Doctor doctor = DoctorMapper.mapToDoctor(doctorDTO);
        Doctor savedDoctor = doctorRepository.save(doctor);
        return DoctorMapper.mapToDoctorDTO(savedDoctor);
    }

    @Override
    public List<DoctorDTO> createDoctors(String doctorJson) throws IOException {
        List<DoctorDTO> doctorDTOs = objectMapper.readValue(doctorJson, new TypeReference<List<DoctorDTO>>() {});
        List<DoctorDTO> createdDoctors = new ArrayList<>();

        for (DoctorDTO doctorDTO : doctorDTOs) {
            if (doctorRepository.existsByNic(doctorDTO.getNic())) {
                throw new DuplicateException("Patient with NIC " + doctorDTO.getNic() + " already exists.");
            }
            Doctor doctor = DoctorMapper.mapToDoctor(doctorDTO);
            Doctor savedDoctor = doctorRepository.save(doctor);
            createdDoctors.add(DoctorMapper.mapToDoctorDTO(savedDoctor));
        }

        return createdDoctors;
    }

    @Override
    public List<DoctorDTO> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        return doctors.stream().map(DoctorMapper::mapToDoctorDTO).collect(Collectors.toList());
    }

    @Override
    public DoctorDTO getDoctorById(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor does not exist with the given id : " + doctorId));
        return DoctorMapper.mapToDoctorDTO(doctor);
    }

    @Override
    public DoctorDTO updateDoctor(DoctorDTO updatedDoctor, Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor does not exist with the given id : " + doctorId));

        doctor.setSurname(updatedDoctor.getSurname());
        doctor.setLastName(updatedDoctor.getLastName());
        doctor.setNic(updatedDoctor.getNic());

        Doctor updatedDoctorObj = doctorRepository.save(doctor);

        return DoctorMapper.mapToDoctorDTO(updatedDoctorObj);
    }

    @Override
    @Transactional
    public void deleteDoctor(Long doctorId) {
        try {
            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor does not exist with the given id : " + doctorId));


            // Remove the doctor from all associated patients
            Set<Patient> patients = doctor.getRegisteredPatientsForDoctor();
            for (Patient patient : patients) {
                patient.getVisitedDoctorsForPatient().remove(doctor);
                patientRepository.save(patient);
            }

            // Delete the doctor

            userRepository.deleteById(doctor.getUsers().getId());
        }catch(ResourceNotFoundException e){
            throw e;
        }catch (Exception e) {
            throw new ServiceException("An error occurred while deleting the doctor: " + e.getMessage());
        }
    }
}
