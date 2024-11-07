import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderPage from './OrderPage'; 
import ProductManagement from './ProductManagement';
import WarehouseManagement from './WarehouseManagement'; 
import WarehouseStockPage from './WarehouseStockPage'; 
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="navbar-spacer"></div> {/* Spacer div for navbar height */}

        <Routes>
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/warehouses" element={<WarehouseManagement />} />
          <Route path="/warehouse-stock" element={<WarehouseStockPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<h1>Welcome! Please select a page.</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
