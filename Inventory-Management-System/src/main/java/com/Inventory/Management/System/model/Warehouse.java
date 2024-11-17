package com.Inventory.Management.System.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "warehouses")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class Warehouse {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_id", nullable = false, unique = true)
    private String warehouseId;

    private String location;
    private int capacity;
    private String zipcode;
    @JsonIgnore
    @OneToMany(mappedBy = "warehouse")
    
    private Set<Stock> stocks;
    @JsonIgnore
    @OneToMany(mappedBy = "warehouse", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<User> users;  

    public Warehouse(String warehouseId2) {
    	this.warehouseId = warehouseId2;

    	
	}
    public Warehouse() {

    	
	}
	public String getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(String WarehouseId) {
        this.warehouseId = WarehouseId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Set<Stock> getStocks() {
        return stocks;
    }

    public void setStocks(Set<Stock> stocks) {
        this.stocks = stocks;
    }
    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }
}
