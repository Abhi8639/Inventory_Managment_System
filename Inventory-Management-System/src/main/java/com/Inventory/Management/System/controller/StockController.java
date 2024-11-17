package com.Inventory.Management.System.controller;

import com.Inventory.Management.System.model.Stock;
import com.Inventory.Management.System.model.*;
import com.Inventory.Management.System.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping("/warehouse/{warehouseId}")
    public ResponseEntity<List<Stock>> getProductsByWarehouse(@PathVariable String warehouseId) {
        List<Stock> stocks = stockService.getProductsByWarehouse(warehouseId);
        return ResponseEntity.ok(stocks);
    }

    @PutMapping("/update")
    public ResponseEntity<Stock> updateStock(@RequestBody Map<String, Object> requestData) {
        String productId = (String) requestData.get("productId");
        String warehouseId = (String) requestData.get("warehouseId");
        
        Integer quantity;
        try {
            quantity = Integer.parseInt(requestData.get("quantity").toString());
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(null); 
        }

        Stock updatedStock = stockService.updateStockQuantity(productId, warehouseId, quantity);
        if (updatedStock != null) {
            return ResponseEntity.ok(updatedStock);
        }
        return ResponseEntity.badRequest().build();
    }
    @PostMapping("/addOrUpdate")
    public ResponseEntity<Stock> addOrUpdateStock(@RequestBody Map<String, Object> requestData) {
        String productId = (String) requestData.get("productId");
        String warehouseId = (String) requestData.get("warehouseId");
        Integer quantity;

        try {
            quantity = Integer.parseInt(requestData.get("quantity").toString());
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(null);
        }

        Stock stock = stockService.addOrUpdateStock(productId, warehouseId, quantity);
        if (stock != null) {
            return ResponseEntity.ok(stock);
        }
        return ResponseEntity.badRequest().build();
    }

}
