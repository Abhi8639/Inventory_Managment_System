import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('login') === 'true';
  const userRole = localStorage.getItem('role'); 
  const handleLogout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('role');
    navigate('/login');  
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">IMS</Link>
      </div>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            {userRole === 'Admin' && (
              <>
              <Link to="/allorders">All Orders</Link>
                <Link to="/products">Product Management</Link>
                <Link to="/warehouses">Warehouse Management</Link>
                <Link to="/register">Register</Link>
          
              </>
            )}
            {userRole === 'Manager' && (
              <>
              <Link to="/warehouse-stock">Warehouse Stock Management</Link>
              <Link to="/stockorder">Order Stock </Link>
              <Link to="/stockdeductions">Orders </Link>
              <Link to="/warehouse-low-stock">Low Stock Products</Link>
              </>
            )}
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/orders">Order Management</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
