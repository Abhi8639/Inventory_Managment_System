import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductManagement.css';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, overallQuantity: 0 });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('/api/products')
      .then(response => {
        console.log('Products fetched:', response.data);
        const productsData = Array.isArray(response.data) ? response.data : [];
        setProducts(productsData);
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const addProduct = (e) => {
    e.preventDefault();
    axios.post('/api/products/add', newProduct)
      .then(() => {
        fetchProducts();
        setNewProduct({ name: '', price: 0, overallQuantity: 0 });
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const updateProductDetails = (e) => {
    e.preventDefault();
    axios.put(`/api/products/update/${editProduct.productId}`, editProduct)
      .then(() => {
        fetchProducts();
        setEditProduct(null);
      })
      .catch(error => console.error('Error updating product:', error));
  };

  const deleteProduct = (productId) => {
    axios.delete(`/api/products/delete/${productId}`)
      .then(() => fetchProducts())
      .catch(error => console.error('Error deleting product:', error));
  };

  const selectProductForEditing = (product) => {
    setEditProduct({ ...product });
  };

  return (
    <>
      <div className="navbar-spacer"></div>
      
      <div className="product-management">
        <h1>Product Management</h1>

        <form onSubmit={addProduct}>
          <h2>Add New Product</h2>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input 
              type="text" 
              name="name" 
              id="name"
              value={newProduct.name} 
              onChange={handleInputChange} 
              placeholder="Product Name" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input 
              type="number" 
              name="price" 
              id="price"
              value={newProduct.price} 
              onChange={handleInputChange} 
              placeholder="Price" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="overallQuantity">Quantity</label>
            <input 
              type="number" 
              name="overallQuantity" 
              id="overallQuantity"
              value={newProduct.overallQuantity} 
              onChange={handleInputChange} 
              placeholder="Quantity" 
              required 
            />
          </div>
          <button type="submit" className="submit-btn">Add Product</button>
        </form>

        {editProduct && (
          <form onSubmit={updateProductDetails}>
            <h2>Edit Product</h2>
            <div className="form-group">
              <label htmlFor="editName">Product Name</label>
              <input 
                type="text" 
                name="name" 
                id="editName"
                value={editProduct.name} 
                onChange={handleEditChange} 
                placeholder="Product Name" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="editPrice">Price</label>
              <input 
                type="number" 
                name="price" 
                id="editPrice"
                value={editProduct.price} 
                onChange={handleEditChange} 
                placeholder="Price" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="editQuantity">Quantity</label>
              <input 
                type="number" 
                name="overallQuantity" 
                id="editQuantity"
                value={editProduct.overallQuantity} 
                onChange={handleEditChange} 
                placeholder="Quantity" 
                required 
              />
            </div>
            <button type="submit" className="submit-btn">Update Product</button>
          </form>
        )}

        <h2>Product List</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map(product => (
                <tr key={product.productId}>
                  <td>{product.name}</td>
                  <td>£{product.price}</td>
                  <td>{product.overallQuantity}</td>
                  <td>
                    <div className="button-container">
                      <button className="edit-btn" onClick={() => selectProductForEditing(product)}>Edit</button>
                      <button className="delete-btn" onClick={() => deleteProduct(product.productId)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductManagement;
