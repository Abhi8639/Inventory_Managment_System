package com.Inventory.Management.System.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Inventory.Management.System.model.WarehouseStockDeduction;
import com.Inventory.Management.System.repository.WarehouseStockDeductionRepository;

import java.util.List;

@RestController
@RequestMapping("/api/stock-deductions")
public class StockDeductionController {
    @Autowired
    private WarehouseStockDeductionRepository warehouseStockDeductionRepository;

    @GetMapping("/warehouse/{warehouseId}")
    public List<WarehouseStockDeduction> getDeductionsByWarehouse(@PathVariable String warehouseId) {
        return warehouseStockDeductionRepository.findByWarehouseIdWithProductName(warehouseId);
    }
}
