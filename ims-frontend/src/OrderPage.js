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

  const [zipSuggestions, setZipSuggestions] = useState([]);
  const [orderItems, setOrderItems] = useState([
    { productId: '', productName: '', price: 0, quantity: 1, error: '' }
  ]);
  const [products, setProducts] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('http://localhost:8080/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });

    if (name === 'zipcode' && value.length >= 3) {
      fetchZipSuggestions(value);
    }
  };

  const fetchZipSuggestions = (input) => {
    axios
      .get(`http://localhost:8080/api/places?input=${input}`)
      .then(response => {
        const { predictions, status } = response.data;

        if (status !== 'OK') {
          console.error('Backend Places API Error:', response.data.error_message || status);
          return;
        }

        const suggestions = predictions.map(prediction => ({
          id: prediction.place_id,
          text: prediction.description,
        }));
        setZipSuggestions(suggestions);
      })
      .catch(error => {
        console.error('Error fetching zip suggestions from backend:', error.response?.data || error.message);
      });
  };

  const handleZipSelect = (suggestion) => {
    const zipcodeMatch = suggestion.text.match(/\b\d{5}(-\d{4})?\b/); 

    if (zipcodeMatch) {
      const zipcode = zipcodeMatch[0];
      setCustomerInfo((prevInfo) => ({ ...prevInfo, zipcode }));
    }

    setZipSuggestions([]);
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
          error: '',
        };
      } else {
        updatedItems[index].productId = '';
        updatedItems[index].productName = '';
        updatedItems[index].price = 0;
      }
    } else if (field === 'quantity') {
      const selectedProduct = products.find(product => product.productId === updatedItems[index].productId);
      const quantity = parseInt(value, 10);

      if (selectedProduct && quantity > selectedProduct.overallQuantity) {
        updatedItems[index].error = `Only ${selectedProduct.overallQuantity} items in stock`;
      } else {
        updatedItems[index].error = '';
      }

      updatedItems[index] = {
        ...updatedItems[index],
        quantity: quantity,
      };
    }

    setOrderItems(updatedItems);
  };

  const addProductRow = () => {
    setOrderItems([...orderItems, { productId: '', productName: '', price: 0, quantity: 1, error: '' }]);
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

    const invalidItems = orderItems.filter(item => !item.productId || item.error);
    if (invalidItems.length > 0) {
      alert('Please resolve errors in order items.');
      return;
    }

    const orderData = { ...customerInfo, orderItems };

    axios
      .post('http://localhost:8080/api/orders', orderData)
      .then(() => {
        setCustomerInfo({ email: '', mobileNo: '', address: '', zipcode: '' });
        setOrderItems([{ productId: '', productName: '', price: 0, quantity: 1, error: '' }]);
        setShowSuccessPopup(true); // Show success popup
      })
      .catch(error => console.error('Error placing order:', error));
  };

  const closePopup = () => {
    setShowSuccessPopup(false); // Close the popup
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
          {zipSuggestions.length > 0 && (
            <ul className="zip-suggestions">
              {zipSuggestions.map(suggestion => (
                <li
                  key={suggestion.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZipSelect(suggestion);
                  }}
                  className="zip-suggestion-item"
                >
                  {suggestion.text}
                </li>
              ))}
            </ul>
          )}
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
              {products.map(product => (
                <option key={product.productId} value={product.productId}>
                  {product.name}
                </option>
              ))}
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

            {item.error && (
              <div className="error-message">
                {item.error}
              </div>
            )}

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
          <button type="submit" className="order-page-button">
            Submit Order
          </button>
        </div>
      </form>

      {showSuccessPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <p>Order successfully submitted!</p>
            <button onClick={closePopup} className="close-popup-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
