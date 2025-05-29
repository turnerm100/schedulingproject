import React, { useState } from 'react';
import PatientDemographics from './PatientDemographics';
import TeamInfo from './TeamInfo';
import SpecialtyInfusionInfo from './SpecialtyInfusionInfo';
import NonSpecialtyTherapyInfo from './NonSpecialtyTherapyInfo';
import EmergencyContacts from './EmergencyContact';

const tabs = [
  'Demographics',
  'Team Info',
  'Specialty Infusion',
  'Non-Specialty Therapy',
  'Emergency Contacts',
];

export default function PatientFormTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <h2>Patient Form</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {tabs.map((label, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: '8px 16px',
              background: activeTab === index ? '#DAE9F8' : '#eee',
              borderBottom: activeTab === index ? '2px solid #153D64' : '1px solid #ccc',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 0 && <PatientDemographics />}
      {activeTab === 1 && <TeamInfo patientId="test-id-123" />}
      {activeTab === 2 && <SpecialtyInfusionInfo />}
      {activeTab === 3 && <NonSpecialtyTherapyInfo />}
      {activeTab === 4 && <EmergencyContacts />}
    </div>
  );
}
