package com.Inventory.Management.System.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Inventory.Management.System.model.Product;
import com.Inventory.Management.System.model.Stock;
import com.Inventory.Management.System.model.Warehouse;
import com.Inventory.Management.System.repository.StockRepository;

import jakarta.transaction.Transactional;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getProductsByWarehouse(String warehouseId) {
        return stockRepository.findByWarehouseWarehouseId(warehouseId);
    }

    public Stock getStock(String productId, String warehouseId) {
        List<Stock> stockList = stockRepository.findByProductProductIdAndWarehouseWarehouseId(productId, warehouseId);
        return stockList.isEmpty() ? null : stockList.get(0);
    }

    @Transactional
    public Stock updateStockQuantity(String productId, String warehouseId, int newQuantity) {
        Stock stock = getStock(productId, warehouseId);
        if (stock != null) {
            stock.setQuantity(newQuantity);
            return stockRepository.save(stock);
        }
        return null;
    }

    @Transactional
    public Stock addOrUpdateStock(String productId, String warehouseId, int quantity) {
        Stock stock = getStock(productId, warehouseId);

        if (stock != null) {
            stock.setQuantity(stock.getQuantity() + quantity);
        } else {
            stock = new Stock();

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
