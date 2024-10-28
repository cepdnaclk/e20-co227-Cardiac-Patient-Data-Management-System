package com.example.MediguardBackEnd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity(name="patient")
@DynamicInsert
@DynamicUpdate
@Table(name="patient",uniqueConstraints = {
        @UniqueConstraint(name="patient_unique_email",columnNames = "email"),
        @UniqueConstraint(name="patient_unique_nic", columnNames = "nic")})
public class Patient {
    @Id
    @SequenceGenerator(
            name="patient_sequence",
            sequenceName="patient_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "patient_sequence"
    )
    @Column(name="patient_id",updatable = false)
    private Long patientId;
    @Column(name = "nic",nullable = false,columnDefinition = "TEXT")
    private String nic;
    @Column(name = "first_name",nullable = false,columnDefinition = "TEXT")
    private String firstName;
    @Column(name = "last_name",nullable = false,columnDefinition = "TEXT")
    private String lastName;
    @Column(name = "gender",nullable = false,columnDefinition = "TEXT")
    private String gender;
    @Column(name = "date_of_birth",nullable = false,columnDefinition = "DATE")
    private LocalDate dateOfBirth;
    @Column(name="email",nullable = true,columnDefinition = "TEXT")
    private String email;

    // Relationships
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "doctors_and_patients",
            joinColumns = @JoinColumn(name = "patient_id"),
            inverseJoinColumns = @JoinColumn(name = "doctor_id")
    )
    private Set<Doctor> visitedDoctorsForPatient = new HashSet<>();

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PatientClinicalData> clinicalData;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<PatientSymptoms>  symptomCode;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<DoctorExamination>  examinationCode;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<PredictionData>  predictionDataId;


    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity users;

    public Patient() {
    }

    public Patient(Long patientId, String nic, String firstName, String lastName, String gender, LocalDate dateOfBirth,String email) {
        this.patientId = patientId;
        this.nic = nic;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
    }

    public Patient(Long patientId, String nic, String firstName, String lastName, String gender, LocalDate dateOfBirth, String email, Set<Doctor> visitedDoctorsForPatient, Set<PatientClinicalData> clinicalData, Set<PatientSymptoms> symptomCode, Set<DoctorExamination> examinationCode, UserEntity users) {
        this.patientId = patientId;
        this.nic = nic;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.visitedDoctorsForPatient = visitedDoctorsForPatient;
        this.clinicalData = clinicalData;
        this.symptomCode = symptomCode;
        this.examinationCode = examinationCode;
        this.users = users;
    }

    public Patient(Long patientId, String nic, String firstName, String lastName, String gender, LocalDate dateOfBirth, String email, Set<Doctor> visitedDoctorsForPatient, Set<PatientClinicalData> clinicalData, Set<PatientSymptoms> symptomCode, Set<DoctorExamination> examinationCode, Set<PredictionData> predictionDataId, UserEntity users) {
        this.patientId = patientId;
        this.nic = nic;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.visitedDoctorsForPatient = visitedDoctorsForPatient;
        this.clinicalData = clinicalData;
        this.symptomCode = symptomCode;
        this.examinationCode = examinationCode;
        this.predictionDataId = predictionDataId;
        this.users = users;
    }

    @Builder
    public Patient(Long patientId, String nic, String firstName, String lastName, String gender, LocalDate dateOfBirth, String email, Set<Doctor> visitedDoctorsForPatient, Set<PatientClinicalData> clinicalData, Set<PatientSymptoms> symptomCode, UserEntity users) {
        this.patientId = patientId;
        this.nic = nic;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.visitedDoctorsForPatient = visitedDoctorsForPatient;
        this.clinicalData = clinicalData;
        this.symptomCode = symptomCode;
        this.users = users;
    }


    public UserEntity getUsers() {
        return users;
    }

    public void setUsers(UserEntity users) {
        this.users = users;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public Set<Doctor> getVisitedDoctorsForPatient() {
        return visitedDoctorsForPatient;
    }

    public void setVisitedDoctorsForPatient(Set<Doctor> visitedDoctorsForPatient) {
        this.visitedDoctorsForPatient = visitedDoctorsForPatient;
    }

    public Set<PatientClinicalData> getClinicalData() {
        return clinicalData;
    }

    public void setClinicalData(Set<PatientClinicalData> clinicalData) {
        this.clinicalData = clinicalData;
    }

    public Set<PatientSymptoms> getSymptomCode() {
        return symptomCode;
    }

    public void setSymptomCode(Set<PatientSymptoms> symptomCode) {
        this.symptomCode = symptomCode;
    }

    public void addVisitedDoctors(Doctor doctor){
        visitedDoctorsForPatient.add(doctor);
    }

    public void removeVisitedDoctors(Doctor doctor){
        visitedDoctorsForPatient.remove(doctor);
    }

    public Set<DoctorExamination> getExaminationCode() {
        return examinationCode;
    }

    public void setExaminationCode(Set<DoctorExamination> examinationCode) {
        this.examinationCode = examinationCode;
    }

    public Set<PredictionData> getPredictionDataId() {
        return predictionDataId;
    }

    public void setPredictionDataId(Set<PredictionData> predictionDataId) {
        this.predictionDataId = predictionDataId;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "patientId=" + patientId +
                ", nic='" + nic + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", gender='" + gender + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", email='" + email + '\'' +
                ", visitedDoctorsForPatient=" + visitedDoctorsForPatient +
                ", clinicalData=" + clinicalData +
                ", symptomCode=" + symptomCode +
                ", examinationCode=" + examinationCode +
                ", predictionDataId=" + predictionDataId +
                ", users=" + users +
                '}';
    }
}
