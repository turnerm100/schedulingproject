import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/config';
import { doc, setDoc, addDoc, deleteDoc, collection, getDoc } from 'firebase/firestore';
import styles from './PatientForm.module.css';

export default function PatientForm({ existingPatient, onClose }) {
  const [formData, setFormData] = useState({
    mrn: '', lastName: '', firstName: '', dob: '', gender: '',
    phones: [{ type: 'Primary', number: '' }],
    address: { line1: '', line2: '', city: '', state: '', zip: '' },
    shippingAddress: { line1: '', line2: '', city: '', state: '', zip: '' },
    billingAddress: { line1: '', line2: '', city: '', state: '', zip: '' },
    pharmacyTeam: '', nurseTeam: '', status: '',
    notes: '', specialtyTherapyType: '', visitLocationSpecialty: '', infusionFrequency: '',
    nextSpecialtyInfusionDate: '', nextInfusionDue: '', nextInfusionConfirmed: '', estimatedEndOfInfusion: '',
    homeTherapyType: '', skilledRnVisitType: '', visitLocationNonSpecialty: '', visitFrequency: '',
    nextSkilledRnVisitDate: '', nextVisitDue: '', estimatedEndOfTherapy: ''
  });

const [dropdowns, setDropdowns] = useState({
  gender: [],
  pharmacyTeam: [],
  nurseTeam: [],
  status: [],
  specialtyTherapyType: [],
  visitLocation: [],
  infusionFrequency: [],
  visitLocationSpecialty: [],
  visitLocationNonSpecialty: [],
  skilledRnVisitType: [],
  homeTherapyType: [],
  visitFrequency: []
});

  const [activeTab, setActiveTab] = useState('demographics');

  useEffect(() => {
    if (existingPatient) setFormData(existingPatient);
  }, [existingPatient]);

  useEffect(() => {
    const loadDropdowns = async () => {
      const keys = Object.keys(dropdowns);
      const loaded = {};
      for (const key of keys) {
        const snap = await getDoc(doc(db, 'dropdownOptions', key));
        loaded[key] = snap.exists() ? snap.data().options : [];
      }
setDropdowns((prev) => {
  const updated = { ...prev };
  Object.keys(prev).forEach(key => {
    updated[key] = loaded[key] || [];
  });
  return updated;
});

    };
    loadDropdowns();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (index, key, value) => {
    const updatedPhones = [...formData.phones];
    updatedPhones[index][key] = value;
    setFormData((prev) => ({ ...prev, phones: updatedPhones }));
  };

  const addPhone = () => {
    setFormData((prev) => ({ ...prev, phones: [...prev.phones, { type: '', number: '' }] }));
  };

  const removePhone = (index) => {
    const updatedPhones = formData.phones.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, phones: updatedPhones }));
  };

  const handleAddressChange = (section, key, value) => {
    setFormData((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
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

const renderDropdown = (id, label, options = []) => {
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <select id={id} name={id} value={formData[id] || ''} onChange={handleChange}>
        <option value="">Select...</option>
        {safeOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

  const TabButton = ({ tab, label }) => (
    <button type="button" className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`} onClick={() => setActiveTab(tab)}>
      {label}
    </button>
  );

  // ✅ SAFETY CHECK — place here
  if (!dropdowns || typeof dropdowns !== 'object') {
    return <div>Loading form...</div>;
  }

  console.log('Dropdowns state:', dropdowns); // ✅ Place here

  // 👇 Existing JSX starts here
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
                  <div className={styles.field}><label>Last Name</label><input name="lastName" value={formData.lastName} onChange={handleChange} /></div>
                  <div className={styles.field}><label>First Name</label><input name="firstName" value={formData.firstName} onChange={handleChange} /></div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}><label>DOB</label><input name="dob" value={formData.dob} onChange={handleChange} /></div>
                  <div className={styles.field}><label>MRN#</label><input name="mrn" value={formData.mrn} onChange={handleChange} /></div>
                  {renderDropdown('gender', 'Gender', dropdowns.gender)}
                </div>

                {formData.phones.map((phone, i) => (
                  <div className={styles.row} key={i}>
                    <div className={styles.field}><label>Type</label><input value={phone.type} onChange={e => handlePhoneChange(i, 'type', e.target.value)} /></div>
                    <div className={styles.field}><label>Number</label><input value={phone.number} onChange={e => handlePhoneChange(i, 'number', e.target.value)} /></div>
                    <button type="button" onClick={() => removePhone(i)}>Remove</button>
                  </div>
                ))}
                <button type="button" onClick={addPhone}>+ Add Phone</button>

                <h4>Primary Address</h4>
                <div className={styles.row}>
                  <div className={styles.field}><label>Line 1</label><input value={formData.address.line1} onChange={e => handleAddressChange('address', 'line1', e.target.value)} /></div>
                  <div className={styles.field}><label>Line 2</label><input value={formData.address.line2} onChange={e => handleAddressChange('address', 'line2', e.target.value)} /></div>
                  <div className={styles.field}><label>City</label><input value={formData.address.city} onChange={e => handleAddressChange('address', 'city', e.target.value)} /></div>
                  <div className={styles.field}><label>State</label><input value={formData.address.state} onChange={e => handleAddressChange('address', 'state', e.target.value)} /></div>
                  <div className={styles.field}><label>Zip</label><input value={formData.address.zip} onChange={e => handleAddressChange('address', 'zip', e.target.value)} /></div>
                </div>

                <h4>Shipping Address</h4>
                <div className={styles.row}>
                  <div className={styles.field}><label>Line 1</label><input value={formData.shippingAddress.line1} onChange={e => handleAddressChange('shippingAddress', 'line1', e.target.value)} /></div>
                  <div className={styles.field}><label>Line 2</label><input value={formData.shippingAddress.line2} onChange={e => handleAddressChange('shippingAddress', 'line2', e.target.value)} /></div>
                  <div className={styles.field}><label>City</label><input value={formData.shippingAddress.city} onChange={e => handleAddressChange('shippingAddress', 'city', e.target.value)} /></div>
                  <div className={styles.field}><label>State</label><input value={formData.shippingAddress.state} onChange={e => handleAddressChange('shippingAddress', 'state', e.target.value)} /></div>
                  <div className={styles.field}><label>Zip</label><input value={formData.shippingAddress.zip} onChange={e => handleAddressChange('shippingAddress', 'zip', e.target.value)} /></div>
                </div>

                <h4>Billing Address</h4>
                <div className={styles.row}>
                  <div className={styles.field}><label>Line 1</label><input value={formData.billingAddress.line1} onChange={e => handleAddressChange('billingAddress', 'line1', e.target.value)} /></div>
                  <div className={styles.field}><label>Line 2</label><input value={formData.billingAddress.line2} onChange={e => handleAddressChange('billingAddress', 'line2', e.target.value)} /></div>
                  <div className={styles.field}><label>City</label><input value={formData.billingAddress.city} onChange={e => handleAddressChange('billingAddress', 'city', e.target.value)} /></div>
                  <div className={styles.field}><label>State</label><input value={formData.billingAddress.state} onChange={e => handleAddressChange('billingAddress', 'state', e.target.value)} /></div>
                  <div className={styles.field}><label>Zip</label><input value={formData.billingAddress.zip} onChange={e => handleAddressChange('billingAddress', 'zip', e.target.value)} /></div>
                </div>

                <div className={styles.row}>
                  {renderDropdown('pharmacyTeam', 'Pharmacy Team', dropdowns.pharmacyTeam)}
                  {renderDropdown('nurseTeam', 'Nurse Team', dropdowns.nurseTeam)}
                  {renderDropdown('status', 'Status', dropdowns.status)}
                </div>
              </>
            )}

{activeTab === 'infusion' && (
  <>
    {renderDropdown('specialtyTherapyType', 'Specialty Therapy Type', dropdowns.specialtyTherapyType)}
    {renderDropdown('visitLocation', 'Visit Location', dropdowns.visitLocation)}
    {renderDropdown('infusionFrequency', 'Infusion Frequency', dropdowns.infusionFrequency)}

    <div className={styles.row}>
      <div className={styles.field}>
        <label>Next Scheduled Specialty Infusion</label>
        <input type="date" name="nextSpecialtyInfusionDate" value={formData.nextSpecialtyInfusionDate} onChange={handleChange} />
      </div>
      <div className={styles.field}>
        <label>Next Infusion Due</label>
        <input type="date" name="nextInfusionDue" value={formData.nextInfusionDue} onChange={handleChange} />
      </div>
      <div className={styles.field}>
        <label>Estimated End Date of Therapy</label>
        <input type="date" name="estimatedEndOfInfusion" value={formData.estimatedEndOfInfusion} onChange={handleChange} />
      </div>
    </div>
  </>
)}

{activeTab === 'homecare' && (
  <>
    <div className={styles.row}>
      {renderDropdown('homeTherapyType', 'Home Therapy Type', dropdowns.homeTherapyType)}
      {renderDropdown('skilledRnVisitType', 'Skilled RN Visit Type', dropdowns.skilledRnVisitType)}
      {renderDropdown('visitLocationNonSpecialty', 'Visit Location Non Specialty', dropdowns.visitLocationNonSpecialty)}
    </div>
    <div className={styles.row}>
      {renderDropdown('visitFrequency', 'Visit Frequency', dropdowns.visitFrequency)}
    </div>
    <div className={styles.row}>
      <div className={styles.field}>
        <label>Next Scheduled Skilled RN Visit</label>
        <input type="date" name="nextSkilledRnVisitDate" value={formData.nextSkilledRnVisitDate} onChange={handleChange} />
      </div>
      <div className={styles.field}>
        <label>Next Visit Due</label>
        <input type="date" name="nextVisitDue" value={formData.nextVisitDue} onChange={handleChange} />
      </div>
      <div className={styles.field}>
        <label>Estimated End of Therapy</label>
        <input type="date" name="estimatedEndOfTherapy" value={formData.estimatedEndOfTherapy} onChange={handleChange} />
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
              <button type="button" onClick={handleDeactivate} style={{ backgroundColor: '#b00020', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', marginRight: 'auto', cursor: 'pointer' }}>
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
