package com.example.MediguardBackEnd.domains;

import java.util.Date;

public class DoctorExaminationDTO {

    private Integer examinationCode;

    private Boolean tachycardiaAtrest;

    private Boolean hypotention;

    private Boolean narrowPulsePressure;

    private Boolean raisedJugularVenousPressure;

    private Boolean displacedApexBeat;

    private Boolean rightVenticularHeave;

    private Boolean pleuralEffusion;

    private Boolean hepatomegaly;

    private Boolean gallopRhythmOnAuscultation;

    private Boolean murmursAssociatedWithValvularHeartDisease;

    private Boolean pedalAndAnkleOedema;

    private Boolean tachypnoea;

    private Boolean ascites;

    private Date examinationDate;

    private Long patientId;

    public DoctorExaminationDTO() {
    }

    public DoctorExaminationDTO(Integer examinationCode, Boolean tachycardiaAtrest, Boolean hypotention, Boolean narrowPulsePressure, Boolean raisedJugularVenousPressure, Boolean displacedApexBeat, Boolean rightVenticularHeave, Boolean pleuralEffusion, Boolean hepatomegaly, Boolean gallopRhythmOnAuscultation, Boolean murmursAssociatedWithValvularHeartDisease, Boolean pedalAndAnkleOedema, Boolean tachypnoea, Boolean ascites, Date examinationDate, Long patientId) {
        this.examinationCode = examinationCode;
        this.tachycardiaAtrest = tachycardiaAtrest;
        this.hypotention = hypotention;
        this.narrowPulsePressure = narrowPulsePressure;
        this.raisedJugularVenousPressure = raisedJugularVenousPressure;
        this.displacedApexBeat = displacedApexBeat;
        this.rightVenticularHeave = rightVenticularHeave;
        this.pleuralEffusion = pleuralEffusion;
        this.hepatomegaly = hepatomegaly;
        this.gallopRhythmOnAuscultation = gallopRhythmOnAuscultation;
        this.murmursAssociatedWithValvularHeartDisease = murmursAssociatedWithValvularHeartDisease;
        this.pedalAndAnkleOedema = pedalAndAnkleOedema;
        this.tachypnoea = tachypnoea;
        this.ascites = ascites;
        this.examinationDate = examinationDate;
        this.patientId = patientId;
    }

    public Integer getExaminationCode() {
        return examinationCode;
    }

    public void setExaminationCode(Integer examinationCode) {
        this.examinationCode = examinationCode;
    }

    public Boolean getTachycardiaAtrest() {
        return tachycardiaAtrest;
    }

    public void setTachycardiaAtrest(Boolean tachycardiaAtrest) {
        this.tachycardiaAtrest = tachycardiaAtrest;
    }

    public Boolean getHypotention() {
        return hypotention;
    }

    public void setHypotention(Boolean hypotention) {
        this.hypotention = hypotention;
    }

    public Boolean getNarrowPulsePressure() {
        return narrowPulsePressure;
    }

    public void setNarrowPulsePressure(Boolean narrowPulsePressure) {
        this.narrowPulsePressure = narrowPulsePressure;
    }

    public Boolean getRaisedJugularVenousPressure() {
        return raisedJugularVenousPressure;
    }

    public void setRaisedJugularVenousPressure(Boolean raisedJugularVenousPressure) {
        this.raisedJugularVenousPressure = raisedJugularVenousPressure;
    }

    public Boolean getDisplacedApexBeat() {
        return displacedApexBeat;
    }

    public void setDisplacedApexBeat(Boolean displacedApexBeat) {
        this.displacedApexBeat = displacedApexBeat;
    }

    public Boolean getRightVenticularHeave() {
        return rightVenticularHeave;
    }

    public void setRightVenticularHeave(Boolean rightVenticularHeave) {
        this.rightVenticularHeave = rightVenticularHeave;
    }

    public Boolean getPleuralEffusion() {
        return pleuralEffusion;
    }

    public void setPleuralEffusion(Boolean pleuralEffusion) {
        this.pleuralEffusion = pleuralEffusion;
    }

    public Boolean getHepatomegaly() {
        return hepatomegaly;
    }

    public void setHepatomegaly(Boolean hepatomegaly) {
        this.hepatomegaly = hepatomegaly;
    }

    public Boolean getGallopRhythmOnAuscultation() {
        return gallopRhythmOnAuscultation;
    }

    public void setGallopRhythmOnAuscultation(Boolean gallopRhythmOnAuscultation) {
        this.gallopRhythmOnAuscultation = gallopRhythmOnAuscultation;
    }

    public Boolean getMurmursAssociatedWithValvularHeartDisease() {
        return murmursAssociatedWithValvularHeartDisease;
    }

    public void setMurmursAssociatedWithValvularHeartDisease(Boolean murmursAssociatedWithValvularHeartDisease) {
        this.murmursAssociatedWithValvularHeartDisease = murmursAssociatedWithValvularHeartDisease;
    }

    public Boolean getPedalAndAnkleOedema() {
        return pedalAndAnkleOedema;
    }

    public void setPedalAndAnkleOedema(Boolean pedalAndAnkleOedema) {
        this.pedalAndAnkleOedema = pedalAndAnkleOedema;
    }

    public Boolean getTachypnoea() {
        return tachypnoea;
    }

    public void setTachypnoea(Boolean tachypnoea) {
        this.tachypnoea = tachypnoea;
    }

    public Boolean getAscites() {
        return ascites;
    }

    public void setAscites(Boolean ascites) {
        this.ascites = ascites;
    }

    public Date getExaminationDate() {
        return examinationDate;
    }

    public void setExaminationDate(Date examinationDate) {
        this.examinationDate = examinationDate;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    @Override
    public String toString() {
        return "DoctorExaminationDTO{" +
                "examinationCode=" + examinationCode +
                ", tachycardiaAtrest=" + tachycardiaAtrest +
                ", hypotention=" + hypotention +
                ", narrowPulsePressure=" + narrowPulsePressure +
                ", raisedJugularVenousPressure=" + raisedJugularVenousPressure +
                ", displacedApexBeat=" + displacedApexBeat +
                ", rightVenticularHeave=" + rightVenticularHeave +
                ", pleuralEffusion=" + pleuralEffusion +
                ", hepatomegaly=" + hepatomegaly +
                ", gallopRhythmOnAuscultation=" + gallopRhythmOnAuscultation +
                ", murmursAssociatedWithValvularHeartDisease=" + murmursAssociatedWithValvularHeartDisease +
                ", pedalAndAnkleOedema=" + pedalAndAnkleOedema +
                ", tachypnoea=" + tachypnoea +
                ", ascites=" + ascites +
                ", examinationDate=" + examinationDate +
                ", patientId=" + patientId +
                '}';
    }
}
