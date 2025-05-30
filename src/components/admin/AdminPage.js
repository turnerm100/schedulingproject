import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AdminPage() {
  return (
    <div>
      <h2>Admin Area</h2>
      <nav style={{ marginBottom: '15px' }}>
      </nav>
      <Outlet />
    </div>
  );
}
