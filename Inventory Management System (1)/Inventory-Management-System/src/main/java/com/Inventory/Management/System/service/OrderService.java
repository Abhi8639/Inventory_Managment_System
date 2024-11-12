package com.Inventory.Management.System.service;

import com.Inventory.Management.System.model.Order;

import com.Inventory.Management.System.model.OrderItem;
import com.Inventory.Management.System.repository.OrderRepository;
import com.Inventory.Management.System.repository.OrderItemRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Transactional
    public Order createOrder(Order order) {
        try {
            if (order == null || order.getOrderItems() == null || order.getOrderItems().isEmpty()) {
                throw new IllegalArgumentException("Order or order items cannot be null or empty");
            }

            System.out.println("Saving Order: " + order);

            Order savedOrder = orderRepository.save(order);
            System.out.println("Order saved with ID: " + savedOrder.getOrderId());

            for (OrderItem item : order.getOrderItems()) {
                if (item.getProductId() == null) {
                    throw new IllegalArgumentException("Invalid product in order item.");
                }
                item.setOrder(savedOrder);
                System.out.println("Saving OrderItem with Product ID: " + item.getProductId());

                orderItemRepository.save(item);
            }

            return savedOrder;

        } catch (Exception e) {
            e.printStackTrace(); 
            throw new RuntimeException("Error saving the order", e);
        }
    }
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

}
