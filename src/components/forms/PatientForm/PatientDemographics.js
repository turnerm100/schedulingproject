//PatientDemographics.js//

import React, { useState } from 'react';
import { db } from '../../../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function PatientDemographics() {
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    mrn: '',
    dob: '',
    gender: '',
    primaryPhone: '',
    secondaryPhone: '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(db, 'patients'), {
        ...form,
        dob: form.dob ? Timestamp.fromDate(new Date(form.dob)) : null,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      setStatus(`✅ Saved! Patient ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error saving patient:', error);
      setStatus('❌ Error saving patient.');
    }
  };

  return (
    <div>
      <h3>Patient Demographics</h3>
      <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} /><br />
      <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} /><br />
      <input name="mrn" placeholder="MRN" value={form.mrn} onChange={handleChange} /><br />
      <input name="dob" type="date" value={form.dob} onChange={handleChange} /><br />
      <select name="gender" value={form.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select><br />
      <input name="primaryPhone" placeholder="Primary Phone" value={form.primaryPhone} onChange={handleChange} /><br />
      <input name="secondaryPhone" placeholder="Secondary Phone" value={form.secondaryPhone} onChange={handleChange} /><br /><br />

      <button onClick={handleSave}>Save Patient</button>
      {status && <p>{status}</p>}
    </div>
  );
}
