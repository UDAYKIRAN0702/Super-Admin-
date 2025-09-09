import React, { useState } from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import './M_Ticket_Raise.css'; 

function MTicketRaise() {
  const [view, setView] = useState('status'); 
  const [tickets, setTickets] = useState([
    {
      id: 1,
      empId: "EMP101",
      subject: "System Login Issue",
      description: "Unable to log in to the portal after password reset.",
      priority: "Critical",
      status: "Pending",
      createdAt: "2025-08-20 10:15 AM"
    },
    {
      id: 2,
      empId: "EMP205",
      subject: "Email Not Working",
      description: "Unable to send or receive emails since morning.",
      priority: "Medium",
      status: "In Progress",
      createdAt: "2025-08-21 02:30 PM"
    },
    {
      id: 3,
      empId: "EMP310",
      subject: "Software Installation Request",
      description: "Need MS Project installed on my system.",
      priority: "Low",
      status: "Resolved",
      createdAt: "2025-08-23 09:00 AM"
    }
  ]);

  const [editTicket, setEditTicket] = useState(null);

  const handleEditChange = (e) => {
    setEditTicket({ ...editTicket, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setTickets(tickets.map(t => (t.id === editTicket.id ? editTicket : t)));
    setEditTicket(null);
  };

  return (
    <div className="business-analysis">
      <h1>Ticket Dashboard</h1>

      {/* Navigation */}
      <div className="ticket-nav">
        <button className={view === 'status' ? 'active' : ''} onClick={() => setView('status')}>Ticket Status</button>
      </div>

      {/* Ticket Status */}
      {view === 'status' && (
        <div className="ticket-status-table">
          {tickets.length === 0 ? (
            <p>No tickets available.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Emp ID</th>
                  <th>Subject</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t, index) => (
                  <tr key={t.id}>
                    <td>{index + 1}</td>
                    <td>{t.empId}</td>
                    <td>{t.subject}</td>
                    <td>{t.description}</td>
                    <td><span className={`priority-badge ${t.priority.toLowerCase()}`}>{t.priority}</span></td>
                    <td><span className={`status-badge ${t.status.toLowerCase()}`}>{t.status}</span></td>
                    <td>{t.createdAt}</td>
                    <td>
                      <button onClick={() => setEditTicket(t)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Edit Ticket Form */}
      {editTicket && (
        <div className="ticket-form">
          <h3>Edit Ticket</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={editTicket.subject}
              onChange={handleEditChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={editTicket.description}
              onChange={handleEditChange}
            />

            <select
              name="priority"
              value={editTicket.priority}
              onChange={handleEditChange}
            >
              <option value="Critical">Critical</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              name="status"
              value={editTicket.status}
              onChange={handleEditChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <div className="form-buttons">
              <button type="submit" className="submit-btn">Update</button>
              <button type="button" onClick={() => setEditTicket(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default MTicketRaise;
