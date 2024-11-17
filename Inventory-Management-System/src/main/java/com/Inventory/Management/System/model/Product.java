package com.Inventory.Management.System.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Set;

@Entity
@Table(name = "products")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false, unique = true)
    private String productId;
    private String name;
    private double price;
    private int overall_quantity; 
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private Set<Stock> stocks;
    public Product() {}
    public Product(String productId2) {
		this.productId=productId2;
	}

	public String getProductId() {
        return productId;
    }

    public void setProductId(String Product_id) {
        this.productId = Product_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getOverallQuantity() {
        return overall_quantity;
    }

    public void setOverallQuantity(int overall_quantity) {
        this.overall_quantity = overall_quantity;
    }

    public Set<Stock> getStocks() {
        return stocks;
    }

    public void setStocks(Set<Stock> stocks) {
        this.stocks = stocks;
    }
    @Override
    public String toString() {
        return "Product{" +
                "productId='" + productId + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", overallQuantity=" + overall_quantity +
                '}';
    }
}
