//package com.hexaware.QuitQ.controller;
//
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.*;
//import org.springframework.web.bind.annotation.*;
//
//import com.hexaware.QuitQ.entity.user;
//import com.hexaware.QuitQ.entity.userRepo;
//
//@RestController
//@RequestMapping("/api/users")
//public class UserRestController {
//
//    @Autowired
//    private userRepo repo;
//
//    @PostMapping
//    public ResponseEntity<user> createUser(@RequestBody user newUser) {
//        if (repo.existsById(newUser.getEmail())) {
//            return new ResponseEntity<>(HttpStatus.CONFLICT);
//        }
//        repo.save(newUser);
//        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<user>> getAllUsers() {
//        return new ResponseEntity<>(repo.findAll(), HttpStatus.OK);
//    }
//
//    @GetMapping("/{email}")
//    public ResponseEntity<user> getUser(@PathVariable String email) {
//        Optional<user> u = repo.findById(email);
//        if (u.isPresent()) {
//            return new ResponseEntity<>(u.get(), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//    
//    
//
//
//    @PutMapping("/{email}")
//    public ResponseEntity<user> updateUser(@PathVariable String email, @RequestBody user updatedUser) {
//        Optional<user> existingUser = repo.findById(email);
//        if (existingUser.isPresent()) {
//            updatedUser.setEmail(email); 
//            repo.save(updatedUser);
//            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @DeleteMapping("/{email}")
//    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
//        if (repo.existsById(email)) {
//            repo.deleteById(email);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//}
package com.hexaware.managingtask.controller;

import com.hexaware.managingtask.config.JwtUtil;
import com.hexaware.managingtask.dto.AuthResponse;
import com.hexaware.managingtask.dto.LoginRequest;
import com.hexaware.managingtask.entity.user;
import com.hexaware.managingtask.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserRestController {

    @Autowired
    private UserService service;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<user> createUser(@RequestBody user newUser) {
        if (service.userExists(newUser.getEmail())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        user created = service.createUser(newUser);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            if (auth.isAuthenticated()) {
                user u = service.getUserByEmail(request.getEmail()).orElseThrow();
                String token = jwtUtil.generateToken(u.getEmail(), u.getRole());
                return ResponseEntity.ok(new AuthResponse(token, u.getRole()));
            }
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    

    @GetMapping
    public ResponseEntity<List<user>> getAllUsers() {
        return new ResponseEntity<>(service.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity<user> getUser(@PathVariable String email) {
        Optional<user> u = service.getUserByEmail(email);
        return u.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{email}")
    public ResponseEntity<user> updateUser(@PathVariable String email, @RequestBody user updatedUser) {
        if (service.userExists(email)) {
            user updated = service.updateUser(email, updatedUser);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        if (service.deleteUser(email)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
