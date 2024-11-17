package com.Inventory.Management.System.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity

@Table(name = "warehousestockdeduction")
public class WarehouseStockDeduction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deduction_id", nullable = false, unique = true)
    private String deductionId;

    @Column(name = "order_id", nullable = false)
    private String orderId;

    @Column(name = "product_id", nullable = false)
    private String productId;

    @Column(name = "warehouse_id", nullable = false)
    private String warehouseId;

    @Column(name = "quantity_deducted", nullable = false)
    private int quantityDeducted;

    @Column(name = "deduction_timestamp", nullable = false)
    private LocalDateTime deductionTimestamp = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false, insertable = false, updatable = false)
    private Product product;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    public String getDeductionId() {
        return deductionId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(String warehouseId) {
        this.warehouseId = warehouseId;
    }

    public int getQuantityDeducted() {
        return quantityDeducted;
    }

    public void setQuantityDeducted(int quantityDeducted) {
        this.quantityDeducted = quantityDeducted;
    }

    public LocalDateTime getDeductionTimestamp() {
        return deductionTimestamp;
    }

    public void setDeductionTimestamp(LocalDateTime deductionTimestamp) {
        this.deductionTimestamp = deductionTimestamp;
    }
}
