import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Login from './Login';
import ProductManagement from './ProductManagement';
import OrderPage from './OrderPage';
import AllOrdersPage from './AllOrdersPage';
import WarehouseManagement from './WarehouseManagement';
import WarehouseStockPage from './WarehouseStockPage';
import StockDeductions from './StockDeductions';
import WarehouseLowStock from './WarehouseLowStock';
import Register from './Register';
import OrderStockPage from './OrderStockPage';
/**
 * The `App` component serves as the main entry point for the application.
 * It sets up routing for different pages using React Router and includes a shared navigation bar.
 */
function App() {
    return (
        <Router>
            <div className="App">
                <NavigationBar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/products" element={<ProductManagement />} />
                    <Route path="/order" element={<OrderPage />} />
                    <Route path="/allorders" element={<AllOrdersPage />} />
                    <Route path="/warehouses" element={<WarehouseManagement />} />
                    <Route path="/stock" element={<WarehouseStockPage />} />
                    <Route path="/warehouseorder" element={<StockDeductions />} />
                    <Route path="/lowstock" element={<WarehouseLowStock />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/orderstock" element={<OrderStockPage />} />


                    <Route path="/" element={<OrderPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
