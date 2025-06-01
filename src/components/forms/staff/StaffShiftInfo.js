// src/components/forms/staff/StaffShiftInfo.js

import React from 'react';

export default function StaffShiftInfo({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="staff-shift-info">
      <label>Last Name: <input name="lastName" value={formData.lastName} onChange={handleChange} /></label>
      <label>First Name: <input name="firstName" value={formData.firstName} onChange={handleChange} /></label>
      <label>Employee ID: <input name="employeeId" value={formData.employeeId} onChange={handleChange} /></label>

      <label>Position Title:
        <select name="positionTitle" value={formData.positionTitle} onChange={handleChange}>
          <option value="">-- Select --</option>
          <option value="RN">RN</option>
          <option value="Scheduler">Scheduler</option>
          <option value="Pharmacist">Pharmacist</option>
          {/* Add more */}
        </select>
      </label>

      <label>Scheduling Team:
        <select name="schedulingTeam" value={formData.schedulingTeam} onChange={handleChange}>
          <option value="">-- Select --</option>
          <option value="Infusion">Infusion</option>
          <option value="Pharmacy">Pharmacy</option>
          {/* Add more */}
        </select>
      </label>

      <label>Shift Type:
        <select name="shiftType" value={formData.shiftType} onChange={handleChange}>
          <option value="">-- Select --</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Per Diem">Per Diem</option>
        </select>
      </label>

      <label>FTE: <input name="fte" value={formData.fte} onChange={handleChange} /></label>
      <label>Work Days: <input name="workDays" value={formData.workDays} onChange={handleChange} /></label>
      <label>Work Hours: <input name="workHours" value={formData.workHours} onChange={handleChange} /></label>

      <label>Work Status:
        <select name="workStatus" value={formData.workStatus} onChange={handleChange}>
          <option value="">-- Select --</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>

      <label>Notes:
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </label>

      <label style={{ color: 'red', marginTop: '10px' }}>
        <input
          type="checkbox"
          checked={!formData.active}
          onChange={(e) => setFormData((prev) => ({ ...prev, active: !e.target.checked }))}
        />
        Deactivate
      </label>
    </div>
  );
}
