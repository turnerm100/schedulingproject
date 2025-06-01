// src/components/forms/staff/StaffForm.js

import React, { useState } from 'react';
import StaffShiftInfo from './StaffShiftInfo';
import StaffContactInfo from './StaffContactInfo';
import StaffWeeklySchedule from './StaffWeeklySchedule';
import { createStaff, updateStaff } from '../../../services/staffService';
import styles from './StaffForm.module.css';

export default function StaffForm({ onSubmit, existingStaff }) {
  const [activeTab, setActiveTab] = useState('shift');
  const [formData, setFormData] = useState(
    existingStaff || {
      firstName: '',
      lastName: '',
      employeeId: '',
      positionTitle: '',
      schedulingTeam: '',
      shiftType: '',
      fte: '',
      workDays: '',
      workHours: '',
      workStatus: '',
      notes: '',
      contact: {
        workPhone: '',
        homePhone: '',
        email: '',
        homeAddress: { line1: '', city: '', state: '', zip: '' },
        shippingAddress: { line1: '', city: '', state: '', zip: '' }
      },
      schedule: {
        startDate: '',
        endDate: '',
        weeks: [{}, {}, {}, {}]
      },
      active: true
    }
  );

  const handleSave = async () => {
    try {
      if (formData.id) {
        await updateStaff(formData.id, formData);
        alert('Staff record updated.');
      } else {
        const newId = await createStaff(formData);
        alert('Staff record created.');
        setFormData((prev) => ({ ...prev, id: newId }));
      }
    } catch (error) {
      console.error('Error saving staff data:', error);
      alert('An error occurred while saving.');
    }
  };

  return (
    <div className={styles.formCard}>
      <h2>Staff Form</h2>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'shift' ? styles.active : ''}`}
          onClick={() => setActiveTab('shift')}
        >
          Staff Info
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'contact' ? styles.active : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Info
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'schedule' ? styles.active : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Schedule
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'shift' && (
          <StaffShiftInfo formData={formData} setFormData={setFormData} />
        )}
        {activeTab === 'contact' && (
          <StaffContactInfo formData={formData} setFormData={setFormData} />
        )}
        {activeTab === 'schedule' && (
          <StaffWeeklySchedule formData={formData} setFormData={setFormData} />
        )}
      </div>

      <div className={styles.formActions}>
        <button onClick={handleSave}>Save Staff Info</button>
        <button onClick={() => window.history.back()}>Cancel</button>
      </div>
    </div>
  );
} 