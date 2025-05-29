import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/config';
import { doc, setDoc, addDoc, deleteDoc, collection } from 'firebase/firestore';
import styles from './PatientForm.module.css';

export default function PatientForm({ existingPatient, onClose }) {
  const [formData, setFormData] = useState({
    mrn: '',
    lastName: '',
    firstName: '',
    dob: '',
    gender: '',
    primaryPhone: '',
    secondaryPhone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    pharmacyTeam: '',
    nurseTeam: '',
    status: '',
    notes: '',
    specialtyTherapyType: '',
    visitLocationSpecialty: '',
    infusionFrequency: '',
    nextSpecialtyInfusionDate: '',
    nextInfusionDue: '',
    nextInfusionConfirmed: '',
    estimatedEndOfInfusion: '',
    homeTherapyType: '',
    skilledRnVisitType: '',
    visitLocationNonSpecialty: '',
    visitFrequency: '',
    nextSkilledRnVisitDate: '',
    nextVisitDue: '',
    estimatedEndOfTherapy: ''
  });

  const [activeTab, setActiveTab] = useState('demographics');

  useEffect(() => {
    if (existingPatient) {
      setFormData(existingPatient);
    }
  }, [existingPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingPatient?.id) {
        await setDoc(doc(db, 'patients', existingPatient.id), formData);
      } else {
        await addDoc(collection(db, 'patients'), formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  const handleDeactivate = async () => {
    if (!existingPatient?.id) return;
    if (window.confirm('Are you sure you want to deactivate this patient?')) {
      try {
        await setDoc(doc(db, 'deactivatedPatients', existingPatient.id), formData);
        await deleteDoc(doc(db, 'patients', existingPatient.id));
        onClose();
      } catch (error) {
        console.error('Error deactivating patient:', error);
      }
    }
  };

  const TabButton = ({ tab, label }) => (
    <button
      type="button"
      className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
      onClick={() => setActiveTab(tab)}
    >
      {label}
    </button>
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{existingPatient ? 'Edit Patient' : 'Add Patient'}</h2>
        <div className={styles.tabContainer}>
          <TabButton tab="demographics" label="Demographics" />
          <TabButton tab="infusion" label="Infusion Info" />
          <TabButton tab="homecare" label="Home Care Info" />
          <TabButton tab="notes" label="Notes" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formContent}>
            {activeTab === 'demographics' && (
              <>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="lastName" className={styles.label}>Last Name</label>
                    <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="firstName" className={styles.label}>First Name</label>
                    <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="dob" className={styles.label}>DOB</label>
                    <input id="dob" name="dob" value={formData.dob} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="mrn" className={styles.label}>MRN#</label>
                    <input id="mrn" name="mrn" value={formData.mrn} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="gender" className={styles.label}>Gender</label>
                    <input id="gender" name="gender" value={formData.gender} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="primaryPhone" className={styles.label}>Primary Phone</label>
                    <input id="primaryPhone" name="primaryPhone" value={formData.primaryPhone} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="secondaryPhone" className={styles.label}>Secondary Phone</label>
                    <input id="secondaryPhone" name="secondaryPhone" value={formData.secondaryPhone} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="address" className={styles.label}>Address</label>
                    <input id="address" name="address" value={formData.address} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="city" className={styles.label}>City</label>
                    <input id="city" name="city" value={formData.city} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="state" className={styles.label}>State</label>
                    <input id="state" name="state" value={formData.state} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="zip" className={styles.label}>Zip</label>
                    <input id="zip" name="zip" value={formData.zip} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="pharmacyTeam" className={styles.label}>Pharmacy Team</label>
                    <input id="pharmacyTeam" name="pharmacyTeam" value={formData.pharmacyTeam} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="nurseTeam" className={styles.label}>Nurse Team</label>
                    <input id="nurseTeam" name="nurseTeam" value={formData.nurseTeam} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="status" className={styles.label}>Status</label>
                    <input id="status" name="status" value={formData.status} onChange={handleChange} />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'infusion' && (
              <>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="specialtyTherapyType" className={styles.label}>Specialty Therapy Type</label>
                    <input id="specialtyTherapyType" name="specialtyTherapyType" value={formData.specialtyTherapyType} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="visitLocationSpecialty" className={styles.label}>Visit Location Specialty</label>
                    <input id="visitLocationSpecialty" name="visitLocationSpecialty" value={formData.visitLocationSpecialty} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="infusionFrequency" className={styles.label}>Infusion Frequency</label>
                    <input id="infusionFrequency" name="infusionFrequency" value={formData.infusionFrequency} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="nextSpecialtyInfusionDate" className={styles.label}>Next Scheduled Specialty Infusion</label>
                    <input id="nextSpecialtyInfusionDate" name="nextSpecialtyInfusionDate" value={formData.nextSpecialtyInfusionDate} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="nextInfusionDue" className={styles.label}>Next Infusion Due</label>
                    <input id="nextInfusionDue" name="nextInfusionDue" value={formData.nextInfusionDue} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="nextInfusionConfirmed" className={styles.label}>Next Inf Due Confirmed</label>
                    <input id="nextInfusionConfirmed" name="nextInfusionConfirmed" value={formData.nextInfusionConfirmed} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="estimatedEndOfInfusion" className={styles.label}>Est. End of Infusion Therapy</label>
                    <input id="estimatedEndOfInfusion" name="estimatedEndOfInfusion" value={formData.estimatedEndOfInfusion} onChange={handleChange} />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'homecare' && (
              <>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="homeTherapyType" className={styles.label}>Home Therapy Type</label>
                    <input id="homeTherapyType" name="homeTherapyType" value={formData.homeTherapyType} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="skilledRnVisitType" className={styles.label}>Skilled RN Visit Type</label>
                    <input id="skilledRnVisitType" name="skilledRnVisitType" value={formData.skilledRnVisitType} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="visitLocationNonSpecialty" className={styles.label}>Visit Location Non Specialty</label>
                    <input id="visitLocationNonSpecialty" name="visitLocationNonSpecialty" value={formData.visitLocationNonSpecialty} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="visitFrequency" className={styles.label}>Visit Frequency</label>
                    <input id="visitFrequency" name="visitFrequency" value={formData.visitFrequency} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="nextSkilledRnVisitDate" className={styles.label}>Next Scheduled Skilled RN Visit</label>
                    <input id="nextSkilledRnVisitDate" name="nextSkilledRnVisitDate" value={formData.nextSkilledRnVisitDate} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="nextVisitDue" className={styles.label}>Next Visit Due</label>
                    <input id="nextVisitDue" name="nextVisitDue" value={formData.nextVisitDue} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="estimatedEndOfTherapy" className={styles.label}>Estimated End Date of Therapy</label>
                    <input id="estimatedEndOfTherapy" name="estimatedEndOfTherapy" value={formData.estimatedEndOfTherapy} onChange={handleChange} />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'notes' && (
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="notes" className={styles.label}>Notes</label>
                  <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} />
                </div>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            {existingPatient?.id && (
              <button
                type="button"
                onClick={handleDeactivate}
                style={{
                  backgroundColor: '#b00020',
                  color: 'white',
                  padding: '8px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  marginRight: 'auto',
                  cursor: 'pointer'
                }}
              >
                Deactivate
              </button>
            )}
<button type="submit" className={styles.primaryButton}>Save</button>
<button type="button" onClick={onClose} className={styles.primaryButton}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}