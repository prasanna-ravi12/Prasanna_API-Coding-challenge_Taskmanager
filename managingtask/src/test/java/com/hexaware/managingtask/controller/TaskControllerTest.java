package com.hexaware.managingtask.controller;

import com.hexaware.managingtask.entity.Task;
import com.hexaware.managingtask.entity.Task.Priority;
import com.hexaware.managingtask.entity.Task.Status;
import com.hexaware.managingtask.service.TaskService;

import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TaskControllerTest {

    @InjectMocks
    private Taskcontroller taskController;

    @Mock
    private TaskService taskService;  // ✅ FIXED: mock the service, not the repo

    private Task sampleTask;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        sampleTask = new Task("Test Task", "This is a test", LocalDate.now().plusDays(1), Priority.HIGH, Status.PENDING);
        sampleTask.setId(1L);
    }

    @Test
    public void testAddTask() {
        when(taskService.addTask(any(Task.class))).thenReturn(sampleTask);

        ResponseEntity<Task> response = taskController.addTask(sampleTask);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals("Test Task", response.getBody().getTitle());
    }

    @Test
    public void testGetAllTasks() {
        List<Task> tasks = List.of(sampleTask);
        when(taskService.getAllTasks()).thenReturn(tasks);

        ResponseEntity<List<Task>> response = taskController.getAllTasks();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
    }

    @Test
    public void testGetTaskByIdFound() {
        when(taskService.getTaskById(1L)).thenReturn(Optional.of(sampleTask));

        ResponseEntity<Task> response = taskController.getTaskById(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Test Task", response.getBody().getTitle());
    }

    @Test
    public void testGetTaskByIdNotFound() {
        when(taskService.getTaskById(2L)).thenReturn(Optional.empty());

        ResponseEntity<Task> response = taskController.getTaskById(2L);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    public void testUpdateTaskFound() {
        Task updatedTask = new Task("Updated Task", "Updated description", LocalDate.now().plusDays(2), Priority.MEDIUM, Status.IN_PROGRESS);
        updatedTask.setId(1L);

        when(taskService.updateTask(eq(1L), any(Task.class))).thenReturn(Optional.of(updatedTask));

        ResponseEntity<Task> response = taskController.updateTask(1L, updatedTask);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Updated Task", response.getBody().getTitle());
    }

    @Test
    public void testUpdateTaskNotFound() {
        Task updatedTask = sampleTask;
        when(taskService.updateTask(eq(99L), any(Task.class))).thenReturn(Optional.empty());

        ResponseEntity<Task> response = taskController.updateTask(99L, updatedTask);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    public void testDeleteTaskFound() {
        when(taskService.deleteTask(1L)).thenReturn(Optional.of(sampleTask));

        ResponseEntity<Task> response = taskController.deleteTask(1L);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    public void testDeleteTaskNotFound() {
        when(taskService.deleteTask(99L)).thenReturn(Optional.empty());

        ResponseEntity<Task> response = taskController.deleteTask(99L);

        assertEquals(404, response.getStatusCodeValue());
    }
}
