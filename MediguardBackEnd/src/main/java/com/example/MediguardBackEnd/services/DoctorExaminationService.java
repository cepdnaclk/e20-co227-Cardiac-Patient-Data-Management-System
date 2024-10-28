package com.example.MediguardBackEnd.services;

import com.example.MediguardBackEnd.domains.DoctorExaminationDTO;

import javax.print.Doc;
import java.util.List;
public interface DoctorExaminationService {

    DoctorExaminationDTO createExaminations(Long patientId, DoctorExaminationDTO examinationDTO);

    DoctorExaminationDTO updateExaminations(Long patientId, DoctorExaminationDTO examinationDTO, Integer examinationCode);

    DoctorExaminationDTO getExaminationsById(Long patientId, Integer examinationCode);

    void deleteExaminations(Long patientId, Integer examinationCode);

    List<DoctorExaminationDTO> getExaminationsByPatientId(Long patientId);

}
