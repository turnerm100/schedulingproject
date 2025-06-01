// src/components/forms/staff/StaffWeeklySchedule.js

import React from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function StaffWeeklySchedule({ formData, setFormData }) {
  const handleChange = (weekIdx, day, field, value) => {
    const updatedWeeks = [...formData.schedule.weeks];
    updatedWeeks[weekIdx][day] = {
      ...updatedWeeks[weekIdx][day],
      [field]: value
    };
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        weeks: updatedWeeks
      }
    }));
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      schedule: { ...prev.schedule, startDate: value }
    }));
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      schedule: { ...prev.schedule, endDate: value }
    }));
  };

  return (
    <div className="staff-weekly-schedule">
      <label>Start Date: <input type="date" value={formData.schedule.startDate} onChange={handleStartDateChange} /></label>
      <label>End Date: <input type="date" value={formData.schedule.endDate} onChange={handleEndDateChange} /></label>

      {[...Array(4)].map((_, weekIdx) => (
        <div key={weekIdx}>
          <h4>Week {weekIdx + 1}</h4>
          {days.map((day) => (
            <div key={day}>
              <strong>{day}</strong>
              <input
                placeholder="Work Location"
                value={formData.schedule.weeks[weekIdx]?.[day]?.location || ''}
                onChange={(e) => handleChange(weekIdx, day, 'location', e.target.value)}
              />
              <input
                type="time"
                value={formData.schedule.weeks[weekIdx]?.[day]?.start || ''}
                onChange={(e) => handleChange(weekIdx, day, 'start', e.target.value)}
              />
              <input
                placeholder="Shift Hours"
                value={formData.schedule.weeks[weekIdx]?.[day]?.hours || ''}
                onChange={(e) => handleChange(weekIdx, day, 'hours', e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
