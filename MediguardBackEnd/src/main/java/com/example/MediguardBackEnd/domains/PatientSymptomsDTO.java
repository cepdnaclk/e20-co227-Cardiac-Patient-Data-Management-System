package com.example.MediguardBackEnd.domains;

import java.util.Date;

public class PatientSymptomsDTO {
    private Integer symptomCode;
    private Boolean bilateralLowerLimbSwelling;
    private Boolean dyspnoea;
    private Boolean orthopnoea;
    private Boolean paroxysmalNocturnalDyspnoea;
    private Boolean fatigue;
    private String doctorRecommendation;
    private Date symptomDate;
    private Long patientId;

    public PatientSymptomsDTO() {
    }

    public PatientSymptomsDTO(Integer symptomCode, Boolean bilateralLowerLimbSwelling, Boolean dyspnoea, Boolean orthopnoea, Boolean paroxysmalNocturnalDyspnoea, Boolean fatigue, String doctorRecommendation, Date symptomDate, Long patientId) {
        this.symptomCode = symptomCode;
        this.bilateralLowerLimbSwelling = bilateralLowerLimbSwelling;
        this.dyspnoea = dyspnoea;
        this.orthopnoea = orthopnoea;
        this.paroxysmalNocturnalDyspnoea = paroxysmalNocturnalDyspnoea;
        this.fatigue = fatigue;
        this.doctorRecommendation = doctorRecommendation;
        this.symptomDate = symptomDate;
        this.patientId = patientId;
    }

    public Integer getSymptomCode() {
        return symptomCode;
    }

    public void setSymptomCode(Integer symptomCode) {
        this.symptomCode = symptomCode;
    }

    public Boolean getBilateralLowerLimbSwelling() {
        return bilateralLowerLimbSwelling;
    }

    public void setBilateralLowerLimbSwelling(Boolean bilateralLowerLimbSwelling) {
        this.bilateralLowerLimbSwelling = bilateralLowerLimbSwelling;
    }

    public Boolean getDyspnoea() {
        return dyspnoea;
    }

    public void setDyspnoea(Boolean dyspnoea) {
        this.dyspnoea = dyspnoea;
    }

    public Boolean getOrthopnoea() {
        return orthopnoea;
    }

    public void setOrthopnoea(Boolean orthopnoea) {
        this.orthopnoea = orthopnoea;
    }

    public Boolean getParoxysmalNocturnalDyspnoea() {
        return paroxysmalNocturnalDyspnoea;
    }

    public void setParoxysmalNocturnalDyspnoea(Boolean paroxysmalNocturnalDyspnoea) {
        this.paroxysmalNocturnalDyspnoea = paroxysmalNocturnalDyspnoea;
    }

    public Boolean getFatigue() {
        return fatigue;
    }

    public void setFatigue(Boolean fatigue) {
        this.fatigue = fatigue;
    }

    public String getDoctorRecommendation() {
        return doctorRecommendation;
    }

    public void setDoctorRecommendation(String doctorRecommendation) {
        this.doctorRecommendation = doctorRecommendation;
    }

    public Date getSymptomDate() {
        return symptomDate;
    }

    public void setSymptomDate(Date symptomDate) {
        this.symptomDate = symptomDate;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    @Override
    public String toString() {
        return "PatientSymptomsDTO{" +
                "symptomCode=" + symptomCode +
                ", bilateralLowerLimbSwelling=" + bilateralLowerLimbSwelling +
                ", dyspnoea=" + dyspnoea +
                ", orthopnoea=" + orthopnoea +
                ", paroxysmalNocturnalDyspnoea=" + paroxysmalNocturnalDyspnoea +
                ", fatigue=" + fatigue +
                ", doctorRecommendation='" + doctorRecommendation + '\'' +
                ", symptomDate=" + symptomDate +
                ", patientId=" + patientId +
                '}';
    }
}
