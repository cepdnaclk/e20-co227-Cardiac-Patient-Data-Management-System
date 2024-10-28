package com.example.MediguardBackEnd.domains;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Builder
public class PatientDTO {

    private Long patientId;
    @NotNull(message = "NIC is required")
    private String nic;

    @NotNull(message = "First name is required")
    private String firstName;

    @NotNull(message = "Last name is required")
    private String lastName;

    @NotNull(message = "Gender is required")
    private String gender;

    @NotNull(message = "Date of birth is required")
    private LocalDate dateOfBirth;

    private String email;

    private Set<DoctorDTO> visitedDoctorsForPatient = new HashSet<>();

    public PatientDTO() {
    }

    public PatientDTO(Long patientId, String firstName, String lastName, Set<DoctorDTO> visitedDoctorsForPatient) {
        this.patientId = patientId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.visitedDoctorsForPatient = visitedDoctorsForPatient;
    }

    public PatientDTO(Long patientId, String nic, String firstName, String lastName, String gender, LocalDate dateOfBirth, String email) {
        this.patientId = patientId;
        this.nic = nic;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
    }

    public PatientDTO(Long patientId, String nic, String firstName, String lastName, String gender, LocalDate dateOfBirth, String email, Set<DoctorDTO> visitedDoctorsForPatient) {
        this.patientId = patientId;
        this.nic = nic;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.visitedDoctorsForPatient = visitedDoctorsForPatient;
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

    public Set<DoctorDTO> getVisitedDoctorsForPatient() {
        return visitedDoctorsForPatient;
    }

    public void setVisitedDoctorsForPatient(Set<DoctorDTO> visitedDoctorsForPatient) {
        this.visitedDoctorsForPatient = visitedDoctorsForPatient;
    }

    @Override
    public String toString() {
        return "PatientDTO{" +
                "patientId=" + patientId +
                ", nic='" + nic + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", gender='" + gender + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", email='" + email + '\'' +
                ", visitedDoctorsForPatient=" + visitedDoctorsForPatient +
                '}';
    }
}
