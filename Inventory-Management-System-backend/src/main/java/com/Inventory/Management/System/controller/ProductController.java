package com.Inventory.Management.System.controller;

import com.Inventory.Management.System.model.Product;
import com.Inventory.Management.System.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product createdProduct = productService.addProduct(product);
        return ResponseEntity.ok(createdProduct);
    }

    @PutMapping("/update-quantity/{productId}")
    public ResponseEntity<Product> updateOverallQuantity(@PathVariable String productId, @RequestParam int quantity) {
        Product updatedProduct = productService.updateOverallQuantity(productId, quantity);
        return ResponseEntity.ok(updatedProduct);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<Product> updateProductDetails(
        @PathVariable String productId, 
        @RequestBody Product productDetails
    ) {
        Product updatedProduct = productService.updateProductDetails(productId, productDetails);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok().build();
    }
}
