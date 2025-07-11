package com.hexaware.managingtask.entity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface userRepo extends JpaRepository<user, String> {
	Optional<user> findById(String email);

}
