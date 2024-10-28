package com.example.MediguardBackEnd.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.HashSet;
import java.util.Set;

@Entity(name="doctor")
@DynamicInsert
@DynamicUpdate
@Table(name="doctor",uniqueConstraints = {@UniqueConstraint(name="doctor_unique_nic", columnNames = "doctor_nic")})
public class Doctor {
    @Id
    @SequenceGenerator(
            name="doctor_sequence",
            sequenceName="doctor_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "doctor_sequence"
    )
    @Column(name="doctor_id",updatable = false)
    private Long doctorId;
    @Column(name = "surname",nullable = false,columnDefinition = "TEXT")
    private String surname;
    @Column(name = "last_name",nullable = false,columnDefinition = "TEXT")
    private String lastName;
    @Column(name = "doctor_nic",nullable = false,columnDefinition = "TEXT")
    private String nic;

    @JsonIgnore
    @ManyToMany(mappedBy = "visitedDoctorsForPatient", cascade = CascadeType.ALL)
    private Set<Patient> registeredPatientsForDoctor = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity users;

    public Doctor() {
    }

    public Doctor(Long doctorId, String surname, String lastName, String nic) {
        this.doctorId = doctorId;
        this.surname = surname;
        this.lastName = lastName;
        this.nic = nic;
    }

    public UserEntity getUsers() {
        return users;
    }

    public void setUsers(UserEntity users) {
        this.users = users;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }


    public Set<Patient> getRegisteredPatientsForDoctor() {
        return registeredPatientsForDoctor;
    }

    public void setRegisteredPatientsForDoctor(Set<Patient> registeredPatientsForDoctor) {
        this.registeredPatientsForDoctor = registeredPatientsForDoctor;
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "doctorId=" + doctorId +
                ", surname='" + surname + '\'' +
                ", lastName='" + lastName + '\'' +
                ", nic='" + nic + '\'' +
                ", registeredPatientsForDoctor=" + registeredPatientsForDoctor +
                '}';
    }
}
