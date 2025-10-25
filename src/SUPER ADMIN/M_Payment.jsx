import React, { useState } from "react";
import "./M_Payment.css";

export default function MPayments() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      client_name: "Client A",
      Contact_person: "Alice",
      project_amount: 1000,
      my_commission: 100,
      my_percentage: "10%",
      total_pay: 1100,
      withdraw_payment: "Pending",
    },
    {
      id: 2,
      client_name: "Client B",
      Contact_person: "Bob",
      project_amount: 2000,
      my_commission: 200,
      my_percentage: "10%",
      total_pay: 2200,
      withdraw_payment: "Paid",
    },
  ]);

  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const filteredPayments = payments.filter((p) =>
    [p.id, p.client_name, p.Contact_person]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleEdit = (payment) => {
    setCurrentPayment({ ...payment });
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setCurrentPayment({
      id: payments.length + 1,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isAdding) {
      setPayments((prev) => [...prev, currentPayment]);
    } else {
      setPayments((prev) =>
        prev.map((p) => (p.id === currentPayment.id ? currentPayment : p))
      );
    }
    setIsEditing(false);
    setCurrentPayment(null);
    setIsAdding(false);
  };

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

      {filteredPayments.length === 0 && <p className="no-data">No matching payments found.</p>}

      {filteredPayments.length > 0 && (
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
                        payment.withdraw_payment.toLowerCase() === "paid"
                          ? "paid"
                          : "pending"
                      }`}
                    >
                      {payment.withdraw_payment}
                    </span>
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(payment)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(payment.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isEditing && currentPayment && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isAdding ? "Add Payment" : "Edit Payment"}</h2>
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
