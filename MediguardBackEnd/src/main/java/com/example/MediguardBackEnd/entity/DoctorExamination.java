package com.example.MediguardBackEnd.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import java.util.Date;

@Entity(name = "DoctorExaminatins")
@DynamicInsert
@DynamicUpdate
@Table(name = "doctor_examinations")


public class DoctorExamination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "examination_code", updatable = false)
    private Integer examinationCode;

    @Column(name = "tachycardia_at_rest", columnDefinition = "BOOLEAN")
    private Boolean tachycardiaAtrest;

    @Column(name = "hypotention", columnDefinition = "BOOLEAN")
    private Boolean hypotention;

    @Column(name = "narrow_pulse_pressure", columnDefinition = "BOOLEAN")
    private Boolean narrowPulsePressure;

    @Column(name = "raised_jugular_venous_pressure", columnDefinition = "BOOLEAN")
    private Boolean raisedJugularVenousPressure;

    @Column(name = "displaced_apex_beat", columnDefinition = "BOOLEAN")
    private Boolean displacedApexBeat;

    @Column(name = "right_venticular_heave", columnDefinition = "BOOLEAN")
    private Boolean rightVenticularHeave;

    @Column(name = "pleural_effusion", columnDefinition = "BOOLEAN")
    private Boolean pleuralEffusion;

    @Column(name = "hepatomegaly", columnDefinition = "BOOLEAN")
    private Boolean hepatomegaly;

    @Column(name = "gallop_rhythm_on_auscultation", columnDefinition = "BOOLEAN")
    private Boolean gallopRhythmOnAuscultation;

    @Column(name = "murmurs_associated_with_valvular_heart_disease", columnDefinition = "BOOLEAN")
    private Boolean murmursAssociatedWithValvularHeartDisease;

    @Column(name = "pedal_and_ankle_oedema", columnDefinition = "BOOLEAN")
    private Boolean pedalAndAnkleOedema;

    @Column(name = "tachypnoea", columnDefinition = "BOOLEAN")
    private Boolean tachypnoea;

    @Column(name = "ascites", columnDefinition = "BOOLEAN")
    private Boolean ascites;

    @Temporal(TemporalType.DATE)
    @Column(name = "examination_date", nullable = false)
    private Date examinationDate;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    public DoctorExamination() {
    }

    public DoctorExamination(Integer examinationCode, Boolean tachycardiaAtrest, Boolean hypotention, Boolean narrowPulsePressure, Boolean raisedJugularVenousPressure, Boolean displacedApexBeat, Boolean rightVenticularHeave, Boolean pleuralEffusion, Boolean hepatomegaly, Boolean gallopRhythmOnAuscultation, Boolean murmursAssociatedWithValvularHeartDisease, Boolean pedalAndAnkleOedema, Boolean tachypnoea, Boolean ascites, Date examinationDate) {
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

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    @Override
    public String toString() {
        return "DoctorExamination{" +
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
                ", patient=" + patient +
                '}';
    }
}
