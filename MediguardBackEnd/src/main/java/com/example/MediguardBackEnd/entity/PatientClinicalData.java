package com.example.MediguardBackEnd.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Date;

@Entity(name = "PatientClinicalData")
@DynamicInsert
@DynamicUpdate
@Table(name = "PatientClinicalData")
public class PatientClinicalData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clinical_data_id", updatable = false)
    private Long clinicalDataId;

    @Column(name = "diagnosis_of_heart_disease",columnDefinition = "BOOLEAN")
    private boolean diagnosisOfHeartDisease;

    @Column(name = "presence_of_anemia",columnDefinition = "BOOLEAN")
    private boolean presenceOfAnemia;

    @Column(name = "creatinine_phosphokinase",columnDefinition = "INTEGER")
    private int creatininePhosphokinase;

    @Column(name = "diabetes",columnDefinition = "BOOLEAN")
    private boolean diabetes;

    @Column(name = "ejection_fraction",columnDefinition = "INTEGER")
    private int ejectionFraction;   //Percentage %

    @Column(name = "blood_pressure",columnDefinition = "INTEGER")
    private int bloodPressure;

    @Column(name = "platelets",columnDefinition = "INTEGER")
    private int platelets;

    @Column(name = "serum_creatinine",columnDefinition = "INTEGER")
    private int serumCreatinine;

    @Column(name = "serum_sodium",columnDefinition = "INTEGER")
    private int serumSodium;

    @Column(name = "smoking",columnDefinition = "BOOLEAN")
    private boolean smoking;

    @Column(name = "follow_up_period_days",columnDefinition = "INTEGER")
    private int followUpPeriodDays;

    @Temporal(TemporalType.DATE)
    @Column(name = "clinical_date", nullable = false)
    private Date clinicalDate;

    //Relations
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    public PatientClinicalData() {
    }

    public PatientClinicalData(Long clinicalDataId, boolean diagnosisOfHeartDisease, boolean presenceOfAnemia, int creatininePhosphokinase, boolean diabetes, int ejectionFraction, int bloodPressure, int platelets, int serumCreatinine, int serumSodium, boolean smoking, int followUpPeriodDays, Date clinicalDate) {
        this.clinicalDataId = clinicalDataId;
        this.diagnosisOfHeartDisease = diagnosisOfHeartDisease;
        this.presenceOfAnemia = presenceOfAnemia;
        this.creatininePhosphokinase = creatininePhosphokinase;
        this.diabetes = diabetes;
        this.ejectionFraction = ejectionFraction;
        this.bloodPressure = bloodPressure;
        this.platelets = platelets;
        this.serumCreatinine = serumCreatinine;
        this.serumSodium = serumSodium;
        this.smoking = smoking;
        this.followUpPeriodDays = followUpPeriodDays;
        this.clinicalDate = clinicalDate;
    }



    public Long getClinicalDataId() {
        return clinicalDataId;
    }

    public void setClinicalDataId(Long clinicalDataId) {
        this.clinicalDataId = clinicalDataId;
    }

    public boolean isDiagnosisOfHeartDisease() {
        return diagnosisOfHeartDisease;
    }

    public void setDiagnosisOfHeartDisease(boolean diagnosisOfHeartDisease) {
        this.diagnosisOfHeartDisease = diagnosisOfHeartDisease;
    }

    public boolean isPresenceOfAnemia() {
        return presenceOfAnemia;
    }

    public void setPresenceOfAnemia(boolean presenceOfAnemia) {
        this.presenceOfAnemia = presenceOfAnemia;
    }

    public int getCreatininePhosphokinase() {
        return creatininePhosphokinase;
    }

    public void setCreatininePhosphokinase(int creatininePhosphokinase) {
        this.creatininePhosphokinase = creatininePhosphokinase;
    }

    public boolean isDiabetes() {
        return diabetes;
    }

    public void setDiabetes(boolean diabetes) {
        this.diabetes = diabetes;
    }

    public int getEjectionFraction() {
        return ejectionFraction;
    }

    public void setEjectionFraction(int ejectionFraction) {
        this.ejectionFraction = ejectionFraction;
    }

    public int getBloodPressure() {
        return bloodPressure;
    }

    public void setBloodPressure(int bloodPressure) {
        this.bloodPressure = bloodPressure;
    }

    public int getPlatelets() {
        return platelets;
    }

    public void setPlatelets(int platelets) {
        this.platelets = platelets;
    }

    public int getSerumCreatinine() {
        return serumCreatinine;
    }

    public void setSerumCreatinine(int serumCreatinine) {
        this.serumCreatinine = serumCreatinine;
    }

    public int getSerumSodium() {
        return serumSodium;
    }

    public void setSerumSodium(int serumSodium) {
        this.serumSodium = serumSodium;
    }

    public boolean isSmoking() {
        return smoking;
    }

    public void setSmoking(boolean smoking) {
        this.smoking = smoking;
    }

    public int getFollowUpPeriodDays() {
        return followUpPeriodDays;
    }

    public void setFollowUpPeriodDays(int followUpPeriodDays) {
        this.followUpPeriodDays = followUpPeriodDays;
    }

    public Date getClinicalDate() {
        return clinicalDate;
    }

    public void setClinicalDate(Date clinicalDate) {
        this.clinicalDate = clinicalDate;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    @Override
    public String toString() {
        return "PatientClinicalData{" +
                "clinicalDataId=" + clinicalDataId +
                ", diagnosisOfHeartDisease=" + diagnosisOfHeartDisease +
                ", presenceOfAnemia=" + presenceOfAnemia +
                ", creatininePhosphokinase=" + creatininePhosphokinase +
                ", diabetes=" + diabetes +
                ", ejectionFraction=" + ejectionFraction +
                ", bloodPressure=" + bloodPressure +
                ", platelets=" + platelets +
                ", serumCreatinine=" + serumCreatinine +
                ", serumSodium=" + serumSodium +
                ", smoking=" + smoking +
                ", followUpPeriodDays=" + followUpPeriodDays +
                ", clinicalDate=" + clinicalDate +
                ", patient=" + patient +
                '}';
    }
}




