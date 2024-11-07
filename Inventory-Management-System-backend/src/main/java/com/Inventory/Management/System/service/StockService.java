package com.Inventory.Management.System.service;

import com.Inventory.Management.System.model.Product;

import com.Inventory.Management.System.model.Stock;
import com.Inventory.Management.System.repository.ProductRepository;
import com.Inventory.Management.System.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getProductsByWarehouse(String warehouseId) {
        return stockRepository.findByWarehouseWarehouseId(warehouseId);
    }

    @Transactional
    public Stock updateStockQuantity(String productId, String warehouseId, int newQuantity) {
        List<Stock> stockList = stockRepository.findByProductProductIdAndWarehouseWarehouseId(productId, warehouseId);
        if (!stockList.isEmpty()) {
            Stock stock = stockList.get(0); 
            stock.setQuantity(newQuantity);
            return stockRepository.save(stock);
        }
        return null;
    }
}