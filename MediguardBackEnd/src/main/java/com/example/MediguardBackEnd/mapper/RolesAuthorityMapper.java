package com.example.MediguardBackEnd.mapper;

import com.example.MediguardBackEnd.entity.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class RolesAuthorityMapper {

    public static Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles){
        return roles.stream().map(role -> new SimpleGrantedAuthority("ROLE_"+role.getName())).collect(Collectors.toList());
        // Don't forget to add "ROLE_" when converting role names to SimpleGrantedAuthority.
        // Spring Security expects roles to be prefixed with "ROLE_".
        // For example, a role "ADMIN" in your database should be mapped to "ROLE_ADMIN".
    }


}
