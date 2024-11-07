import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate  = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', 
                { email, password }, 
                { 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            
            if (response.data.login === "true") {
                
localStorage.setItem('login', 'true');
localStorage.setItem('role', response.data.role); 
localStorage.setItem('warehouseId', response.data.warehouseId);



if (response.data.role === 'Admin') {
    navigate('/products');  
} else if (response.data.role === 'Manager') {
    navigate('/warehouse-stock'); 
} else {
    navigate('/orders');  
}

            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
    <form onSubmit={handleLogin}>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                required 
            />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                required 
            />
        </div>
        <button type="submit" className="submit-btn">Login</button>
    </form>
</div>

    );
}

export default Login;
