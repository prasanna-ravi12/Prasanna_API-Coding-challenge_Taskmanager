package com.hexaware.managingtask.service;

import com.hexaware.managingtask.entity.user;

import com.hexaware.managingtask.entity.userRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

	

	
    @Autowired
    private userRepo repo;

//    @Override
//    public user createUser(user newUser) {
//        return repo.save(newUser);
//    }
    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public user createUser(user newUser) {
        newUser.setPassword(encoder.encode(newUser.getPassword())); // hash password
        return repo.save(newUser);
    }


    @Override
    public List<user> getAllUsers() {
        return repo.findAll();
    }

    @Override
    public Optional<user> getUserByEmail(String email) {
        return repo.findById(email);
    }

    @Override
    public user updateUser(String email, user updatedUser) {
        updatedUser.setEmail(email);
        return repo.save(updatedUser);
    }

    @Override
    public boolean deleteUser(String email) {
        if (repo.existsById(email)) {
            repo.deleteById(email);
            return true;
        }
        return false;
    }

    @Override
    public boolean userExists(String email) {
        return repo.existsById(email);
    }
}
