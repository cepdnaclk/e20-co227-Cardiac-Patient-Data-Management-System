package com.example.MediguardBackEnd.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import java.util.Date;

@Entity(name = "PatientSymptoms")
@DynamicInsert
@DynamicUpdate
@Table(name = "patient_symptoms")
public class PatientSymptoms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "symptom_code", updatable = false)
    private Integer symptomCode;

    @Column(name = "bilateral_lower_limb_swelling", columnDefinition = "BOOLEAN")
    private Boolean bilateralLowerLimbSwelling;

    @Column(name = "dyspnoea", columnDefinition = "BOOLEAN")
    private Boolean dyspnoea;

    @Column(name = "orthopnoea", columnDefinition = "BOOLEAN")
    private Boolean orthopnoea;

    @Column(name = "paroxysmal_nocturnal_dyspnoea", columnDefinition = "BOOLEAN")
    private Boolean paroxysmalNocturnalDyspnoea;

    @Column(name = "fatigue", columnDefinition = "BOOLEAN")
    private Boolean fatigue;

    @Column(name = "doctor_recommendation", length = 1000)
    private String doctorRecommendation;

    @Temporal(TemporalType.DATE)
    @Column(name = "symptom_date", nullable = false)
    private Date symptomDate;

    // Relations
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    public PatientSymptoms() {
    }

    public PatientSymptoms(Integer symptomCode, Boolean bilateralLowerLimbSwelling, Boolean dyspnoea, Boolean orthopnoea, Boolean paroxysmalNocturnalDyspnoea, Boolean fatigue, String doctorRecommendation, Date symptomDate) {
        this.symptomCode = symptomCode;
        this.bilateralLowerLimbSwelling = bilateralLowerLimbSwelling;
        this.dyspnoea = dyspnoea;
        this.orthopnoea = orthopnoea;
        this.paroxysmalNocturnalDyspnoea = paroxysmalNocturnalDyspnoea;
        this.fatigue = fatigue;
        this.doctorRecommendation = doctorRecommendation;
        this.symptomDate = symptomDate;
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

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    @Override
    public String toString() {
        return "PatientSymptoms{" +
                "symptomCode=" + symptomCode +
                ", bilateralLowerLimbSwelling=" + bilateralLowerLimbSwelling +
                ", dyspnoea=" + dyspnoea +
                ", orthopnoea=" + orthopnoea +
                ", paroxysmalNocturnalDyspnoea=" + paroxysmalNocturnalDyspnoea +
                ", fatigue=" + fatigue +
                ", doctorRecommendation='" + doctorRecommendation + '\'' +
                ", symptomDate=" + symptomDate +
                ", patient=" + patient +
                '}';
    }
}
