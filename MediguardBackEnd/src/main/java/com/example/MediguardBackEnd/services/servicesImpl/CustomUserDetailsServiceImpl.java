package com.example.MediguardBackEnd.services.servicesImpl;

import com.example.MediguardBackEnd.entity.UserEntity;
import com.example.MediguardBackEnd.mapper.RolesAuthorityMapper;
import com.example.MediguardBackEnd.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(()->
                        new UsernameNotFoundException("Username not found"));
        return new User(user.getUsername(),user.getPassword(), RolesAuthorityMapper.mapRolesToAuthorities(user.getRoles()));
    }


}
