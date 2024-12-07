import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './WarehouseStockPage.css';

const StockDeductions = () => {
  const [deductions, setDeductions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const warehouseId = localStorage.getItem('warehouseId');

  useEffect(() => {
    if (warehouseId) {
      fetchDeductions();
    } else {
      console.error("Warehouse ID not found in localStorage.");
      setErrorMessage("Warehouse ID not available. Please log in again.");
      navigate('/login');
    }
  }, [warehouseId, navigate]);

  const fetchDeductions = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/stock-deductions/warehouse/${warehouseId}`);
      const sortedDeductions = response.data.sort((a, b) => {
        const numA = parseInt(a.orderId.replace(/\D/g, ''), 10);
        const numB = parseInt(b.orderId.replace(/\D/g, ''), 10);
        return numB - numA;
      });
      setDeductions(sortedDeductions);
      setErrorMessage('');
    } catch (error) {
      console.error("Error fetching stock deductions:", error);
      setErrorMessage("Error fetching stock deductions. Please check the server connection.");
    }
  };

  return (
    <div className="warehouse-stock">
      <h2>Stock Deductions</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {deductions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Quantity Deducted</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {deductions.map((deduction) => (
              <tr key={deduction.deductionId}>
                <td>{deduction.orderId}</td>
                <td>{deduction.product ? deduction.product.name : "N/A"}</td>
                <td>{deduction.quantityDeducted}</td>
                <td>{new Date(deduction.deductionTimestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No stock deductions recorded for this warehouse.</p>
      )}
    </div>
  );
};

export default StockDeductions;
