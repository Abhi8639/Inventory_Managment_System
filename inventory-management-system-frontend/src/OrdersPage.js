import React, { useEffect, useState } from "react";
import axios from "axios";
import './OrdersPage.css';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersResponse = await axios.get("/api/orders");
                setOrders(Array.isArray(ordersResponse.data) ? ordersResponse.data : []);
            } catch (err) {
                setError("Error fetching orders");
            }
        };

        const fetchProducts = async () => {
            try {
                const productsResponse = await axios.get("/api/products");
                setProducts(productsResponse.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchOrders(), fetchProducts()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const getProductName = (productId) => {
        const product = products.find((p) => p.productId === productId);
        return product ? product.name : "Unknown Product";
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="orders-page">
            <h1>Order Details</h1>
            <div className="order-grid">
                {orders.map((order) => (
                    <div key={order.orderId} className="order-card">
                        <h2>Order ID: {order.orderId}</h2>
                        <p>Email: {order.email}</p>
                        <p>Mobile No: {order.mobileNo}</p>
                        <p>Address: {order.address}</p>
                        <p>Zipcode: {order.zipcode}</p>

                        <h3>Ordered Items:</h3>
                        <ul>
                            {order.orderItems.map((item) => (
                                <li key={item.orderItemId}>
                                    Product Name: {getProductName(item.productId)}, Quantity: {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
