package com.example.MediguardBackEnd.Repsitory;

import com.example.MediguardBackEnd.entity.Patient;
import com.example.MediguardBackEnd.repositories.PatientRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class PatientRepositoryTests {

    @Autowired
    private PatientRepository patientRepository;

    @Test
    public void PatientRepository_SaveAll_ReturnSavePatient() {
        // Arrange
        Patient patient = Patient.builder()
                .nic("123456789V")
                .firstName("John")
                .lastName("Doe")
                .gender("Male")
                .dateOfBirth(LocalDate.of(1990, 1, 1))
                .email("john.doe@example.com")
                .build();

        // Act
        Patient savedPatient = patientRepository.save(patient);

        // Assert
        assertThat(savedPatient).isNotNull();
        assertThat(savedPatient.getPatientId()).isGreaterThan(0);
    }

    @Test
    public void PatientRepository_FindById_ReturnPatient() {
        // Arrange
        Patient patient = Patient.builder()
                .nic("123456789V")
                .firstName("John")
                .lastName("Doe")
                .gender("Male")
                .dateOfBirth(LocalDate.of(1990, 1, 1))
                .email("john.doe@example.com")
                .build();
        Patient savedPatient = patientRepository.save(patient);

        // Act
        Optional<Patient> retrievedPatient = patientRepository.findById(savedPatient.getPatientId());

        // Assert
        assertThat(retrievedPatient).isPresent();
        assertThat(retrievedPatient.get().getPatientId()).isEqualTo(savedPatient.getPatientId());
    }

    @Test
    public void PatientRepository_UpdatePatient_ReturnUpdatedPatient() {
        // Arrange
        Patient patient = Patient.builder()
                .nic("123456789V")
                .firstName("John")
                .lastName("Doe")
                .gender("Male")
                .dateOfBirth(LocalDate.of(1990, 1, 1))
                .email("john.doe@example.com")
                .build();
        Patient savedPatient = patientRepository.save(patient);

        // Act
        savedPatient.setFirstName("Jane");
        savedPatient.setEmail("jane.doe@example.com");
        Patient updatedPatient = patientRepository.save(savedPatient);

        // Assert
        assertThat(updatedPatient.getFirstName()).isEqualTo("Jane");
        assertThat(updatedPatient.getEmail()).isEqualTo("jane.doe@example.com");
    }

    @Test
    public void PatientRepository_DeletePatient_ReturnVoid() {
        // Arrange
        Patient patient = Patient.builder()
                .nic("123456789V")
                .firstName("John")
                .lastName("Doe")
                .gender("Male")
                .dateOfBirth(LocalDate.of(1990, 1, 1))
                .email("john.doe@example.com")
                .build();
        Patient savedPatient = patientRepository.save(patient);

        // Act
        patientRepository.delete(savedPatient);
        Optional<Patient> deletedPatient = patientRepository.findById(savedPatient.getPatientId());

        // Assert
        assertThat(deletedPatient).isEmpty();
    }
}
