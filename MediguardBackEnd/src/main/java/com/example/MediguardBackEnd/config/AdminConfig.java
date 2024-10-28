package com.example.MediguardBackEnd.config;

import com.example.MediguardBackEnd.entity.Admin;
import com.example.MediguardBackEnd.entity.Role;
import com.example.MediguardBackEnd.entity.UserEntity;
import com.example.MediguardBackEnd.repositories.RoleRepository;
import com.example.MediguardBackEnd.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

@Configuration
public class AdminConfig {

    private static final Logger logger = LoggerFactory.getLogger(AdminConfig.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminConfig(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void initAdminUser(){
        String adminUsername = "Admin";
        String adminPassword = "Admin@123";

        try {
            if(userRepository.findByUsername(adminUsername).isEmpty()){
                logger.info("Admin user not found, creating new admin user.");

                Role adminRole = roleRepository.findByName("ADMIN")
                        .orElseGet(() -> {
                            logger.info("ADMIN role not found, creating new role.");
                            Role newRole = new Role();
                            newRole.setName("ADMIN");
                            return roleRepository.save(newRole);
                        });

                Admin admin = new Admin();
                UserEntity adminUser = new UserEntity();

                adminUser.setAdmin(admin);
                adminUser.setUsername(adminUsername);
                adminUser.setPassword(passwordEncoder.encode(adminPassword));
                admin.setUsers(adminUser);

                adminUser.setRoles(Collections.singletonList(adminRole));
                logger.info("Saving admin user to database.");
                userRepository.save(adminUser);
                logger.info("Admin user created successfully.");
            } else {
                logger.info("Admin user already exists.");
            }
        } catch (Exception e) {
            logger.error("Error during admin user initialization", e);
            throw e; // Re-throw the exception to propagate it up the stack
        }

    }

}
