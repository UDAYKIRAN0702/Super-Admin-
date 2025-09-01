import React, { useEffect, useState } from "react";
import axios from "axios";
import "./M Payment.css";

// Base API URL - replace with your actual API endpoint
const API_BASE_URL = "http://127.0.0.1:8000/api/adminpayments/";

export default function MPayments() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Popup states
  const [isEditing, setIsEditing] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Create an axios instance with base configuration
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // API call functions using axios
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await api.get("/");
      setPayments(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  const createPayment = async (paymentData) => {
    try {
      const response = await api.post("/", paymentData);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error("Error creating payment:", err);
      throw err;
    }
  };

  const updatePayment = async (id, paymentData) => {
    try {
      const response = await api.put(`/${id}/`, paymentData);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error("Error updating payment:", err);
      throw err;
    }
  };

  const deletePayment = async (id) => {
    try {
      await api.delete(`/${id}/`);
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error deleting payment:", err);
      throw err;
    }
  };

  // Fetch payments on component mount
  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((p) =>
    [p.id, p.clientName, p.contactPerson]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Open edit popup
  const handleEdit = (payment) => {
    setCurrentPayment({ ...payment });
    setIsEditing(true);
    setIsAdding(false);
  };

  // Open add popup
  const handleAdd = () => {
    setCurrentPayment({
      id: "",
      client_name: "",
      Contact_person: "",
      project_amount: "",
      my_commission: "",
      my_percentage: "",
      total_pay: "",
      withdraw_payment: "Pending",
    });
    setIsAdding(true);
    setIsEditing(true);
  };

  // Handle input change inside popup
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPayment((prev) => ({ ...prev, [name]: value }));
  };

  // Save (Add or Update)
  const handleSave = async () => {
    try {
      if (isAdding) {
        // Create new payment
        const newPayment = await createPayment(currentPayment);
        setPayments((prev) => [...prev, newPayment]);
      } else {
        // Update existing payment
        const updatedPayment = await updatePayment(currentPayment.id, currentPayment);
        setPayments((prev) =>
          prev.map((p) => (p.id === updatedPayment.id ? updatedPayment : p))
        );
      }
      setIsEditing(false);
      setCurrentPayment(null);
      setIsAdding(false);
    } catch (err) {
      // Error is already handled in the API functions
    }
  };

  // Delete row
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await deletePayment(id);
        setPayments((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        // Error is already handled in the API functions
      }
    }
  };

  return (
    <div className="payments-container">
      <div className="payments-header">
        <h1>Payments</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search by ID, Client Name, Contact Person..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="payments-search"
          />
          <button className="add-btn" onClick={handleAdd}>
            + Add Payment
          </button>
        </div>
      </div>

      {loading && <p className="loading-text">Loading payments...</p>}
      {error && <p className="error-text">Error: {error}</p>}
      {!loading && !error && filteredPayments.length === 0 && (
        <p className="no-data">No matching payments found.</p>
      )}

      {!loading && !error && filteredPayments.length > 0 && (
        <div className="table-wrapper">
          <table className="payments-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client Name</th>
                <th>Contact Person</th>
                <th>Project Amount</th>
                <th>My Commission</th>
                <th>My Percentage</th>
                <th>Total Pay</th>
                <th>Withdraw Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.client_name}</td>
                  <td>{payment.Contact_person}</td>
                  <td>{payment.project_amount}</td>
                  <td>{payment.my_commission}</td>
                  <td>{payment.my_percentage}</td>
                  <td>{payment.total_pay}</td>
                  <td>
                    <span
                      className={`payment-badge ${
                        payment.withdraw_payment === "paid"
                          ? "paid"
                          : "pending"
                      }`}
                    >
                      {payment.withdraw_payment}
                    </span>
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(payment)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(payment.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Popup Modal */}
      {isEditing && currentPayment && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isAdding ? "Add Payment" : "Edit Payment"}</h2>
            <label>
              ID:
              <input
                type="text"
                name="id"
                value={currentPayment.id}
                onChange={handleChange}
                disabled={!isAdding} /* Prevent ID change during edit */
              />
            </label>
            <label>
              Client Name:
              <input
                type="text"
                name="client_name"
                value={currentPayment.client_name}
                onChange={handleChange}
              />
            </label>
            <label>
              Contact Person:
              <input
                type="text"
                name="Contact_person"
                value={currentPayment.Contact_person}
                onChange={handleChange}
              />
            </label>
            <label>
              Project Amount:
              <input
                type="number"
                name="project_amount"
                value={currentPayment.project_amount}
                onChange={handleChange}
              />
            </label>
            <label>
              My Commission:
              <input
                type="number"
                name="my_commission"
                value={currentPayment.my_commission}
                onChange={handleChange}
              />
            </label>
            <label>
              My Percentage:
              <input
                type="text"
                name="my_percentage"
                value={currentPayment.my_percentage}
                onChange={handleChange}
              />
            </label>
            <label>
              Total Pay:
              <input
                type="number"
                name="total_pay"
                value={currentPayment.total_pay}
                onChange={handleChange}
              />
            </label>
            <label>
              Withdraw Payment:
              <select
                name="withdraw_payment"
                value={currentPayment.withdraw_payment}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </label>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>
                {isAdding ? "Add" : "Save"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  setIsAdding(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}