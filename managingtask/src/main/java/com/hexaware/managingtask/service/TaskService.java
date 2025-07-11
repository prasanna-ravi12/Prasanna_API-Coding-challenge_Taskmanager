package com.hexaware.managingtask.service;

import com.hexaware.managingtask.entity.Task;
import com.hexaware.managingtask.entity.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;

    public Task addTask(Task task) {
        return taskRepo.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepo.findById(id);
    }

    public Optional<Task> updateTask(Long id, Task task) {
        return taskRepo.findById(id).map(existingTask -> {
            task.setId(id);
            return taskRepo.save(task);
        });
    }

    public Optional<Task> deleteTask(Long id) {
        return taskRepo.findById(id).map(task -> {
            taskRepo.deleteById(id);
            return task;
        });
    }
}