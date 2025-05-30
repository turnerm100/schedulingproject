import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import PatientForm from '../forms/PatientForm/PatientForm';

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchPatients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'patients'));
      const patientData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => a.lastName?.localeCompare(b.lastName || ''));
      setPatients(patientData);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleNewPatient = () => {
    setSelectedPatient(null);
    setShowForm(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Patient List</h2>

      <button
        onClick={handleNewPatient}
        style={{
          marginBottom: '15px',
          padding: '8px 16px',
          backgroundColor: '#153D64',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        + New Patient
      </button>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ minWidth: '1600px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              {[
                'Name', 'DOB', 'MRN#', 'Gender', 'Primary Phone',
                'Secondary Phone', 'Pharm Team', 'Nurse Team', 'Status', 'Notes',
                'Specialty Therapy Type', 'Visit Location Specialty', 'Infusion Frequency',
                'Date of Next Scheduled Specialty Infusion', 'Next Infusion Due',
                'Next Inf Due Confirmed', 'Est. End of Infusion Therapy', 'Home Therapy Type',
                'Skilled RN Visit Type', 'Visit Location Non Specialty', 'Visit Frequency',
                'Date of next scheduled Skilled RN Visit', 'Next Visit Due', 'Estimated End Date of Therapy'
              ].map((header, idx) => (
                <th key={idx} style={{ borderBottom: '1px solid #ccc', padding: '10px', whiteSpace: 'nowrap' }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td style={{ padding: '8px' }}>
                  <button
                    onClick={() => handleEdit(p)}
                    style={{ background: 'none', border: 'none', color: '#153D64', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    {p.lastName}, {p.firstName}
                  </button>
                </td>
                <td style={{ padding: '8px' }}>{p.dob}</td>
                <td style={{ padding: '8px' }}>{p.mrn}</td>
                <td style={{ padding: '8px' }}>{p.gender}</td>
                <td style={{ padding: '8px' }}>{p.primaryPhone}</td>
                <td style={{ padding: '8px' }}>{p.secondaryPhone}</td>
                <td style={{ padding: '8px' }}>{p.pharmacyTeam}</td>
                <td style={{ padding: '8px' }}>{p.nurseTeam}</td>
                <td style={{ padding: '8px' }}>{p.status}</td>
                <td style={{ padding: '8px' }}>{p.notes}</td>
                <td style={{ padding: '8px' }}>{p.specialtyTherapyType}</td>
                <td style={{ padding: '8px' }}>{p.visitLocationSpecialty}</td>
                <td style={{ padding: '8px' }}>{p.infusionFrequency}</td>
                <td style={{ padding: '8px' }}>{p.nextScheduledSpecialtyInfusion}</td>
                <td style={{ padding: '8px' }}>{p.nextInfusionDue}</td>
                <td style={{ padding: '8px' }}>{p.infusionDueConfirmed}</td>
                <td style={{ padding: '8px' }}>{p.estimatedEndOfInfusion}</td>
                <td style={{ padding: '8px' }}>{p.homeTherapyType}</td>
                <td style={{ padding: '8px' }}>{p.skilledRnVisitType}</td>
                <td style={{ padding: '8px' }}>{p.visitLocationNonSpecialty}</td>
                <td style={{ padding: '8px' }}>{p.visitFrequency}</td>
                <td style={{ padding: '8px' }}>{p.nextScheduledRnVisit}</td>
                <td style={{ padding: '8px' }}>{p.nextVisitDue}</td>
                <td style={{ padding: '8px' }}>{p.estimatedEndDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <PatientForm
          existingPatient={selectedPatient}
          onClose={() => {
            setShowForm(false);
            setSelectedPatient(null);
            fetchPatients();
          }}
        />
      )}
    </div>
  );
}
