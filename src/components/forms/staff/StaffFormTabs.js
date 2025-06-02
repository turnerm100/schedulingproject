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
      <div className={styles.formGrid}>
        <div className={styles.labelledInput}>
          <label>First Name</label>
          <input type="text" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
        </div>
        <div className={styles.labelledInput}>
          <label>Last Name</label>
          <input type="text" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
        </div>
        <div className={styles.labelledInput}>
          <label>Employee ID</label>
          <input type="text" value={formData.employeeId} onChange={(e) => handleChange('employeeId', e.target.value)} />
        </div>
        <div className={styles.labelledInput}>
          <label>Position Title</label>
          <select value={formData.positionTitle} onChange={(e) => handleChange('positionTitle', e.target.value)}>
            <option value="">-- Select --</option>
            <option value="RN">RN</option>
            <option value="Scheduler">Scheduler</option>
            <option value="Pharmacist">Pharmacist</option>
          </select>
        </div>
        <div className={styles.labelledInput}>
          <label>Scheduling Team</label>
          <select value={formData.schedulingTeam} onChange={(e) => handleChange('schedulingTeam', e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Infusion">Infusion</option>
            <option value="Pharmacy">Pharmacy</option>
          </select>
        </div>
        <div className={styles.labelledInput}>
          <label>Shift Type</label>
          <select value={formData.shiftType} onChange={(e) => handleChange('shiftType', e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Per Diem">Per Diem</option>
          </select>
        </div>
        <div className={styles.labelledInput}>
          <label>FTE</label>
          <input type="text" value={formData.fte} onChange={(e) => handleChange('fte', e.target.value)} />
        </div>
        <div className={styles.labelledInput}>
          <label>Work Days</label>
          <input type="text" value={formData.workDays} onChange={(e) => handleChange('workDays', e.target.value)} />
        </div>
        <div className={styles.labelledInput}>
          <label>Work Hours</label>
          <input type="text" value={formData.workHours} onChange={(e) => handleChange('workHours', e.target.value)} />
        </div>
        <div className={styles.labelledInput}>
          <label>Work Status</label>
          <select value={formData.workStatus} onChange={(e) => handleChange('workStatus', e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className={styles.labelledInput}>
          <label>Notes</label>
          <textarea value={formData.notes} onChange={(e) => handleChange('notes', e.target.value)} />
        </div>
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
          <label>Email</label>
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
          return (
            <>
              <h4 style={{ marginBottom: '10px' }}>{activeWeek.replace('week', 'Week ')}</h4>
              {days.map((day) => (
                <div key={day} className={styles.formGrid}>
                  <div className={styles.labelledInput}>
                    <label>{day} – Location</label>
                    <input
                      type="text"
                      value={formData.schedule.weeks[weekIdx]?.[day]?.location || ''}
                      onChange={(e) => handleScheduleChange(weekIdx, day, 'location', e.target.value)}
                    />
                  </div>
                  <div className={styles.labelledInput}>
                    <label>{day} – Start Time</label>
                    <input
                      type="time"
                      value={formData.schedule.weeks[weekIdx]?.[day]?.start || ''}
                      onChange={(e) => handleScheduleChange(weekIdx, day, 'start', e.target.value)}
                    />
                  </div>
                  <div className={styles.labelledInput}>
                    <label>{day} – Hours</label>
                    <input
                      type="text"
                      value={formData.schedule.weeks[weekIdx]?.[day]?.hours || ''}
                      onChange={(e) => handleScheduleChange(weekIdx, day, 'hours', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </>
          );
        })()}
      </div>
    </>
  );
}

  return null;
}
