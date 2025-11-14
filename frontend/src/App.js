import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // ========== GET REQUEST ==========
  const fetchUsers = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.get(API_BASE_URL);
      setUsers(response.data.data);
      setMessage(`✅ Successfully fetched ${response.data.count} users`);
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== GET BY ID REQUEST ==========
  const fetchUserById = async (id) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      setMessage(`✅ Found user: ${response.data.data.name} (${response.data.data.email})`);
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== POST REQUEST ==========
  const createUser = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setMessage('❌ Please fill in both name and email');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(API_BASE_URL, formData);
      setUsers([...users, response.data.data]);
      setMessage(`✅ User created: ${response.data.data.name}`);
      setFormData({ name: '', email: '' });
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== PUT REQUEST ==========
  const updateUser = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setMessage('❌ Please fill in both name and email');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const response = await axios.put(`${API_BASE_URL}/${editingId}`, formData);
      setUsers(users.map(u => u.id === editingId ? response.data.data : u));
      setMessage(`✅ User updated: ${response.data.data.name}`);
      setFormData({ name: '', email: '' });
      setEditingId(null);
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== PATCH REQUEST ==========
  const patchUser = async (id, field, value) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}`, { [field]: value });
      setUsers(users.map(u => u.id === id ? response.data.data : u));
      setMessage(`✅ User partially updated: ${field} changed to "${value}"`);
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ========== DELETE REQUEST ==========
  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setUsers(users.filter(u => u.id !== id));
      setMessage(`✅ User deleted successfully`);
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Start editing a user
  const startEdit = (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditingId(user.id);
  };

  const cancelEdit = () => {
    setFormData({ name: '', email: '' });
    setEditingId(null);
  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>🚀 Flask API Tester</h1>
          <p>Learn HTTP Methods: GET, POST, PUT, PATCH, DELETE</p>
        </header>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="section">
          <h2>📋 All Users (GET Request)</h2>
          <button onClick={fetchUsers} disabled={loading} className="btn btn-primary">
            {loading ? 'Loading...' : '🔄 Refresh Users'}
          </button>
          
          <div className="users-grid">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <span className="user-id">ID: {user.id}</span>
                </div>
                <div className="user-actions">
                  <button 
                    onClick={() => fetchUserById(user.id)} 
                    className="btn btn-small btn-info"
                    title="GET by ID"
                  >
                    👁️ View
                  </button>
                  <button 
                    onClick={() => startEdit(user)} 
                    className="btn btn-small btn-warning"
                    title="PUT - Full Update"
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    onClick={() => patchUser(user.id, 'name', prompt('Enter new name:', user.name) || user.name)} 
                    className="btn btn-small btn-patch"
                    title="PATCH - Partial Update"
                  >
                    🔄 Patch Name
                  </button>
                  <button 
                    onClick={() => deleteUser(user.id)} 
                    className="btn btn-small btn-danger"
                    title="DELETE"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>{editingId ? '✏️ Update User (PUT Request)' : '➕ Create New User (POST Request)'}</h2>
          <form onSubmit={editingId ? updateUser : createUser} className="form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" disabled={loading} className="btn btn-success">
                {editingId ? '💾 Update User (PUT)' : '➕ Create User (POST)'}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="btn btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="section info-section">
          <h2>📚 API Methods Explained</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>GET</h3>
              <p><strong>Purpose:</strong> Retrieve data (read-only)</p>
              <p><strong>Example:</strong> Get all users, Get user by ID</p>
              <p><strong>Side Effects:</strong> None (safe operation)</p>
            </div>
            <div className="info-card">
              <h3>POST</h3>
              <p><strong>Purpose:</strong> Create new resources</p>
              <p><strong>Example:</strong> Create a new user</p>
              <p><strong>Side Effects:</strong> Adds new data to server</p>
            </div>
            <div className="info-card">
              <h3>PUT</h3>
              <p><strong>Purpose:</strong> Replace entire resource</p>
              <p><strong>Example:</strong> Update all fields of a user</p>
              <p><strong>Side Effects:</strong> Replaces existing data</p>
            </div>
            <div className="info-card">
              <h3>PATCH</h3>
              <p><strong>Purpose:</strong> Partially update resource</p>
              <p><strong>Example:</strong> Update only the name field</p>
              <p><strong>Side Effects:</strong> Modifies specific fields</p>
            </div>
            <div className="info-card">
              <h3>DELETE</h3>
              <p><strong>Purpose:</strong> Remove a resource</p>
              <p><strong>Example:</strong> Delete a user</p>
              <p><strong>Side Effects:</strong> Removes data from server</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

