package com.example.MediguardBackEnd.services.servicesImpl;

import com.example.MediguardBackEnd.entity.UserEntity;
import com.example.MediguardBackEnd.exception.ResourceNotFoundException;
import com.example.MediguardBackEnd.repositories.UserRepository;
import com.example.MediguardBackEnd.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public long getPatientByUserId(int userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("User does not exist with id: " + userId));
        if (user.getPatient() == null) {
            throw new ResourceNotFoundException("Patient does not exist for user id: " + userId);
        }
        return user.getPatient().getPatientId();
    }

    @Override
    public long getDoctorByUserId(int userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("User does not exist with id: " + userId));
        if (user.getDoctor() == null) {
            throw new ResourceNotFoundException("Doctor does not exist for user id: " + userId);
        }
        return user.getDoctor().getDoctorId();
    }
}
