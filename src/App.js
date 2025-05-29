// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList'; // Placeholder for future patient list
import './App.css';
import DeactivatedPatientsList from './components/DeactivatedPatientsList';
import DropdownSettings from './components/DropdownSettings';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
<nav style={{ padding: '10px', background: '#153D64' }}>
  <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Dashboard</Link>
  <Link to="/patients" style={{ color: 'white', marginRight: '15px' }}>Patients</Link>
  <Link to="/deactivated-patients" style={{ color: 'white', marginRight: '15px' }}>Deactivated Patients</Link>
  <Link to="/dropdown-settings" style={{ color: 'white' }}>Dropdown Settings</Link> {/* ✅ add this */}
</nav>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="*" element={<h2 style={{ padding: '20px' }}>404 - Page Not Found</h2>} />
          <Route path="/deactivated-patients" element={<DeactivatedPatientsList />} />
          <Route path="/dropdown-settings" element={<DropdownSettings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
