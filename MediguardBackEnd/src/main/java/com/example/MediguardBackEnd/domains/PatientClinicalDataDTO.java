package com.example.MediguardBackEnd.domains;

import java.util.Date;

public class PatientClinicalDataDTO {

    private Long clinicalDataId;
    private boolean diagnosisOfHeartDisease;
    private boolean presenceOfAnemia;
    private int creatininePhosphokinase;
    private boolean diabetes;
    private int ejectionFraction;   //Percentage %
    private int bloodPressure;
    private int platelets;
    private int serumCreatinine;
    private int serumSodium;
    private boolean smoking;
    private int followUpPeriodDays;
    private Date clinicalDate;

    public PatientClinicalDataDTO() {
    }

    public PatientClinicalDataDTO(Long clinicalDataId, boolean diagnosisOfHeartDisease, boolean presenceOfAnemia, int creatininePhosphokinase, boolean diabetes, int ejectionFraction, int bloodPressure, int platelets, int serumCreatinine, int serumSodium, boolean smoking, int followUpPeriodDays, Date clinicalDate) {
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

    @Override
    public String toString() {
        return "PatientClinicalDataDTO{" +
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
                '}';
    }
}
