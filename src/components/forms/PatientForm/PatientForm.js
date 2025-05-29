import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/config';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
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
          {activeTab === 'demographics' && (
            <>
              <div className={styles.row}>
                <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                <input name="mrn" placeholder="MRN#" value={formData.mrn} onChange={handleChange} />
              </div>
              <div className={styles.row}>
                <input name="dob" placeholder="DOB" value={formData.dob} onChange={handleChange} />
                <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
              </div>
              <div className={styles.row}>
                <input name="primaryPhone" placeholder="Primary Phone" value={formData.primaryPhone} onChange={handleChange} />
                <input name="secondaryPhone" placeholder="Secondary Phone" value={formData.secondaryPhone} onChange={handleChange} />
              </div>
              <div className={styles.row}>
                <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                <input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
                <input name="zip" placeholder="Zip" value={formData.zip} onChange={handleChange} />
              </div>
              <div className={styles.row}>
                <input name="pharmacyTeam" placeholder="Pharmacy Team" value={formData.pharmacyTeam} onChange={handleChange} />
                <input name="nurseTeam" placeholder="Nurse Team" value={formData.nurseTeam} onChange={handleChange} />
                <input name="status" placeholder="Status" value={formData.status} onChange={handleChange} />
              </div>
            </>
          )}

          {activeTab === 'infusion' && (
            <>
              <div className={styles.row}>
                <input name="specialtyTherapyType" placeholder="Specialty Therapy Type" value={formData.specialtyTherapyType} onChange={handleChange} />
                <input name="visitLocationSpecialty" placeholder="Visit Location Specialty" value={formData.visitLocationSpecialty} onChange={handleChange} />
                <input name="infusionFrequency" placeholder="Infusion Frequency" value={formData.infusionFrequency} onChange={handleChange} />
                <input name="nextSpecialtyInfusionDate" placeholder="Next Scheduled Specialty Infusion" value={formData.nextSpecialtyInfusionDate} onChange={handleChange} />
              </div>
              <div className={styles.row}>
                <input name="nextInfusionDue" placeholder="Next Infusion Due" value={formData.nextInfusionDue} onChange={handleChange} />
                <input name="nextInfusionConfirmed" placeholder="Next Inf Due Confirmed" value={formData.nextInfusionConfirmed} onChange={handleChange} />
                <input name="estimatedEndOfInfusion" placeholder="Est. End of Infusion Therapy" value={formData.estimatedEndOfInfusion} onChange={handleChange} />
              </div>
            </>
          )}

          {activeTab === 'homecare' && (
            <>
              <div className={styles.row}>
                <input name="homeTherapyType" placeholder="Home Therapy Type" value={formData.homeTherapyType} onChange={handleChange} />
                <input name="skilledRnVisitType" placeholder="Skilled RN Visit Type" value={formData.skilledRnVisitType} onChange={handleChange} />
                <input name="visitLocationNonSpecialty" placeholder="Visit Location Non Specialty" value={formData.visitLocationNonSpecialty} onChange={handleChange} />
              </div>
              <div className={styles.row}>
                <input name="visitFrequency" placeholder="Visit Frequency" value={formData.visitFrequency} onChange={handleChange} />
                <input name="nextSkilledRnVisitDate" placeholder="Next Scheduled Skilled RN Visit" value={formData.nextSkilledRnVisitDate} onChange={handleChange} />
                <input name="nextVisitDue" placeholder="Next Visit Due" value={formData.nextVisitDue} onChange={handleChange} />
                <input name="estimatedEndOfTherapy" placeholder="Estimated End Date of Therapy" value={formData.estimatedEndOfTherapy} onChange={handleChange} />
              </div>
            </>
          )}

          {activeTab === 'notes' && (
            <div className={styles.row}>
              <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
            </div>
          )}

          <div className={styles.actions}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
