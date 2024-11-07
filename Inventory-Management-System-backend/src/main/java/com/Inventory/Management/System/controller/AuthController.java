package com.Inventory.Management.System.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.Inventory.Management.System.model.User;
import com.Inventory.Management.System.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://127.0.0.1:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder; 

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody Map<String, Object> userData) {
        String name = (String) userData.get("name");
        String email = (String) userData.get("email");
        String password = (String) userData.get("password");
        String role = (String) userData.get("role");
        String warehouseId = (String) userData.get("warehouseId");  

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        user.setAccountStatus("Active");

        User createdUser = userService.registerUser(user, warehouseId);
        return ResponseEntity.ok(createdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<User> userOptional = userService.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (passwordEncoder.matches(password, user.getPassword())) {
                String warehouseId = user.getWarehouse() != null ? user.getWarehouse().getWarehouseId() : null;

                Map<String, Object> response = Map.of(
                    "login", "true",
                    "role", user.getRole(),
                    "warehouseId", warehouseId  
                );

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    }
}
