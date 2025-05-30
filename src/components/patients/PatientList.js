// src/components/patients/PatientList.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import './PatientList.css'; // Optional: for styling

export default function PatientList({ openEditModal }) {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'patients'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(data);
    });

    return () => unsubscribe();
  }, []);

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.lastName}, ${patient.firstName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) ||
      (patient.mrn && patient.mrn.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="patient-list-container">
      <div className="patient-list-header">
        <h2>Patient List</h2>
        <div className="patient-list-controls">
          <input
            type="text"
            placeholder="Search by name or MRN"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="new-patient-button" onClick={() => openEditModal(null)}>
            + New Patient
          </button>
        </div>
      </div>

      <table className="patient-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>MRN</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
<tbody>
  {filteredPatients.length === 0 ? (
    <tr>
      <td colSpan="6" style={{ textAlign: 'center' }}>No patients found</td>
    </tr>
  ) : (
    filteredPatients.map((patient) => (
      <tr key={patient.id}>
        <td>
          <button
            className="name-link"
            onClick={() => openEditModal(patient)} // ✅ opens the patient form
          >
            {patient.lastName}, {patient.firstName}
          </button>
        </td>
        <td>{patient.mrn}</td>
        <td>{patient.dob}</td>
        <td>{patient.gender}</td>
        <td>{patient.primaryPhone}</td>
        <td>{patient.status || 'Active'}</td>
      </tr>
    ))
  )}
</tbody>
      </table>
    </div>
  );
}
