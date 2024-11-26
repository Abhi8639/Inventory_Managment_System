import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  const navigate = useNavigate();

  // Determines if the user is logged in by checking localStorage
  const isLoggedIn = localStorage.getItem('login') === 'true';
  
  // Retrieves the user's role from localStorage for role-based navigation
  const role = localStorage.getItem('role'); 
  
  /**
   * Handles the logout functionality by clearing the login state
   * and redirecting the user to the login page.
   */
    const handleLogout = () => {
        localStorage.removeItem('login'); // Clears login status
        localStorage.removeItem('role'); // Clears user role
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="navbar">
            <h1>IMS</h1>
            <div className="nav-links">
                {/* Links based on login status */}
                {isLoggedIn ? (
                    <>
                        {/* Links for Admin */}
                        {role === 'Admin' && (
                            <>
                                <Link to="/products">Manage Products</Link>
                                <Link to="/warehouses">Manage Warehouses</Link>
                                <Link to="/allorders">All Orders</Link>
                                <Link to="/register">Register</Link>


                            </>
                        )}

                        {/* Links for Manager */}
                        {role === 'Manager' && (
                            <>
                                <Link to="/stock">Manage Stock</Link>
                                <Link to="/orderstock">Order Stock</Link>
                                <Link to="/warehouseorder">Orders </Link>
                                <Link to="/lowstock">Low Stock Products </Link>

                            </>
                        )}

                        {/* Logout link */}
                        {role && (
                            <>
                                <button onClick={handleLogout} className="logout-btn">Logout</button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <>
                            <Link to="/login">Login</Link>
                        </>
                        <>
                            <Link to="/order">Order</Link>
                        </>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavigationBar;
