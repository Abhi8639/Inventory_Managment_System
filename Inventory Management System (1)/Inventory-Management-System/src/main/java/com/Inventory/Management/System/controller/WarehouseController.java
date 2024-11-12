package com.Inventory.Management.System.controller;

import com.Inventory.Management.System.model.Warehouse;
import com.Inventory.Management.System.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warehouses")
public class WarehouseController {

    @Autowired
    private WarehouseService warehouseService;

    @PostMapping("/add")
    public Warehouse addWarehouse(@RequestBody Warehouse warehouse) {
        return warehouseService.addWarehouse(warehouse);
    }

    @GetMapping
    public List<Warehouse> getAllWarehouses() {
        return warehouseService.getAllWarehouses();
    }

    @PutMapping("/update/{warehouseId}")
    public Warehouse updateWarehouse(@PathVariable("warehouseId") String warehouseId, @RequestBody Warehouse warehouseDetails) {
        return warehouseService.updateWarehouse(warehouseId, warehouseDetails);
    }

    @DeleteMapping("/delete/{warehouseId}")
    public ResponseEntity<Void> deleteWarehouse(@PathVariable("warehouseId") String warehouseId) {
        warehouseService.deleteWarehouse(warehouseId);
        return ResponseEntity.ok().build();
    }
}
