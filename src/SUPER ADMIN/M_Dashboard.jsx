import React from 'react';
import { FaHospital, FaMoneyBillWave, FaCogs, FaUsers } from 'react-icons/fa';
import './M_Dashboard.css';

export default function ManagerDashboard() {
  const cards = [
    { title: 'HMS', icon: <FaHospital />, count: 0, earning: 4000 },
    { title: 'Billing', icon: <FaMoneyBillWave />, count: 0, earning: 3000 },
    { title: 'EMS', icon: <FaCogs />, count: 0, earning: 3000 },
    { title: 'CRM', icon: <FaUsers />, count: 0, earning: 2500 },
  ];

  return (
    <div className="dashboard-wrapper">
      <h1>Welcome to the Staff Dashboard</h1>

    

      <div className="activity-section">
        <h1>Recent Activity</h1>
        <ul>
          <li>Suresh updated project status</li>
          <li>New payment of $500 received</li>
          <li>Client ABC Corp added</li>
        </ul>
      </div>

      <div className="announcements">
        <h1>Announcements</h1>
        <p>📢 Staff meeting scheduled for Friday at 10 AM.</p>
        <p>📢 New Project Added</p>
      </div>
    </div>
  );
}
