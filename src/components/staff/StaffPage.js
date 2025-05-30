import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function StaffPage() {
  return (
    <div>
      <h2>Staff Manager</h2>
      <nav style={{ marginBottom: '15px' }}>
      </nav>
      <Outlet />
    </div>
  );
}
