package com.example.MediguardBackEnd.domains;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class PredictionDataDTO {
    private Long id;
    private int age;
    private int sex;
    private int cp; // Chest pain type
    private int trestbps; // Resting blood pressure
    private int chol; // Serum cholesterol
    private boolean fbs; // Fasting blood sugar
    private int restecg; // Resting electrocardiographic results
    private int thalach; // Maximum heart rate achieved
    private boolean exang; // Exercise induced angina
    private float oldpeak; // ST depression induced by exercise relative to rest
    private int slope; // Slope of the peak exercise ST segment
    private int ca; // Number of major vessels colored by fluoroscopy
    private int thal; // Thalassemia
}
