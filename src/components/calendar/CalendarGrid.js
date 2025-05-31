import React from 'react';
import CalendarRow from './CalendarRow';

export default function CalendarGrid({ days, staff, scheduleData }) {
  return (
    <table className="calendar-grid">
      <thead>
        <tr>
          <th>Staff</th>
          {days.map((day) => (
            <th key={day.date}>{day.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {staff.map((person) => (
          <CalendarRow
            key={person.staffId}
            staff={person}
            days={days}
            scheduleData={scheduleData}
          />
        ))}
      </tbody>
    </table>
  );
}
