import React, { useState } from 'react';
import styles from './StaffForm.module.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function StaffFormTabs({ activeTab, formData, setFormData, isEditing }) {
  const [activeAddressTab, setActiveAddressTab] = useState('home');
  const [copyAddressChecked, setCopyAddressChecked] = useState(false);
  const [activeWeek, setActiveWeek] = useState('week1');

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  };

  const handleAddressChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [type]: {
          ...prev.contact[type],
          [field]: value,
        },
      },
    }));
  };

  const copyHomeToShipping = () => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        shippingAddress: { ...prev.contact.homeAddress },
      },
    }));
  };



  const handleScheduleChange = (weekIdx, day, field, value) => {
    const updatedWeeks = [...formData.schedule.weeks];
    updatedWeeks[weekIdx][day] = {
      ...updatedWeeks[weekIdx][day],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        weeks: updatedWeeks,
      },
    }));
  };

  const handleDateChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value,
      },
    }));
  };

if (activeTab === 'shift') {
  return (
    <div>
      {/* Row 1: Last Name, First Name */}
      <div className={styles.formRow}>
        <div className={styles.labelledInput}>
          <label>Last Name</label>
          <input
            type="text"
            className={styles.charWidth30}
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>
        <div className={styles.labelledInput}>
          <label>First Name</label>
          <input
            type="text"
            className={styles.charWidth30}
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </div>
      </div>

{/* Row 2: Employee ID, Position Title */}
<div className={styles.formRow}>
  <div className={styles.labelledInput}>
    <label>Employee ID</label>
    <input
      type="text"
      className={styles.charWidth30}
      value={formData.employeeId}
      onChange={(e) => handleChange('employeeId', e.target.value)}
    />
  </div>
  <div className={styles.labelledInput}>
    <label>Position Title</label>
    <select
      className={styles.charWidth30}
      value={formData.positionTitle}
      onChange={(e) => handleChange('positionTitle', e.target.value)}
    >
      <option value="">-- Select --</option>
      <option value="RN">RN</option>
      <option value="Scheduler">Scheduler</option>
      <option value="Pharmacist">Pharmacist</option>
    </select>
  </div>
</div>

{/* Row 3: Shift Type, Work Status */}
<div className={styles.formRow}>
  <div className={styles.labelledInput}>
    <label>Shift Type</label>
    <select
      className={styles.charWidth30}
      value={formData.shiftType}
      onChange={(e) => handleChange('shiftType', e.target.value)}
    >
      <option value="">-- Select --</option>
      <option value="Full-Time">Full-Time</option>
      <option value="Part-Time">Part-Time</option>
      <option value="Per Diem">Per Diem</option>
    </select>
  </div>
  <div className={styles.labelledInput}>
    <label>Work Status</label>
    <select
      className={styles.charWidth30}
      value={formData.workStatus}
      onChange={(e) => handleChange('workStatus', e.target.value)}
    >
      <option value="">-- Select --</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
  </div>
</div>

{/* Row 4: Scheduling Team, Pharmacy Team */}
<div className={styles.formRow}>
  <div className={styles.labelledInput}>
    <label>Scheduling Team</label>
    <select
      className={styles.charWidth30}
      value={formData.schedulingTeam}
      onChange={(e) => handleChange('schedulingTeam', e.target.value)}
    >
      <option value="">-- Select --</option>
      <option value="Infusion">Infusion</option>
      <option value="Pharmacy">Pharmacy</option>
    </select>
  </div>
  <div className={styles.labelledInput}>
    <label>Pharmacy Team</label>
    <select
      className={styles.charWidth30}
      value={formData.pharmacyTeam || ''}
      onChange={(e) => handleChange('pharmacyTeam', e.target.value)}
    >
      <option value="">-- Select --</option>
      <option value="Oncology">Oncology</option>
      <option value="Infectious Disease">Infectious Disease</option>
      <option value="General Infusion">General Infusion</option>
      <option value="Transplant">Transplant</option>
    </select>
  </div>
</div>

      {/* Row 5: Notes full-width */}
<div className={styles.labelledInput} style={{ marginBottom: '20px' }}>
  <label>Notes</label>
  <textarea
    className={styles.notesArea}
    value={formData.notes}
    onChange={(e) => handleChange('notes', e.target.value)}
  />
</div>

      {/* Row 6: Deactivate checkbox */}
      <div className={styles.labelledInput}>
        <label>
          <input
            type="checkbox"
            checked={!formData.active}
            onChange={(e) => handleChange('active', !e.target.checked)}
          />{' '}
          Deactivate
        </label>
      </div>
    </div>
  );
}

  if (activeTab === 'contact') {
    return (
      <div className={styles.formGrid}>
        <div className={styles.labelledInput}>
          <label>Work Phone</label>
          <input type="text" value={formData.contact.workPhone} onChange={(e) => handleContactChange('workPhone', e.target.value)} />
        </div>
        <div className={styles.labelledInput}>
          <label>Home Phone</label>
          <input type="text" value={formData.contact.homePhone} onChange={(e) => handleContactChange('homePhone', e.target.value)} />
        </div>
        <div className={styles.labelledInput}>
          <label>Work Email</label>
          <input type="email" value={formData.contact.email} onChange={(e) => handleContactChange('email', e.target.value)} />
        </div>

        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '8px', marginTop: '20px' }}>
          <button type="button" className={`${styles.tabButton} ${activeAddressTab === 'home' ? styles.active : ''}`} onClick={() => setActiveAddressTab('home')}>Home Address</button>
          <button type="button" className={`${styles.tabButton} ${activeAddressTab === 'shipping' ? styles.active : ''}`} onClick={() => setActiveAddressTab('shipping')}>Shipping Address</button>
        </div>

        {activeAddressTab === 'home' && (
          <>
            <div className={styles.labelledInput}>
              <label>Address Line 1</label>
              <input type="text" value={formData.contact.homeAddress.line1} onChange={(e) => handleAddressChange('homeAddress', 'line1', e.target.value)} />
            </div>
            <div className={styles.labelledInput}>
              <label>Address Line 2</label>
              <input type="text" value={formData.contact.homeAddress.line2 || ''} onChange={(e) => handleAddressChange('homeAddress', 'line2', e.target.value)} />
            </div>
            <div className={styles.labelledInput}>
              <label>City</label>
              <input type="text" value={formData.contact.homeAddress.city} onChange={(e) => handleAddressChange('homeAddress', 'city', e.target.value)} />
            </div>
            <div className={styles.labelledInput}>
              <label>State</label>
              <input type="text" value={formData.contact.homeAddress.state} onChange={(e) => handleAddressChange('homeAddress', 'state', e.target.value)} />
            </div>
            <div className={styles.labelledInput}>
              <label>Zip Code</label>
              <input type="text" value={formData.contact.homeAddress.zip} onChange={(e) => handleAddressChange('homeAddress', 'zip', e.target.value)} />
            </div>
            <div className={styles.labelledInput}>
              <label>
                <input
                  type="checkbox"
                  checked={copyAddressChecked}
                  onChange={(e) => {
                    setCopyAddressChecked(e.target.checked);
                    if (e.target.checked) copyHomeToShipping();
                  }}
                /> Copy Home Address to Shipping
              </label>
            </div>
          </>
        )}

        {activeAddressTab === 'shipping' && (
          <>
            <div className={styles.labelledInput}>
              <label>Address Line 1</label>
              <input type="text" value={formData.contact.shippingAddress.line1} onChange={(e) => handleAddressChange('shippingAddress', 'line1', e.target.value)} />
            </div>
            <div className={styles.labelledInput}>
              <label>Address Line 2</label>
              <input type="text" value={formData.contact.shippingAddress.line2 || ''} onChange={(e) => handleAddressChange('shippingAddress', 'line2', e.target.value)} />
            </div>
            <div className={styles.labelledInput}>
              <label>City</label>
              <input type="text" value={formData.contact.shippingAddress.city} onChange={(e) => handleAddressChange('shippingAddress', 'city', e.target.value)} />
            </div>
            <div className={styles.labelledInput}>
              <label>State</label>
              <input type="text" value={formData.contact.shippingAddress.state} onChange={(e) => handleAddressChange('shippingAddress', 'state', e.target.value)} />
            </div>
            <div className={styles.labelledInput}>
              <label>Zip Code</label>
              <input type="text" value={formData.contact.shippingAddress.zip} onChange={(e) => handleAddressChange('shippingAddress', 'zip', e.target.value)} />
            </div>
          </>
        )}
      </div>
    );
  }

if (activeTab === 'schedule') {
  return (
    <>
      <div className={styles.formGrid}>
        <div className={styles.labelledInput}>
          <label>Start Date</label>
          <input
            type="date"
            value={formData.schedule.startDate}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
          />
        </div>
        <div className={styles.labelledInput}>
          <label>End Date</label>
          <input
            type="date"
            value={formData.schedule.endDate}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
          />
        </div>
      </div>

      {/* Week Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        {[...Array(4)].map((_, idx) => {
          const weekKey = `week${idx + 1}`;
          return (
            <button
              key={weekKey}
              type="button"
              className={`${styles.tabButton} ${activeWeek === weekKey ? styles.active : ''}`}
              onClick={() => setActiveWeek(weekKey)}
            >
              Week {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Active Week Display */}
      <div style={{ marginBottom: '20px' }}>
{(() => {
  const weekIdx = parseInt(activeWeek.replace('week', '')) - 1;

  return days.map((day) => {
    const dayData = formData.schedule.weeks[weekIdx]?.[day] || {};

    const handleDayChange = (field, value) => {
      const updatedWeeks = [...formData.schedule.weeks];
      updatedWeeks[weekIdx][day] = {
        ...updatedWeeks[weekIdx][day],
        [field]: value,
      };
      setFormData((prev) => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          weeks: updatedWeeks,
        },
      }));
    };

    const handleCheckboxChange = (checked) => {
      handleDayChange('enabled', checked);
    };

    return (
<div className={styles.formGrid}>
  {/* Checkbox and Day Label */}
  <div className={styles.labelledInput}>
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={dayData.enabled || false}
        onChange={(e) => handleCheckboxChange(e.target.checked)}
      />
      {day}
    </label>
  </div>

  {/* Location Dropdown */}
  <div className={styles.labelledInput}>
    <label>Location</label>
    <select
      value={dayData.location || ''}
      onChange={(e) => handleDayChange('location', e.target.value)}
    >
      <option value="">-- Select --</option>
      <option value="Home">Home</option>
      <option value="Infusion Suite">Infusion Suite</option>
      <option value="Pharmacy">Pharmacy</option>
      <option value="Remote">Remote</option>
    </select>
  </div>

  {/* Start Time - Narrow */}
  <div className={`${styles.labelledInput} ${styles.narrowInput}`}>
    <label>Start Time</label>
    <input
      type="time"
      value={dayData.start || ''}
      onChange={(e) => handleDayChange('start', e.target.value)}
    />
  </div>

  {/* Shift Hours - Dropdown + Narrow */}
  <div className={`${styles.labelledInput} ${styles.narrowInput}`}>
    <label>Shift Hours</label>
    <select
      value={dayData.hours || ''}
      onChange={(e) => handleDayChange('hours', e.target.value)}
    >
      <option value="">--</option>
      {Array.from({ length: 24 }, (_, i) => (i + 1) * 0.5).map((val) => (
        <option key={val} value={val}>{val}</option>
      ))}
    </select>
  </div>
</div>
    );
  });
})()}
      </div>
    </>
  );
}

  return null;
}
