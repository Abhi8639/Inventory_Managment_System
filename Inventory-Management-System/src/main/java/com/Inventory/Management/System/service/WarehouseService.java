package com.Inventory.Management.System.service;

import com.Inventory.Management.System.model.Warehouse;
import com.Inventory.Management.System.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseService {

    @Autowired
    private WarehouseRepository warehouseRepository;

    public Warehouse addWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    public Warehouse updateWarehouse(String warehouseId, Warehouse warehouseDetails) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId)
            .orElseThrow(() -> new RuntimeException("Warehouse with ID: " + warehouseId + " not found"));
        warehouse.setLocation(warehouseDetails.getLocation());
        warehouse.setCapacity(warehouseDetails.getCapacity());
        warehouse.setZipcode(warehouseDetails.getZipcode()); 
        return warehouseRepository.save(warehouse);
    }

    public void deleteWarehouse(String warehouseId) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId)
            .orElseThrow(() -> new RuntimeException("Warehouse with ID: " + warehouseId + " not found"));
        warehouseRepository.delete(warehouse);
    }
}
