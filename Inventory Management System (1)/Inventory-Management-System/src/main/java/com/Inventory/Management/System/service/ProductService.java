package com.Inventory.Management.System.service;

import com.Inventory.Management.System.model.Product;
import com.Inventory.Management.System.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    public Product addProduct(Product product) {
        Product savedProduct = productRepository.save(product);
        System.out.println("Product added: " + savedProduct);
        return savedProduct;
    }

    public Product updateOverallQuantity(String productId, int quantity) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setOverallQuantity(product.getOverallQuantity() + quantity);
        Product updatedProduct = productRepository.save(product);
        System.out.println("Product quantity updated: " + updatedProduct);
        return updatedProduct;
    }

    public Product updateProductDetails(String productId, Product productDetails) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setOverallQuantity(productDetails.getOverallQuantity());
        Product updatedProduct = productRepository.save(product);
        System.out.println("Product updated: " + updatedProduct);
        return updatedProduct;
    }

    
    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();
        System.out.println("Fetched products: " + products);  
        return products;
    }

    public void deleteProduct(String productId) {
        productRepository.deleteById(productId);
        System.out.println("Product deleted with ID: " + productId);
    }
}
