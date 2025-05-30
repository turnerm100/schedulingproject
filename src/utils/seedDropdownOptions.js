// src/utils/seedDropdownOptions.js
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const seedDropdowns = async () => {
  const dropdownData = {
    gender: ['Male', 'Female', 'Other'],
    pharmacyTeam: ['Team A', 'Team B', 'Team C'],
    nurseTeam: ['Nurse Group 1', 'Nurse Group 2'],
    status: ['Active', 'Inactive', 'Discharged'],
    specialtyTherapyType: ['Blincyto', 'IVIG', 'Remicade'],
    visitLocation: ['Home', 'Clinic', 'Hospital'],
    infusionFrequency: ['Weekly', 'Biweekly', 'Monthly'],

    // ✅ Home Care Info dropdowns
    homeTherapyType: ['IVIG', 'Blincyto', 'Zinplava', 'Other'],
    skilledRnVisitType: ['Routine', 'Urgent', 'Follow-Up', 'Other'],
    visitLocationNonSpecialty: ['Home', 'Clinic', 'Hospital', 'SNF'],
    visitFrequency: ['Weekly', 'Twice Weekly', 'Every Other Week', 'Monthly']
  };

  for (const [key, options] of Object.entries(dropdownData)) {
    try {
      await setDoc(doc(db, 'dropdownOptions', key), { options });
      console.log(`✅ Seeded dropdown: ${key}`);
    } catch (err) {
      console.error(`❌ Error seeding "${key}":`, err);
    }
  }
};

export default seedDropdowns;
