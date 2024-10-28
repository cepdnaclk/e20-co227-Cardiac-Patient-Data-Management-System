package com.example.MediguardBackEnd.config;

import com.example.MediguardBackEnd.entity.Patient;
import com.example.MediguardBackEnd.entity.Role;
import com.example.MediguardBackEnd.repositories.PatientRepository;
import com.example.MediguardBackEnd.repositories.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class RoleInitializerConfig {

    private static final Logger logger = LoggerFactory.getLogger(AdminConfig.class);

    private final RoleRepository roleRepository;
    private final AdminConfig adminConfig;


    @Autowired
    public RoleInitializerConfig(RoleRepository roleRepository, AdminConfig adminConfig) {
        this.roleRepository = roleRepository;
        this.adminConfig = adminConfig;
    }

    @PostConstruct
    public void init() {
        try {
            logger.info("Initializing roles...");
            List<String> roles = Arrays.asList("ADMIN", "USER", "DOCTOR");
            for (String roleName : roles) {
                if (roleRepository.findByName(roleName).isEmpty()) {
                    Role role = new Role();
                    role.setName(roleName);
                    roleRepository.save(role);
                    logger.info("Role {} created", roleName);
                }
            }

            logger.info("Initializing admin user...");
            adminConfig.initAdminUser();
        } catch (Exception e) {
            logger.error("Error during role initialization", e);
            throw e; // Re-throw the exception to propagate it up the stack
        }
    }


}
