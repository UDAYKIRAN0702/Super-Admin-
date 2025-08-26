import React from 'react';
import './Employee Monitor.css';

function EmployeeMonitor() {
  // Employee data defined inside the component
  const employees = [
    { id: 1, name: "John Doe", department: "IT", status: "Active", salary: 50000, projectHours: 120 },
    { id: 2, name: "Jane Smith", department: "HR", status: "Inactive", salary: 40000, projectHours: 80 },
    { id: 3, name: "Michael Johnson", department: "Finance", status: "Active", salary: 55000, projectHours: 100 },
    { id: 4, name: "Emily Davis", department: "IT", status: "OnLeave", salary: 48000, projectHours: 90 },
    { id: 5, name: "William Brown", department: "Marketing", status: "Active", salary: 45000, projectHours: 110 },
    { id: 6, name: "Linda Wilson", department: "HR", status: "Active", salary: 42000, projectHours: 95 },
    { id: 7, name: "James Taylor", department: "Finance", status: "Inactive", salary: 60000, projectHours: 130 },
    { id: 8, name: "Patricia Anderson", department: "Marketing", status: "OnLeave", salary: 47000, projectHours: 85 },
    { id: 9, name: "Robert Thomas", department: "IT", status: "Active", salary: 52000, projectHours: 125 },
    { id: 10, name: "Barbara Jackson", department: "Finance", status: "Active", salary: 58000, projectHours: 140 }
  ];

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
  const inactiveEmployees = employees.filter(emp => emp.status === 'Inactive').length;

  const departments = [...new Set(employees.map(emp => emp.department))];
  const deptCounts = departments.map(dept => ({
    name: dept,
    count: employees.filter(emp => emp.department === dept).length
  }));

  const totalSalary = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
  const totalProjectHours = employees.reduce((sum, emp) => sum + (emp.projectHours || 0), 0);

  return (
    <div className="employee-monitor">
      <h2>Employee Monitoring Dashboard</h2>

      <div className="summary-cards">
        <div className="card">
          <h3>Total Employees</h3>
          <p>{totalEmployees}</p>
        </div>
        <div className="card">
          <h3>Active Employees</h3>
          <p>{activeEmployees}</p>
        </div>
        <div className="card">
          <h3>Inactive Employees</h3>
          <p>{inactiveEmployees}</p>
        </div>
        <div className="card">
          <h3>Total Salary</h3>
          <p>₹{totalSalary.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Total Project Hours</h3>
          <p>{totalProjectHours}</p>
        </div>
        {deptCounts.map(dept => (
          <div className="card" key={dept.name}>
            <h3>{dept.name} Dept.</h3>
            <p>{dept.count}</p>
          </div>
        ))}
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Salary (₹)</th>
            <th>Project Hours</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>
                <span className={`status ${emp.status?.toLowerCase()}`}>
                  {emp.status}
                </span>
              </td>
              <td>{emp.salary ? emp.salary.toLocaleString() : 0}</td>
              <td>{emp.projectHours || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeMonitor;
