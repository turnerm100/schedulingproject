// src/components/DeactivatedPatientsList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import styles from './DeactivatedPatientsList.module.css';

export default function DeactivatedPatientsList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeactivatedPatients = async () => {
      try {
        const q = query(
          collection(db, 'patients'),
          where('status', '==', 'deactivated') // or `inactive` depending on your setup
        );
        const querySnapshot = await getDocs(q);
        const patientList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientList);
      } catch (error) {
        console.error('Error fetching deactivated patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeactivatedPatients();
  }, []);

  if (loading) return <p>Loading deactivated patients...</p>;

  return (
    <div className={styles.container}>
      <h2>Deactivated Patients</h2>
      {patients.length === 0 ? (
        <p>No deactivated patients found.</p>
      ) : (
        <ul className={styles.list}>
          {patients.map((patient) => (
            <li key={patient.id} className={styles.item}>
              <strong>{patient.firstName} {patient.lastName}</strong> — MRN: {patient.mrn}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
