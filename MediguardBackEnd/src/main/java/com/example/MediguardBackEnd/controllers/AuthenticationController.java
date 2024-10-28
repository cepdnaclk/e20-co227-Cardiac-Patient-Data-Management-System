package com.example.MediguardBackEnd.controllers;

import com.example.MediguardBackEnd.domains.AuthenticationResponseDTO;
import com.example.MediguardBackEnd.domains.LoginDTO;
import com.example.MediguardBackEnd.domains.RegisterDTO;
import com.example.MediguardBackEnd.entity.Doctor;
import com.example.MediguardBackEnd.entity.Patient;
import com.example.MediguardBackEnd.entity.Role;
import com.example.MediguardBackEnd.entity.UserEntity;
import com.example.MediguardBackEnd.exception.ResourceNotFoundException;
import com.example.MediguardBackEnd.repositories.DoctorRepository;
import com.example.MediguardBackEnd.repositories.PatientRepository;
import com.example.MediguardBackEnd.repositories.RoleRepository;
import com.example.MediguardBackEnd.repositories.UserRepository;
import com.example.MediguardBackEnd.security.JWTGenerator;
import com.example.MediguardBackEnd.security.SecurityConfig;
import com.example.MediguardBackEnd.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTGenerator jwtGenerator;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final UserService userService;


    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, UserRepository userRepository,
                                    RoleRepository roleRepository, PasswordEncoder passwordEncoder,
                                    JWTGenerator jwtGenerator, PatientRepository patientRepository,
                                    DoctorRepository doctorRepository, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.userService = userService;
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }

        UserEntity user = userRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User does not exist!"));

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtGenerator.generateToken(authentication);

            List<String> roles = user.getRoles().stream().map(Role::getName).toList();

            // Create the userRoles list
            List<Map<String, Object>> userRoles = user.getRoles().stream().map(role -> {
                Map<String, Object> map = new HashMap<>();
                map.put("user", user.getId());
                map.put("role", role.getName());

                // Initialize patientId and doctorId as null
                Long patientId = null;
                Long doctorId = null;

                // Check role and set patientId or doctorId
                if ("USER".equals(role.getName())) {
                    // Get patientId using getPatientByUserId in UserService
                    patientId = userService.getPatientByUserId(user.getId());
                } else if ("DOCTOR".equals(role.getName())) {
                    // Get doctorId using getDoctorByUserId in UserService
                    doctorId = userService.getDoctorByUserId(user.getId());
                }

                // Add patientId and doctorId to the map
                map.put("patientId", patientId);
                map.put("doctorId", doctorId);

                return map;
            }).toList();

            return new ResponseEntity<>(new AuthenticationResponseDTO(token, (long) user.getId(), roles, userRoles), HttpStatus.OK);

        } catch (AuthenticationException e) {
            // Return unauthorized status if authentication fails
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
    }



    @PostMapping("register/patient/{patientId}")
    public ResponseEntity<String> registerPatient(@Valid @RequestBody RegisterDTO registerDTO, @PathVariable long patientId) {

        if (userRepository.existsByUsername(registerDTO.getUsername())) {
            return new ResponseEntity<>("Username is taken!", HttpStatus.CONFLICT);
        }

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + patientId));

        UserEntity user = new UserEntity();

        user.setPatient(patient);
        user.setUsername(registerDTO.getUsername());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        patient.setUsers(user);

        /*
        The method retrieves a Role object with the name "USER" from the roleRepository.
        The role is set on the user object as a singleton list (a list containing only one element).
         */
        Optional<Role> optionalRole = roleRepository.findByName("USER");
        if (optionalRole.isEmpty()) {
            return new ResponseEntity<>("User role not found!", HttpStatus.NOT_FOUND);
        }
        Role roles = optionalRole.get();
        user.setRoles(Collections.singletonList(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User Registered successfully!", HttpStatus.OK);
    }

    @PostMapping("register/doctor/{doctorId}")
    public ResponseEntity<String> registerDoctor(@Valid @RequestBody RegisterDTO registerDTO, @PathVariable long doctorId) {

        if (userRepository.existsByUsername(registerDTO.getUsername())) {
            return new ResponseEntity<>("Username is taken!", HttpStatus.CONFLICT);
        }

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with ID: " + doctorId));

        UserEntity user = new UserEntity();

        user.setDoctor(doctor);
        user.setUsername(registerDTO.getUsername());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        doctor.setUsers(user);

        /*
        The method retrieves a Role object with the name "USER" from the roleRepository.
        The role is set on the user object as a singleton list (a list containing only one element).
         */
        Optional<Role> optionalRole = roleRepository.findByName("DOCTOR");
        if (optionalRole.isEmpty()) {
            return new ResponseEntity<>("User role not found!", HttpStatus.NOT_FOUND);
        }
        Role roles = optionalRole.get();
        user.setRoles(Collections.singletonList(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User Registered successfully!", HttpStatus.OK);
    }
}
