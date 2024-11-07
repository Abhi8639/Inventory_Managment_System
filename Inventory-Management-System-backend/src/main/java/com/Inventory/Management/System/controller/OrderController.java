package com.Inventory.Management.System.controller;

import com.Inventory.Management.System.model.*;
import com.Inventory.Management.System.model.OrderItem;
import com.Inventory.Management.System.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            System.out.println("Received Order: " + order);
            Order savedOrder = orderService.createOrder(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the order");
        }
    }
}
