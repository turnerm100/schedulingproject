import React from 'react';

export default function CalendarHeader({ currentMonth, onPrev, onNext }) {
  return (
    <div className="calendar-header">
      <button onClick={onPrev}>← Prev Month</button>
      <h2>{currentMonth}</h2>
      <button onClick={onNext}>Next Month →</button>
    </div>
  );
}
