import React, { useState } from "react";
import axios from "axios";
import "./paymentdata.css";

export default function PaymentForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    employee_id: "",
    client_name: "",
    Contact_person: "",
    project_amount: "",
    my_commission: "",
    my_percentage: "",
    total_pay: "",
    withdraw_payment: "Pending",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // API call to save payment data
      const response = await axios.post("http://127.0.0.1:8000/api/adminpayments/", formData);
      
      if (response.status === 201) {
        setMessage("Payment data saved successfully!");
        
        // Call the onSubmit prop if provided
        if (onSubmit) {
          onSubmit(formData);
        }
        
        // Reset form
        setFormData({
          employee_id: "",
          client_name: "",
          Contact_person: "",
          project_amount: "",
          my_commission: "",
          my_percentage: "",
          total_pay: "",
          withdraw_payment: "Pending",
        });
      }
    } catch (error) {
      console.error("Error saving payment data:", error);
      setMessage("Error saving payment data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to calculate percentage if project amount and commission are provided
  const calculatePercentage = () => {
    if (formData.project_amount && formData.my_commission) {
      const projectAmount = parseFloat(formData.project_amount);
      const commission = parseFloat(formData.my_commission);
      
      if (projectAmount > 0) {
        const percentage = ((commission / projectAmount) * 100).toFixed(2);
        setFormData({
          ...formData,
          my_percentage: percentage
        });
      }
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h2>Add Payment Data</h2>
      
      {message && (
        <div className={`message ${message.includes("Error") ? "error" : "success"}`}>
          {message}
        </div>
      )}

      <label>
        Employee ID
        <input 
          type="text" 
          name="employee_id" 
          value={formData.employee_id} 
          onChange={handleChange} 
          required 
        />
      </label>

      <label>
        Client Name
        <input 
          type="text" 
          name="client_name" 
          value={formData.client_name} 
          onChange={handleChange} 
          required 
        />
      </label>

      <label>
        Contact Person
        <input 
          type="text" 
          name="Contact_person" 
          value={formData.Contact_person} 
          onChange={handleChange} 
          required 
        />
      </label>

      <label>
        Project Amount
        <input 
          type="number" 
          name="project_amount" 
          value={formData.project_amount} 
          onChange={handleChange}
          onBlur={calculatePercentage}
          required 
        />
      </label>

      <label>
        My Commission
        <input 
          type="number" 
          name="my_commission" 
          value={formData.my_commission} 
          onChange={handleChange}
          onBlur={calculatePercentage}
          required 
        />
      </label>

      <label>
        My Percentage
        <input 
          type="text" 
          name="my_percentage" 
          value={formData.my_percentage} 
          onChange={handleChange}
          readOnly
          required 
        />
      </label>

      <label>
        Total Pay
        <input 
          type="number" 
          name="total_pay" 
          value={formData.total_pay} 
          onChange={handleChange} 
          required 
        />
      </label>

      <label>
        Withdraw Payment
        <select 
          name="withdraw_payment" 
          value={formData.withdraw_payment} 
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Payment"}
      </button>
    </form>
  );
}