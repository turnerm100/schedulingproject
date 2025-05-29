import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc
} from 'firebase/firestore';

export default function DeactivatedPatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchDeactivatedPatients = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'deactivatedPatients'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPatients(data);
      } catch (error) {
        console.error('Error fetching deactivated patients:', error);
      }
    };

    fetchDeactivatedPatients();
  }, []);

  const handleReactivate = async (patient) => {
    if (!window.confirm(`Reactivate ${patient.lastName}, ${patient.firstName}?`)) return;

    try {
      // Move to active patients
      await setDoc(doc(db, 'patients', patient.id), patient);

      // Remove from deactivated list
      await deleteDoc(doc(db, 'deactivatedPatients', patient.id));

      // Refresh list
      setPatients(prev => prev.filter(p => p.id !== patient.id));
    } catch (error) {
      console.error('Error reactivating patient:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Deactivated Patients</h2>

      {patients.length === 0 ? (
        <p>No deactivated patients found.</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Name</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>DOB</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>MRN#</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td style={{ padding: '8px' }}>{p.lastName}, {p.firstName}</td>
                <td style={{ padding: '8px' }}>{p.dob}</td>
                <td style={{ padding: '8px' }}>{p.mrn}</td>
                <td style={{ padding: '8px' }}>
                  <button
                    onClick={() => handleReactivate(p)}
                    style={{
                      backgroundColor: '#153D64',
                      color: 'white',
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Reactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
