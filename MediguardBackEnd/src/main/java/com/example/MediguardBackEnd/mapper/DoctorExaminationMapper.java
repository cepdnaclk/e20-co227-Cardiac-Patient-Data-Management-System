package com.example.MediguardBackEnd.mapper;

import com.example.MediguardBackEnd.domains.DoctorExaminationDTO;
import com.example.MediguardBackEnd.entity.DoctorExamination;

public class DoctorExaminationMapper {

    public static DoctorExaminationDTO mapToDoctorExaminationDTO(DoctorExamination doctorExamination) {
        if (doctorExamination == null) {
            return null;
        }
        return new DoctorExaminationDTO(
                doctorExamination.getExaminationCode(),
                doctorExamination.getTachycardiaAtrest(),
                doctorExamination.getHypotention(),
                doctorExamination.getNarrowPulsePressure(),
                doctorExamination.getRaisedJugularVenousPressure(),
                doctorExamination.getDisplacedApexBeat(),
                doctorExamination.getRightVenticularHeave(),
                doctorExamination.getPleuralEffusion(),
                doctorExamination.getHepatomegaly(),
                doctorExamination.getGallopRhythmOnAuscultation(),
                doctorExamination.getMurmursAssociatedWithValvularHeartDisease(),
                doctorExamination.getPedalAndAnkleOedema(),
                doctorExamination.getTachypnoea(),
                doctorExamination.getAscites(),
                doctorExamination.getExaminationDate(),
                doctorExamination.getPatient().getPatientId()
        );
    }

    public static DoctorExamination mapToDoctorExamination(DoctorExaminationDTO doctorExaminationDTO) {
        if (doctorExaminationDTO == null) {
            return null;
        }
        return new DoctorExamination(
                doctorExaminationDTO.getExaminationCode(),
                doctorExaminationDTO.getTachycardiaAtrest(),
                doctorExaminationDTO.getHypotention(),
                doctorExaminationDTO.getNarrowPulsePressure(),
                doctorExaminationDTO.getRaisedJugularVenousPressure(),
                doctorExaminationDTO.getDisplacedApexBeat(),
                doctorExaminationDTO.getRightVenticularHeave(),
                doctorExaminationDTO.getPleuralEffusion(),
                doctorExaminationDTO.getHepatomegaly(),
                doctorExaminationDTO.getGallopRhythmOnAuscultation(),
                doctorExaminationDTO.getMurmursAssociatedWithValvularHeartDisease(),
                doctorExaminationDTO.getPedalAndAnkleOedema(),
                doctorExaminationDTO.getTachypnoea(),
                doctorExaminationDTO.getAscites(),
                doctorExaminationDTO.getExaminationDate()
        );
    }
}
