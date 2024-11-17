import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './WarehouseStockPage.css';

function WarehouseLowStock() {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  const warehouseId = localStorage.getItem('warehouseId'); 

  useEffect(() => {
    if (warehouseId) {
      fetchLowStockProducts();
    } else {
      console.error("Warehouse ID not found in localStorage.");
      setErrorMessage("Warehouse ID not available. Please log in again.");
      navigate('/login'); 
    }
  }, [warehouseId, navigate]);

  const fetchLowStockProducts = async () => {
    try {
      console.log(`Fetching products with low stock for warehouse ID: ${warehouseId}`);
      const response = await axios.get(`/api/stock/warehouse/${warehouseId}`);
      
      if (response.data && Array.isArray(response.data)) {
        const lowStock = response.data.filter((product) => product.quantity < 10);
        setLowStockProducts(lowStock);
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

  return (
    <div className="warehouse-stock">
      <h2>Low Stock Products</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {lowStockProducts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Available Stock</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((product) => (
              <tr key={product.stockId}>
                <td>{product.product.name}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>All products have sufficient stock in this warehouse.</p>
      )}
    </div>
  );
}

export default WarehouseLowStock;
