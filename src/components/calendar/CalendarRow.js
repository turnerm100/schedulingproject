import React from 'react';
import CalendarCell from './CalendarCell';

export default function CalendarRow({ staff, days, scheduleData }) {
  return (
    <tr>
      <td>{staff.name}</td>
      {days.map((day) => (
        <CalendarCell
          key={day.date}
          date={day.date}
          staffId={staff.staffId}
          scheduleData={scheduleData}
        />
      ))}
    </tr>
  );
}
