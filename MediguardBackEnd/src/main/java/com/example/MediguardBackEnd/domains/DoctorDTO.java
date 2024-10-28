package com.example.MediguardBackEnd.domains;

import com.example.MediguardBackEnd.entity.Patient;

import java.util.HashSet;
import java.util.Set;

public class DoctorDTO {
    private Long doctorId;
    private String surname;
    private String lastName;
    private String nic;

    private Set<PatientDTO> registeredPatientsForDoctor = new HashSet<>();

    public DoctorDTO() {
    }

    public DoctorDTO(Long doctorId, String surname, String lastName, String nic) {
        this.doctorId = doctorId;
        this.surname = surname;
        this.lastName = lastName;
        this.nic = nic;
    }

    public DoctorDTO(Long doctorId, String surname, String lastName, String nic, Set<PatientDTO> registeredPatientsForDoctor) {
        this.doctorId = doctorId;
        this.surname = surname;
        this.lastName = lastName;
        this.nic = nic;
        this.registeredPatientsForDoctor = registeredPatientsForDoctor;
    }

    public DoctorDTO(Long doctorId, String surname, String lastName) {
        this.doctorId = doctorId;
        this.surname = surname;
        this.lastName = lastName;
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

    public Set<PatientDTO> getRegisteredPatientsForDoctor() {
        return registeredPatientsForDoctor;
    }

    public void setRegisteredPatientsForDoctor(Set<PatientDTO> registeredPatientsForDoctor) {
        this.registeredPatientsForDoctor = registeredPatientsForDoctor;
    }

    @Override
    public String toString() {
        return "DoctorDTO{" +
                "doctorId=" + doctorId +
                ", surname='" + surname + '\'' +
                ", lastName='" + lastName + '\'' +
                ", nic='" + nic + '\'' +
                ", registeredPatientsForDoctor=" + registeredPatientsForDoctor +
                '}';
    }
}


/*
package com.example.MediguardBackEnd.domains;

public class DoctorDTO {
    private Long doctorId;
    private String surname;
    private String lastName;
    private String nic;
    private String email;
    private String password;

    public DoctorDTO() {
    }

    public DoctorDTO(Long doctorId, String surname, String lastName, String nic, String email, String password) {
        this.doctorId = doctorId;
        this.surname = surname;
        this.lastName = lastName;
        this.nic = nic;
        this.email = email;
        this.password = password;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "DoctorDTO{" +
                "doctorId=" + doctorId +
                ", surname='" + surname + '\'' +
                ", lastName='" + lastName + '\'' +
                ", nic='" + nic + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}



[
  {
    "surname": "Smith",
    "lastName": "Johnson",
    "nic": "123456789V",
    "email": "smith.johnson@example.com",
    "password": "password123"
  },
  {
    "surname": "Williams",
    "lastName": "Brown",
    "nic": "987654321V",
    "email": "williams.brown@example.com",
    "password": "password123"
  },
  {
    "surname": "Jones",
    "lastName": "Garcia",
    "nic": "456789123V",
    "email": "jones.garcia@example.com",
    "password": "password123"
  },
  {
    "surname": "Miller",
    "lastName": "Martinez",
    "nic": "789123456V",
    "email": "miller.martinez@example.com",
    "password": "password123"
  },
  {
    "surname": "Davis",
    "lastName": "Hernandez",
    "nic": "321654987V",
    "email": "davis.hernandez@example.com",
    "password": "password123"
  },
  {
    "surname": "Lopez",
    "lastName": "Gonzalez",
    "nic": "654987321V",
    "email": "lopez.gonzalez@example.com",
    "password": "password123"
  },
  {
    "surname": "Wilson",
    "lastName": "Perez",
    "nic": "159753486V",
    "email": "wilson.perez@example.com",
    "password": "password123"
  },
  {
    "surname": "Moore",
    "lastName": "Sanchez",
    "nic": "753159846V",
    "email": "moore.sanchez@example.com",
    "password": "password123"
  },
  {
    "surname": "Taylor",
    "lastName": "Ramirez",
    "nic": "951753842V",
    "email": "taylor.ramirez@example.com",
    "password": "password123"
  },
  {
    "surname": "Anderson",
    "lastName": "Rodriguez",
    "nic": "852741963V",
    "email": "anderson.rodriguez@example.com",
    "password": "password123"
  }
]

 */