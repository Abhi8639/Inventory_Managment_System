package com.Inventory.Management.System.service;

import com.Inventory.Management.System.model.Product;
import com.Inventory.Management.System.model.Stock;
import com.Inventory.Management.System.model.Warehouse;
import com.Inventory.Management.System.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getProductsByWarehouse(String warehouseId) {
        // Retrieve the list of stocks for the specified warehouse
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

    @Transactional
    public Stock addOrUpdateStock(String productId, String warehouseId, int quantity) {
        List<Stock> stockList = stockRepository.findByProductProductIdAndWarehouseWarehouseId(productId, warehouseId);
        Stock stock;

        if (!stockList.isEmpty()) {
            // Update the existing stock quantity
            stock = stockList.get(0);
            stock.setQuantity(stock.getQuantity() + quantity);
        } else {
            // Create a new stock entry
            stock = new Stock();

            // Set Product and Warehouse for the new Stock
            Product product = new Product();
            product.setProductId(productId);
            stock.setProduct(product);

            Warehouse warehouse = new Warehouse();
            warehouse.setWarehouseId(warehouseId);
            stock.setWarehouse(warehouse);

            stock.setQuantity(quantity);
        }
        return stockRepository.save(stock);
    }
}
