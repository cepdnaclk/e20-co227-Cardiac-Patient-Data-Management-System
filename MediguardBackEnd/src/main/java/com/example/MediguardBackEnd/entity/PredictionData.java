package com.example.MediguardBackEnd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity(name = "prediction_data")
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Table(name = "prediction_data")
public class PredictionData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "age", nullable = false)
    private int age;

    @Column(name = "sex", nullable = false)
    private int sex;

    @Column(name = "cp", nullable = false)
    private int cp; // Chest pain type

    @Column(name = "trestbps", nullable = false)
    private int trestbps; // Resting blood pressure

    @Column(name = "chol", nullable = false)
    private int chol; // Serum cholesterol

    @Column(name = "fbs", nullable = false)
    private boolean fbs; // Fasting blood sugar

    @Column(name = "restecg", nullable = false)
    private int restecg; // Resting electrocardiographic results

    @Column(name = "thalach", nullable = false)
    private int thalach; // Maximum heart rate achieved

    @Column(name = "exang", nullable = false)
    private boolean exang; // Exercise induced angina

    @Column(name = "oldpeak", nullable = false)
    private float oldpeak; // ST depression induced by exercise relative to rest

    @Column(name = "slope", nullable = false)
    private int slope; // Slope of the peak exercise ST segment

    @Column(name = "ca", nullable = false)
    private int ca; // Number of major vessels colored by fluoroscopy

    @Column(name = "thal", nullable = false)
    private int thal; // Thalassemia

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
}
