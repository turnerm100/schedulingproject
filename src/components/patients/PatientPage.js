import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function PatientPage() {
  return (
    <div>
      <h2>Patient Area</h2>
      <nav style={{ marginBottom: '10px' }}>
      </nav>
      <Outlet />
    </div>
  );
}
