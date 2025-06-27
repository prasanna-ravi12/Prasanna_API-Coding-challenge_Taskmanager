package com.hexaware.managingtask.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() 
            .authorizeHttpRequests(auth -> auth
                // Allow USER and ADMIN to create task
                .requestMatchers(HttpMethod.POST, "/api/tasks").hasAnyRole("ADMIN", "USER")

                // Allow USER and ADMIN to update task by ID
                .requestMatchers(HttpMethod.PUT, "/api/tasks/{id}").hasAnyRole("ADMIN", "USER")

                // Allow USER and ADMIN to view task by ID
                .requestMatchers(HttpMethod.GET, "/api/tasks/{id}").hasAnyRole("ADMIN", "USER")

                // Only ADMIN can view all tasks or delete tasks
                .requestMatchers("/api/tasks/**").hasRole("ADMIN")

                // All other requests permitted (e.g. login page or test route)
                .anyRequest().permitAll()
            )
            .httpBasic(); 

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        var admin = User.withUsername("admin")
                .password(encoder.encode("admin123"))
                .roles("ADMIN")
                .build();

        var user = User.withUsername("user")
                .password(encoder.encode("user123"))
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(admin, user);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}