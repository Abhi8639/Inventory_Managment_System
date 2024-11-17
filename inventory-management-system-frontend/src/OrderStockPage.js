import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderStockPage.css';
import { useNavigate } from 'react-router-dom';

function OrderStockPage() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [newQuantity, setNewQuantity] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigate = useNavigate();
    const warehouseId = localStorage.getItem('warehouseId'); 
  
    useEffect(() => {
        if (warehouseId) {
            fetchProducts();
        } else {
            console.error("Warehouse ID not found in localStorage.");
            setErrorMessage("Warehouse ID not available. Please log in again.");
            navigate('/login'); 
        }
    }, [warehouseId, navigate]);
  
    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            if (response.data && Array.isArray(response.data)) {
                setProducts(response.data);
                setErrorMessage('');
            } else {
                console.error("Unexpected response format:", response);
                setErrorMessage("Failed to retrieve products. Please try again later.");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setErrorMessage("Error fetching products. Please check the server connection.");
        }
    };
  
    const addOrUpdateStockQuantity = async () => {
        try {
            const response = await axios.post(`/api/stock/addOrUpdate`, {
                productId: selectedProductId,
                warehouseId: warehouseId,
                quantity: newQuantity,
            }); 
            if (response.status === 200) {
                setSuccessMessage('Stock added/updated successfully!');
                setNewQuantity('');
                setSelectedProductId('');
                fetchProducts(); 
            }
        } catch (error) {
            console.error("Error adding/updating stock:", error);
            setErrorMessage("Failed to add/update stock. Please try again.");
        }
    };
  
    return (
        <div className="warehouse-stock">
            <h2>Order Stock</h2>
  
            {errorMessage && <p className="error-message">{errorMessage}</p>}
  
            {products.length > 0 && (
                <div className="update-section">
                    <label>Product Name:</label>
                    <select
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                    >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                            <option key={product.productId} value={product.productId}>
                                {product.name}
                            </option>
                        ))}
                    </select>
  
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        placeholder="Enter new quantity"
                    />
                    <button onClick={addOrUpdateStockQuantity}>Order Stock</button>
                </div>
            )}
  
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
}

export default OrderStockPage;
