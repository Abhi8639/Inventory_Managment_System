import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderPage.css';

function OrderPage() {
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    mobileNo: '',
    address: '',
    zipcode: '',
  });

  const [orderItems, setOrderItems] = useState([{ productId: '', productName: '', price: 0, quantity: 1 }]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('/api/products')
      .then(response => {
        console.log('Products fetched:', response.data);
        setProducts(response.data); 
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleOrderItemChange = (index, field, value) => {
    const updatedItems = [...orderItems];

    if (field === 'productId') {
      const selectedProduct = products.find(product => product.productId === value);
      if (selectedProduct) {
        updatedItems[index] = {
          ...updatedItems[index],
          productId: selectedProduct.productId,
          productName: selectedProduct.name,
          price: selectedProduct.price, 
        };
      } else {
        updatedItems[index].productId = '';
        updatedItems[index].productName = '';
        updatedItems[index].price = 0;
      }
    } else if (field === 'quantity') {
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: parseInt(value, 10),
      };
    }

    setOrderItems(updatedItems);
  };

  const addProductRow = () => {
    setOrderItems([...orderItems, { productId: '', productName: '', price: 0, quantity: 1 }]);
  };

  const removeProductRow = (index) => {
    const updatedItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedItems);
  };

  const calculateTotalPrice = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const invalidItems = orderItems.filter(item => !item.productId);
    if (invalidItems.length > 0) {
      alert('Please select a valid product for all order items.');
      return;
    }
  
    
    const orderData = { ...customerInfo, orderItems };
    console.log('Order Data:', orderData);
  

    axios.post('/api/orders', orderData)
      .then(response => {
        console.log('Order placed successfully:', response.data);
        setCustomerInfo({ email: '', mobileNo: '', address: '', zipcode: '' });
        setOrderItems([{ productId: '', productName: '', price: 0, quantity: 1 }]);
      })
      .catch(error => console.error('Error placing order:', error));
  };
  

  return (
    <div className="order-page-container">
      <h1 className="order-page-title">Place Your Order</h1>
      <form onSubmit={handleSubmit} className="order-page-form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={handleCustomerInfoChange}
            required
            className="order-page-input"
          />
        </div>
        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobileNo"
            value={customerInfo.mobileNo}
            onChange={handleCustomerInfoChange}
            required
            className="order-page-input"
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={customerInfo.address}
            onChange={handleCustomerInfoChange}
            required
            className="order-page-input"
          />
        </div>
        <div>
          <label>Zipcode:</label>
          <input
            type="text"
            name="zipcode"
            value={customerInfo.zipcode}
            onChange={handleCustomerInfoChange}
            required
            className="order-page-input"
          />
        </div>

        <h2>Order Items</h2>
        {orderItems.map((item, index) => (
          <div key={index} className="order-items-section">
            <select
              value={item.productId}
              onChange={(e) => handleOrderItemChange(index, 'productId', e.target.value)}
              required
              className="order-page-input"
            >
              <option value="">Select Product</option>
              {products && Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.name}
                  </option>
                ))
              ) : (
                <option disabled>No products available</option>
              )}
            </select>

            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleOrderItemChange(index, 'quantity', e.target.value)}
              min="1"
              required
              className="order-page-input"
            />

            <div className="price-display">
              Price: £{calculateTotalPrice(item)}
            </div>

            {index > 0 && (
              <button
                type="button"
                onClick={() => removeProductRow(index)}
                className="remove-button"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addProductRow}
          className="add-product-button"
        >
          Add Another Product
        </button>

        <div>
          <button type="submit" className="order-page-button">Submit Order</button>
        </div>
      </form>
    </div>
  );
}

export default OrderPage;
