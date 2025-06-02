// src/components/forms/staff/StaffForm.js

import React, { useState } from 'react';
import StaffFormTabs from './StaffFormTabs';
import { createStaff, updateStaff } from '../../../services/staffService';
import styles from './StaffForm.module.css';

export default function StaffForm({ onClose, existingStaff }) {
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
  const isEditing = !!formData.id;
  const isValid = isEditing
    ? !!formData.employeeId
    : !!formData.firstName && !!formData.lastName && !!formData.employeeId;

  if (!isValid) {
    alert(isEditing
      ? 'Please fill out Employee ID before saving.'
      : 'Please fill out First Name, Last Name, and Employee ID before saving.');
    return;
  }

  // ✅ Weekly schedule validation
  for (let week of formData.schedule.weeks) {
    for (let day of Object.keys(week)) {
      const entry = week[day];
      const isChecked = entry?.enabled;

      const hasAnyField =
        entry?.location?.trim() || entry?.start?.trim() || entry?.hours?.trim();

      if (!isChecked && hasAnyField) {
        alert(`You have filled in ${day} without checking its box. Please check the box or clear the fields.`);
        return;
      }

      if (isChecked && (!entry?.location || !entry?.start || !entry?.hours)) {
        alert(`Please complete all fields for ${day} since it is checked.`);
        return;
      }
    }
  }

  try {
    if (formData.id) {
      await updateStaff(formData.id, formData);
      alert('Staff record updated.');
    } else {
      const newId = await createStaff(formData);
      alert('Staff record created.');
      setFormData((prev) => ({ ...prev, id: newId }));
    }
    onClose();
  } catch (error) {
    console.error('Error saving staff data:', error);
    alert('An error occurred while saving.');
  }
};

return (
  <div className={styles.overlay} onClick={(e) => {
    if (e.target === e.currentTarget) onClose();
  }}>
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.titleRow}>
          <h2 className={styles.modalTitle}>{existingStaff ? 'Edit Staff' : 'Add New Staff'}</h2>
          <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>

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
            Contact and Address Info
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'schedule' ? styles.active : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            Weekly Schedule
          </button>
        </div>

        <div className={styles.scrollableContent}>
          <StaffFormTabs
            activeTab={activeTab}
            formData={formData}
            setFormData={setFormData}
            isEditing={!!existingStaff}
          />
        </div>

        <div className={styles.formActions}>
          <button className={styles.saveButton} onClick={handleSave}>Save Staff Info</button>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  </div>
);
};
