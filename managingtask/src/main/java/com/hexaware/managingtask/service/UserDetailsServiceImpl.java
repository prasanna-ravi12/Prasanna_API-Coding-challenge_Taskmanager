package com.hexaware.managingtask.service;

import com.hexaware.managingtask.entity.user;
import com.hexaware.managingtask.entity.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private userRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        user u = userRepo.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                u.getEmail(),
                u.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + u.getRole().toUpperCase()))
        );
    }
}
