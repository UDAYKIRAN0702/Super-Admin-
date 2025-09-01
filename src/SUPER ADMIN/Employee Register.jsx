import React, { useState } from 'react';
import axios from 'axios';
import './Employee Register.css';

function EmployeeRegister() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/employees/', employee);
      
      console.log('Employee data:', response.data);
      setMessage(`Employee Registered Successfully! Employee ID: ${response.data.employee_id}`);
      
      // Reset form
      setEmployee({ name: '', email: '', role: '', phone: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error('Error registering employee:', error);
      setMessage('Error registering employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-register">
      <h1>Employee Register</h1>
      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="employee-form">
        <label>
          Name:
          <input 
            type="text" 
            name="name" 
            value={employee.name} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={employee.email} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>
          Role:
          <input 
            type="text" 
            name="role" 
            value={employee.role} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>
          Phone:
          <input 
            type="tel" 
            name="phone" 
            value={employee.phone} 
            onChange={handleChange} 
            required 
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register Employee'}
        </button>
      </form>
    </div>
  );
}

export default EmployeeRegister;