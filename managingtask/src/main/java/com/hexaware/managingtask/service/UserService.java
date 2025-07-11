package com.hexaware.managingtask.service;

import com.hexaware.managingtask.entity.user;

import java.util.List;
import java.util.Optional;

public interface UserService {
    user createUser(user newUser);
    List<user> getAllUsers();
    Optional<user> getUserByEmail(String email);
    user updateUser(String email, user updatedUser);
    boolean deleteUser(String email);
    boolean userExists(String email);
}
