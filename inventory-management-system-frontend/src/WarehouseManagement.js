import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WarehouseManagement.css';

function WarehouseManagement() {
  const [warehouses, setWarehouses] = useState([]);  
  const [newWarehouse, setNewWarehouse] = useState({
    location: '',
    capacity: '',
    zipcode: '', 
  });
  const [editMode, setEditMode] = useState(false);
  const [editWarehouseId, setEditWarehouseId] = useState(null);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('/api/warehouses');
      const data = Array.isArray(response.data) ? response.data : [];
      setWarehouses(data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      setWarehouses([]);  
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWarehouse((prevWarehouse) => ({
      ...prevWarehouse,
      [name]: value,
    }));
  };

  const handleAddOrUpdateWarehouse = async () => {
    try {
      if (editMode) {
        await axios.put(`/api/warehouses/update/${editWarehouseId}`, newWarehouse);
      } else {
        await axios.post('/api/warehouses/add', newWarehouse);
      }
      fetchWarehouses();  
      setNewWarehouse({ location: '', capacity: '', zipcode: '' }); 
      setEditMode(false);  
      setEditWarehouseId(null); 
    } catch (error) {
      console.error('Error adding/updating warehouse:', error);
    }
  };

  const handleDeleteWarehouse = async (warehouseId) => {
    try {
      await axios.delete(`/api/warehouses/delete/${warehouseId}`);
      fetchWarehouses();  
    } catch (error) {
      console.error('Error deleting warehouse:', error);
    }
  };

  const handleEditClick = (warehouse) => {
    setNewWarehouse({
      location: warehouse.location,
      capacity: warehouse.capacity,
      zipcode: warehouse.zipcode, 
    });
    setEditWarehouseId(warehouse.warehouseId);
    setEditMode(true);
  };

  return (
    <div className="warehouse-management">
      <h1>Warehouse Management</h1>

      <h2>{editMode ? 'Edit Warehouse' : 'Add a Warehouse'}</h2>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          value={newWarehouse.location}
          placeholder="Location"
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="capacity">Capacity</label>
        <input
          type="number"
          name="capacity"
          value={newWarehouse.capacity}
          placeholder="Capacity"
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="zipcode">Zipcode</label>
        <input
          type="text"
          name="zipcode"
          value={newWarehouse.zipcode} 
          placeholder="Zipcode"
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <button onClick={handleAddOrUpdateWarehouse} className="submit-btn">
        {editMode ? 'Update Warehouse' : 'Add Warehouse'}
      </button>

      <h2>Warehouses List</h2>
      <table className="warehouse-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Capacity</th>
            <th>Zipcode</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(warehouses) && warehouses.length > 0 ? (
            warehouses.map((warehouse) => (
              <tr key={warehouse.warehouse_id}>
                <td>{warehouse.location}</td>
                <td>{warehouse.capacity}</td>
                <td>{warehouse.zipcode}</td> 
                <td className="actions">
                  <div className="button-container">
                    <button onClick={() => handleEditClick(warehouse)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteWarehouse(warehouse.warehouseId)} className="delete-btn">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No warehouses available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WarehouseManagement;
