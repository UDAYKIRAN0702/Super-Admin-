import React, { useState } from "react";
import "./Logout.css";

export default function StaffLogin({ onLogin }) {
  const [formData, setFormData] = useState({
    empId: "",
    username: "",
    password: "",
    role: "Marketing",
  });

  const [modalType, setModalType] = useState(null); // "empId" or "password"
  const [modalInput, setModalInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      alert(`Logged in as ${formData.username} (${formData.role})`);
      onLogin();
    } else {
      alert("Please enter username and password");
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setModalInput("");
  };

  const closeModal = () => setModalType(null);

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (modalType === "empId") {
      alert(`Instructions sent to your registered email to recover Employee ID: ${modalInput}`);
    } else if (modalType === "password") {
      alert(`Password reset instructions sent to your email: ${modalInput}`);
    }
    closeModal();
  };

  return (
    <div className="login-container">
      <h2>Employee Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option>Vendor</option>
          <option>Admin</option>
          <option>Intern</option>
          <option>Vendor</option>
          <option>Marketing</option>
          <option>Developer</option>
        
          <option>Other</option>
        </select>

        <label>Employee ID</label>
        <input
          type="text"
          name="empId"
          placeholder="Enter Employee ID"
          value={formData.empId}
          onChange={handleChange}
          required
        />

        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <div className="forgot-links">
          <button type="button" className="link-btn" onClick={() => openModal("empId")}>
            Forgot Employee ID?
          </button>
          <span> | </span>
          <button type="button" className="link-btn" onClick={() => openModal("password")}>
            Forgot Password?
          </button>
        </div>
      </form>

      {/* Modal */}
      {modalType && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>
              {modalType === "empId" ? "Recover Employee ID" : "Reset Password"}
            </h3>
            <form onSubmit={handleModalSubmit}>
              <label>
                {modalType === "empId"
                  ? "Enter your registered email"
                  : "Enter your email to reset password"}
              </label>
              <input
                type="email"
                value={modalInput}
                onChange={(e) => setModalInput(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <div className="modal-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
