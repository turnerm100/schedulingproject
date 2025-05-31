import React from 'react';

export default function CalendarCell({ date, staffId, scheduleData }) {
  const entry = scheduleData.find(
    (item) => item.staffId === staffId && item.date === date
  );

  if (!entry) return <td></td>;

  const color = {
    working: '#fff',
    PTO: '#cce5ff',
    sick: '#f8d7da',
    appt: '#fff3cd'
  }[entry.status || 'working'];

  return (
    <td style={{ backgroundColor: color }}>
      <div>{entry.location}</div>
      <div>{entry.startTime} – {entry.endTime}</div>
    </td>
  );
}
