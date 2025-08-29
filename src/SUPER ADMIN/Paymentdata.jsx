import React, { useState } from "react";
import "./paymentdata.css";

export default function PaymentForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    id: "",
    clientName: "",
    contactPerson: "",
    projectAmount: "",
    myCommission: "",
    myPercent: "",
    totalPay: "",
    withdrawPayment: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({
      id: "",
      clientName: "",
      contactPerson: "",
      projectAmount: "",
      myCommission: "",
      myPercent: "",
      totalPay: "",
      withdrawPayment: "Pending",
    });
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h2>Add Payment Data</h2>
<label>
        Employee ID
        <input type="text" name="id" value={formData.id} onChange={handleChange} required />
      </label>
      <label>
        ID
        <input type="text" name="id" value={formData.id} onChange={handleChange} required />
      </label>

      <label>
        Client Name
        <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required />
      </label>

      <label>
        Contact Person
        <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
      </label>

      <label>
        Project Amount
        <input type="number" name="projectAmount" value={formData.projectAmount} onChange={handleChange} required />
      </label>

      <label>
        My Commission
        <input type="number" name="myCommission" value={formData.myCommission} onChange={handleChange} required />
      </label>

      <label>
        My Percentage
        <input type="text" name="myPercent" value={formData.myPercent} onChange={handleChange} required />
      </label>

      <label>
        Total Pay
        <input type="number" name="totalPay" value={formData.totalPay} onChange={handleChange} required />
      </label>

      <label>
        Withdraw Payment
        <select name="withdrawPayment" value={formData.withdrawPayment} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
      </label>

      <button type="submit">Save Payment</button>
    </form>
  );
}
