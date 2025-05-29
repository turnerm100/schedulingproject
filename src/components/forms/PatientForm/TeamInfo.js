import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

export default function TeamInfo({ patientId }) {
  const [pharmacyTeam, setPharmacyTeam] = useState('');
  const [nurseTeam, setNurseTeam] = useState('');
  const [status, setStatus] = useState('');

  const handleSave = async () => {
    if (!patientId) {
      alert("No patient selected.");
      return;
    }

    try {
      const docRef = doc(db, 'patients', patientId);
      await setDoc(
        docRef,
        {
          teamInfo: {
            pharmacyTeam,
            nurseTeam,
            status,
          },
        },
        { merge: true }
      );
      alert('Team Info saved!');
    } catch (error) {
      console.error('Error saving team info:', error);
      alert('Failed to save team info.');
    }
  };

  return (
    <div>
      <h3>Team Information</h3>
      <div>
        <label>Pharmacy Team:</label>
        <input
          type="text"
          value={pharmacyTeam}
          onChange={(e) => setPharmacyTeam(e.target.value)}
        />
      </div>
      <div>
        <label>Nurse Team:</label>
        <input
          type="text"
          value={nurseTeam}
          onChange={(e) => setNurseTeam(e.target.value)}
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save Team Info</button>
    </div>
  );
}
