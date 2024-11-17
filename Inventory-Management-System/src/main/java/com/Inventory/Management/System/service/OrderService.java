package com.Inventory.Management.System.service;

import com.Inventory.Management.System.model.Order;


import com.Inventory.Management.System.model.OrderItem;
import com.Inventory.Management.System.model.Stock;
import com.Inventory.Management.System.model.Warehouse;
import com.Inventory.Management.System.model.WarehouseStockDeduction;
import com.Inventory.Management.System.repository.OrderRepository;
import com.Inventory.Management.System.repository.WarehouseRepository;
import com.Inventory.Management.System.repository.WarehouseStockDeductionRepository;
import com.Inventory.Management.System.repository.OrderItemRepository;

import java.time.LocalDateTime;
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
    @Autowired
    private StockService stockService;

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Autowired
    private LocationService locationService;
    
    @Autowired
    private WarehouseStockDeductionRepository warehouseStockDeductionRepository;
    
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
            processOrder(savedOrder);
            return savedOrder;

        } catch (Exception e) {
            e.printStackTrace(); 
            throw new RuntimeException("Error saving the order", e);
        }
    }
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    @Transactional
    public void processOrder(Order order) {
        String orderZipcode = order.getZipcode();

        List<Warehouse> allWarehouses = warehouseRepository.findAll();
        List<Warehouse> sortedWarehouses = locationService.getWarehousesByProximity(orderZipcode, allWarehouses);

        for (OrderItem item : order.getOrderItems()) {
            int requiredQuantity = item.getQuantity();
            String productId = item.getProductId();

            for (Warehouse warehouse : sortedWarehouses) {
                if (requiredQuantity <= 0) break;

                Stock stock = stockService.getStock(productId, warehouse.getWarehouseId());

                if (stock != null && stock.getQuantity() > 0) {
                    int allocatedQuantity = Math.min(stock.getQuantity(), requiredQuantity);

                    stockService.updateStockQuantity(productId, warehouse.getWarehouseId(), stock.getQuantity() - allocatedQuantity);
                    
                    WarehouseStockDeduction deduction = new WarehouseStockDeduction();
                    deduction.setOrderId(order.getOrderId());
                    deduction.setProductId(productId);
                    deduction.setWarehouseId(warehouse.getWarehouseId());
                    deduction.setQuantityDeducted(allocatedQuantity);
                    deduction.setDeductionTimestamp(LocalDateTime.now());

                    warehouseStockDeductionRepository.save(deduction);

                    requiredQuantity -= allocatedQuantity;
                }
            }

            if (requiredQuantity > 0) {
                throw new RuntimeException("Insufficient stock to fulfill order for product ID: " + productId);
            }
        }
    }
}
