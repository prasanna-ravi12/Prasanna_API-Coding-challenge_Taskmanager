package com.hexaware.managingtask.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<Task, Long>{
	List<Task> findByEmail(String email);

}