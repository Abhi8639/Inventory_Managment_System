import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Register.css'

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warehouses, setWarehouses] = useState([]); 
    const [selectedWarehouse, setSelectedWarehouse] = useState('');  
    const [role, setRole] = useState('Manager');  

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await axios.get('/api/warehouses');
                setWarehouses(response.data); 
            } catch (error) {
                console.error('Error fetching warehouses:', error);
            }
        };

        fetchWarehouses();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/register', 
                { name, email, password, warehouseId: selectedWarehouse, role },  
                { 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
            alert('Registration successful');
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleRegister} className="register-container">
            <h1>Register</h1>
            
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your name" 
                    required 
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                    required 
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password" 
                    required 
                />
            </div>

            <div className="form-group">
                <label htmlFor="role">Select Role</label>
                <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    required
                >
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            
            <div className="form-group">
                <label htmlFor="warehouse">Select Warehouse</label>
                <select 
                    value={selectedWarehouse} 
                    onChange={(e) => setSelectedWarehouse(e.target.value)} 
                    required
                >
                    <option value="">Select Warehouse</option>
                    {warehouses.map((warehouse) => (
                        <option key={warehouse.warehouseId} value={warehouse.warehouseId}>
                            {warehouse.location}
                        </option>
                    ))}
                </select>
            </div>
            
            <button type="submit" className="submit-btn">Register</button>
        </form>
    );
}

export default Register;
