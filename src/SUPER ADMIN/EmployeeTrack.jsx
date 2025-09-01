import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeTrack.css";

function EmployeeTrack() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API call to fetch employee data using Axios
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        // Using JSONPlaceholder API for demonstration
        const response = await axios.get('http://127.0.0.1:8000/api/employees/');
        
        // Transform API data to match our structure with role instead of department
        const formattedData = response.data.map(user => ({
          id: user.employee_id,
          name: user.name,
          role: user.role || "General", // Using company bs as role
          email: user.email,
          active: Math.floor(Math.random() * 10), // Random data for demo
          closed: Math.floor(Math.random() * 10)  // Random data for demo
        }));
        
        setEmployees(formattedData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toString().includes(search)
  );

  return (
    <div className="employee-container">
      <h1 className="employee-title">Employee Tracker</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="employee-search"
      />

      {/* Loading and Error States */}
      {loading && <div className="loading">Loading employees...</div>}
      {error && <div className="error">Error: {error}</div>}

      {/* Table */}
      {!loading && !error && (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Active</th>
              <th>Closed</th>
            </tr>
          </thead>
          <tbody>
            
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.role}</td>
                  <td>{emp.email}</td>
                  <td>{emp.active}</td>
                  <td>{emp.closed}</td>        
                </tr>
              ))
            }

          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeTrack;