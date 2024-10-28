package com.example.MediguardBackEnd.services.servicesImpl;

import com.example.MediguardBackEnd.domains.DoctorExaminationDTO;
import com.example.MediguardBackEnd.entity.Patient;
import com.example.MediguardBackEnd.entity.DoctorExamination;
import com.example.MediguardBackEnd.exception.ResourceNotFoundException;
import com.example.MediguardBackEnd.mapper.DoctorExaminationMapper;
import com.example.MediguardBackEnd.mapper.PatientSymptomsMapper;
import com.example.MediguardBackEnd.repositories.PatientRepository;
import com.example.MediguardBackEnd.repositories.DoctorExaminationRepository;
import com.example.MediguardBackEnd.services.DoctorExaminationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorExaminationServiceImpl implements DoctorExaminationService{

    private final DoctorExaminationRepository examinationRepository;

    private final PatientRepository patientRepository;

    @Autowired
    public DoctorExaminationServiceImpl(DoctorExaminationRepository examinationRepository, PatientRepository patientRepository) {
        this.examinationRepository = examinationRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public DoctorExaminationDTO createExaminations(Long patientId, DoctorExaminationDTO examinationDTO) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + patientId));

        DoctorExamination examination = DoctorExaminationMapper.mapToDoctorExamination(examinationDTO);
        examination.setPatient(patient);
        DoctorExamination savedExamination = examinationRepository.save(examination);
        return DoctorExaminationMapper.mapToDoctorExaminationDTO(savedExamination);
    }

    @Override
    public DoctorExaminationDTO updateExaminations(Long patientId, DoctorExaminationDTO doctorExaminationDTO, Integer examinationCode) {
        DoctorExamination doctorExamination = examinationRepository.findById(examinationCode)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor examinations not found with code: " + examinationCode));
        if(!doctorExamination.getPatient().getPatientId().equals(patientId)) {
            throw new ResourceNotFoundException("Patient with patient ID: " + patientId + " does not have a record for doctor examinations with code: " + examinationCode);
        }

        doctorExamination.setTachycardiaAtrest(doctorExaminationDTO.getTachycardiaAtrest());
        doctorExamination.setExaminationDate(doctorExaminationDTO.getExaminationDate());
        doctorExamination.setAscites(doctorExaminationDTO.getAscites());
        doctorExamination.setHepatomegaly(doctorExaminationDTO.getHepatomegaly());
        doctorExamination.setDisplacedApexBeat(doctorExaminationDTO.getDisplacedApexBeat());
        doctorExamination.setGallopRhythmOnAuscultation(doctorExaminationDTO.getGallopRhythmOnAuscultation());
        doctorExamination.setHypotention(doctorExaminationDTO.getHypotention());
        doctorExamination.setMurmursAssociatedWithValvularHeartDisease(doctorExaminationDTO.getMurmursAssociatedWithValvularHeartDisease());
        doctorExamination.setNarrowPulsePressure(doctorExaminationDTO.getNarrowPulsePressure());
        doctorExamination.setPedalAndAnkleOedema(doctorExaminationDTO.getPedalAndAnkleOedema());
        doctorExamination.setPleuralEffusion(doctorExaminationDTO.getPleuralEffusion());
        doctorExamination.setRaisedJugularVenousPressure(doctorExaminationDTO.getRaisedJugularVenousPressure());
        doctorExamination.setRightVenticularHeave(doctorExaminationDTO.getRightVenticularHeave());
        doctorExamination.setTachypnoea(doctorExaminationDTO.getTachypnoea());

        DoctorExamination updatedExamines = examinationRepository.save(doctorExamination);
        return DoctorExaminationMapper.mapToDoctorExaminationDTO(updatedExamines);
    }

    @Override
    public DoctorExaminationDTO getExaminationsById(Long patientId, Integer examinationCode) {
        DoctorExamination doctorExamination = examinationRepository.findById(examinationCode)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor examinations not found with code: " + examinationCode));
        if(!doctorExamination.getPatient().getPatientId().equals(patientId)){
            throw new ResourceNotFoundException("Patient with patient ID: " + patientId + " does not have a record for Symptoms with code: " + examinationCode);
        }
        return DoctorExaminationMapper.mapToDoctorExaminationDTO(doctorExamination);
    }

    @Override
    public void deleteExaminations(Long patientId, Integer examinationCode) {
        DoctorExamination doctorExamination = examinationRepository.findById(examinationCode)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor examinations not found with code: " + examinationCode));

        if(!doctorExamination.getPatient().getPatientId().equals(patientId)){
            throw new ResourceNotFoundException("Patient with patient ID: " + patientId + " does not have a record for Symptoms with code: " + examinationCode);
        }
        examinationRepository.deleteById(examinationCode);
    }

    @Override
    public List<DoctorExaminationDTO> getExaminationsByPatientId(Long patientId) {
        List<DoctorExamination> examinationList = examinationRepository.findByPatient_PatientId(patientId);
        if (examinationList.isEmpty()) {
            throw new ResourceNotFoundException("No doctor examinations found for patient ID: " + patientId);
        }
        return examinationList.stream()
                .map(DoctorExaminationMapper::mapToDoctorExaminationDTO)
                .collect(Collectors.toList());
    }
}
