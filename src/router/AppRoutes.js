/// src/router/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../components/MainLayout';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import PharmacyPage from '../components/PharmacyPage';

import AdminPage from '../components/admin/AdminPage';
import AdminSettings from '../components/admin/settings/AdminSettings';
import AdminUsers from '../components/admin/AdminUsers';
import DropdownSettings from '../components/admin/settings/DropdownSettings';

import PatientPage from '../components/patients/PatientPage';
import PatientList from '../components/patients/PatientList';
import VisitInfo from '../components/patients/VisitInfo';
import DeactivatedPatientsList from '../components/patients/DeactivatedPatientsList';

import StaffPage from '../components/staff/StaffPage';
import StaffManager from '../components/staff/StaffManager';
import StaffCalendar from '../components/staff/StaffCalendar';
import StaffFormPage from '../pages/staff/StaffFormPage'; // ✅ Add this if not yet imported

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="pharmacy" element={<PharmacyPage />} />

      <Route path="admin" element={<AdminPage />}>
        <Route path="settings" element={<AdminSettings />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="dropdown-settings" element={<DropdownSettings />} />
      </Route>

      <Route path="patients" element={<PatientPage />}>
        <Route path="list" element={<PatientList />} />
        <Route path="visit-info" element={<VisitInfo />} />
        <Route path="deactivated" element={<DeactivatedPatientsList />} />
      </Route>

      <Route path="staff" element={<StaffPage />}>
        <Route index element={<StaffManager />} />            {/* default route */}
        <Route path="list" element={<StaffManager />} />
        <Route path="calendar" element={<StaffCalendar />} />
        <Route path="new" element={<StaffFormPage />} />      {/* staff form route */}
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
