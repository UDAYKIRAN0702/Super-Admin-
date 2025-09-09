import React, { useState } from "react";
import "./Employee_Delete.css"; // Import the CSS file

function EmployeeDelete() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Alice Johnson", department: "IT" },
    { id: 2, name: "Bob Smith", department: "HR" },
    { id: 3, name: "Charlie Brown", department: "Finance" }
  ]);

  const [search, setSearch] = useState("");
  const [newEmployee, setNewEmployee] = useState({ name: "", department: "" });

  // Delete employee with confirmation
  const handleDelete = (id) => {
    const emp = employees.find((e) => e.id === id);
    if (window.confirm(`Are you sure you want to delete ${emp.name}?`)) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  // Add new employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.department) {
      alert("Please fill all fields");
      return;
    }
    const newId = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
    setEmployees([...employees, { id: newId, ...newEmployee }]);
    setNewEmployee({ name: "", department: "" });
  };

  // Filter employees based on search
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="employee-container">
      <h2>Employee Management</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      {/* Add Employee Form */}
      <form className="add-form" onSubmit={handleAddEmployee}>
        <input
          type="text"
          placeholder="Enter name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter department"
          value={newEmployee.department}
          onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
        />
        <button type="submit" className="add-btn">Add Employee</button>
      </form>

      {/* Employee Table */}
      {filteredEmployees.length === 0 ? (
        <p className="empty-msg">No employees found.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeDelete;
