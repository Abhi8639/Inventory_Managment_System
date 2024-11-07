package com.Inventory.Management.System.service;

import java.sql.Timestamp;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Inventory.Management.System.model.User;
import com.Inventory.Management.System.model.Warehouse;
import com.Inventory.Management.System.repository.UserRepository;
import com.Inventory.Management.System.repository.WarehouseRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user, String warehouseId) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        
        user.setAccountStatus("Active");

        Optional<Warehouse> warehouseOptional = warehouseRepository.findById(warehouseId);
        if (warehouseOptional.isPresent()) {
            user.setWarehouse(warehouseOptional.get());
        } else {
            throw new RuntimeException("Invalid Warehouse ID");
        }

        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}

