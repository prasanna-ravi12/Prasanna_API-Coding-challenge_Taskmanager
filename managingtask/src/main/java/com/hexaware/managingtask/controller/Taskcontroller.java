package com.hexaware.managingtask.controller;

import com.hexaware.managingtask.entity.Task;
import com.hexaware.managingtask.entity.TaskRepo;
import com.hexaware.managingtask.service.TaskService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class Taskcontroller {

	@Autowired
	private TaskService taskService;
	
	 @Autowired
	    private TaskRepo taskRepo;

	@PostMapping
	public ResponseEntity<Task> addTask(@Valid @RequestBody Task task) {
	    Task savedTask = taskService.addTask(task);
	    return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<Task>> getAllTasks() {
	    return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
	    Optional<Task> taskOptional = taskService.getTaskById(id);
	    if (taskOptional.isPresent()) {
	        return new ResponseEntity<>(taskOptional.get(), HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}

	@PutMapping("/{id}")
	public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody Task task) {
	    Optional<Task> updatedTask = taskService.updateTask(id, task);
	    if (updatedTask.isPresent()) {
	        return new ResponseEntity<>(updatedTask.get(), HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Task> deleteTask(@PathVariable Long id) {
	    Optional<Task> deletedTask = taskService.deleteTask(id);
	    if (deletedTask.isPresent()) {
	        return new ResponseEntity<>(deletedTask.get(), HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
	@GetMapping("/api/tasks/user")
	public ResponseEntity<List<Task>> getTasksForUser() {
	    String email = SecurityContextHolder.getContext().getAuthentication().getName(); // from JWT
	    return ResponseEntity.ok(taskRepo.findByEmail(email));
	}

	}