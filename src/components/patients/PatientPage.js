import React, { useState } from 'react';
import PatientList from './PatientList';
import PatientForm from '../forms/PatientForm/PatientForm';

export default function PatientPage() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const openEditModal = (patient) => {
    setSelectedPatient(patient || null);
    setShowForm(true);
  };

  const closeModal = () => {
    setSelectedPatient(null);
    setShowForm(false);
  };

  return (
    <div>
      <PatientList openEditModal={openEditModal} />

      {showForm && (
        <PatientForm existingPatient={selectedPatient} onClose={closeModal} />
      )}
    </div>
  );
}
