// src/pages/staff/StaffFormPage.js

import React from 'react';
import StaffForm from '../../components/forms/staff/StaffForm';

export default function StaffFormPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>New Staff Entry</h1>
      <StaffForm />
    </div>
  );
}
