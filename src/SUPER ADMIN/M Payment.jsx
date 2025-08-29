import React, { useEffect, useState } from "react";
import "./M Payment.css";

export default function MPayments() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Popup states
  const [isEditing, setIsEditing] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Example fetch simulation (replace with API call)
  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        setPayments([
          {
            id: "C001",
            clientName: "ABC Pvt Ltd",
            contactPerson: "John Doe",
            referralAmount: 5000,
            myCommission: 500,
            myPercent: "10%",
            totalPay: 5500,
            withdrawPayment: "Pending",
          },
          {
            id: "C002",
            clientName: "XYZ Solutions",
            contactPerson: "Jane Smith",
            referralAmount: 8000,
            myCommission: 800,
            myPercent: "10%",
            totalPay: 8800,
            withdrawPayment: "Paid",
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
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
      clientName: "",
      contactPerson: "",
      referralAmount: "",
      myCommission: "",
      myPercent: "",
      totalPay: "",
      withdrawPayment: "Pending",
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
  const handleSave = () => {
    if (isAdding) {
      // Generate unique ID if not entered
      const newPayment = {
        ...currentPayment,
        id: currentPayment.id || `C${String(payments.length + 1).padStart(3, "0")}`,
      };
      setPayments((prev) => [...prev, newPayment]);
    } else {
      // Update existing
      setPayments((prev) =>
        prev.map((p) => (p.id === currentPayment.id ? currentPayment : p))
      );
    }
    setIsEditing(false);
    setCurrentPayment(null);
    setIsAdding(false);
  };

  // Delete row
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      setPayments((prev) => prev.filter((p) => p.id !== id));
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
                  <td>{payment.clientName}</td>
                  <td>{payment.contactPerson}</td>
                  <td>{payment.referralAmount}</td>
                  <td>{payment.myCommission}</td>
                  <td>{payment.myPercent}</td>
                  <td>{payment.totalPay}</td>
                  <td>
                    <span
                      className={`payment-badge ${
                        payment.withdrawPayment.toLowerCase() === "paid"
                          ? "paid"
                          : "pending"
                      }`}
                    >
                      {payment.withdrawPayment}
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
                name="clientName"
                value={currentPayment.clientName}
                onChange={handleChange}
              />
            </label>
            <label>
              Contact Person:
              <input
                type="text"
                name="contactPerson"
                value={currentPayment.contactPerson}
                onChange={handleChange}
              />
            </label>
            <label>
              Project Amount:
              <input
                type="number"
                name="referralAmount"
                value={currentPayment.referralAmount}
                onChange={handleChange}
              />
            </label>
            <label>
              My Commission:
              <input
                type="number"
                name="myCommission"
                value={currentPayment.myCommission}
                onChange={handleChange}
              />
            </label>
            <label>
              My Percentage:
              <input
                type="text"
                name="myPercent"
                value={currentPayment.myPercent}
                onChange={handleChange}
              />
            </label>
            <label>
              Total Pay:
              <input
                type="number"
                name="totalPay"
                value={currentPayment.totalPay}
                onChange={handleChange}
              />
            </label>
            <label>
              Withdraw Payment:
              <select
                name="withdrawPayment"
                value={currentPayment.withdrawPayment}
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
