import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import PatientForm from './forms/PatientForm/PatientForm';

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  // Fetch patients from Firestore
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'patients'));
        const patientList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setPatients(patientList);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, [showForm]); // Refresh list when form closes

  const handleAddPatient = () => {
    setEditingPatient(null);
    setShowForm(true);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>

      <button onClick={handleAddPatient} style={{ marginBottom: '20px' }}>
        + Add Patient
      </button>

      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <ul>
          {patients.map((pt) => (
            <li key={pt.id}>
              {pt.firstName} {pt.lastName}{' '}
              <button onClick={() => handleEditPatient(pt)}>Edit</button>
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <PatientForm
          existingPatient={editingPatient}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
