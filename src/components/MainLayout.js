import React from 'react';
import { Link } from 'react-router-dom';

export default function MainLayout({ children }) {
  return (
    <div>
      <style>
        {`
          .nav-container {
            padding: 10px;
            background: #153D64;
            display: flex;
            gap: 20px;
          }

          .nav-item {
            position: relative;
            color: white;
            cursor: pointer;
          }

          .nav-link {
            text-decoration: none;
            color: white;
          }

          .dropdown {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background: #f9f9f9;
            min-width: 180px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 10;
          }

          .dropdown a {
            color: black;
            padding: 10px;
            display: block;
            text-decoration: none;
          }

          .dropdown a:hover {
            background-color: #e0e0e0;
          }

          .nav-item:hover .dropdown {
            display: block;
          }
        `}
      </style>

      <nav className="nav-container">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>

        <div className="nav-item">
          Patients ▾
          <div className="dropdown">
            <Link to="/patients/list">Patient List</Link>
            <Link to="/patients/visit-info">Visit Info</Link>
            <Link to="/patients/deactivated">Deactivated Patients</Link>
          </div>
        </div>

        <div className="nav-item">
          Staff ▾
          <div className="dropdown">
            <Link to="/staff/list">Staff Manager</Link>
            <Link to="/staff/calendar">Staff Calendar</Link>
          </div>
        </div>

        <Link to="/pharmacy" className="nav-link">Pharmacy</Link>

        <div className="nav-item">
          Admin ▾
          <div className="dropdown">
            <Link to="/admin/settings">Settings</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/dropdown-settings">Dropdown Settings</Link>
          </div>
        </div>
      </nav>

      <main style={{ padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}
