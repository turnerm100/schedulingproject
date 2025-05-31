import React, { useState } from 'react';

export default function StaffEventForm({ onSubmit }) {
  const [form, setForm] = useState({
    staffId: '',
    type: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    notes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="type" onChange={handleChange}>
        <option value="">-- Event Type --</option>
        <option value="PTO">PTO</option>
        <option value="sick">Sick</option>
        <option value="appt">Appointment</option>
      </select>
      <input name="startDate" type="date" onChange={handleChange} />
      <input name="startTime" type="time" onChange={handleChange} />
      <input name="endDate" type="date" onChange={handleChange} />
      <input name="endTime" type="time" onChange={handleChange} />
      <textarea name="notes" onChange={handleChange} />
      <button type="submit">Save Event</button>
    </form>
  );
}
