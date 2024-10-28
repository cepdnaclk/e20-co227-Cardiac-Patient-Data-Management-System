package com.example.MediguardBackEnd.services;

import org.springframework.stereotype.Service;


public interface UserService {
    long getPatientByUserId(int userId);
    long getDoctorByUserId(int userId);
}
