// src/components/staff/StaffManager.js

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../../firebase/config';
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import StaffForm from '../forms/staff/StaffForm';
import './StaffManager.css';

export default function StaffManager() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view') || 'active';

  const [activeStaff, setActiveStaff] = useState([]);
  const [inactiveStaff, setInactiveStaff] = useState([]);
  const [archivedStaff, setArchivedStaff] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const currentUserEmail = 'admin@example.com';

  useEffect(() => {
    fetchAllStaff();
  }, []);

  const fetchAllStaff = async () => {
    const [activeSnap, inactiveSnap, deletedSnap] = await Promise.all([
      getDocs(collection(db, 'staff')),
      getDocs(collection(db, 'inactiveStaff')),
      getDocs(collection(db, 'deletedStaffArchive')),
    ]);

    setActiveStaff(activeSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setInactiveStaff(inactiveSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setArchivedStaff(deletedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const onEditStaff = (staff) => {
  setSelectedStaff(staff);
  setShowForm(true);
};

  const deactivateStaff = async (staff) => {
    await setDoc(doc(db, 'inactiveStaff', staff.id), {
      ...staff,
      status: 'inactive',
      updatedAt: Timestamp.now(),
    });
    await deleteDoc(doc(db, 'staff', staff.id));
    fetchAllStaff();
  };

  const reactivateStaff = async (staff) => {
    await setDoc(doc(db, 'staff', staff.id), {
      ...staff,
      status: 'active',
      updatedAt: Timestamp.now(),
    });
    await deleteDoc(doc(db, 'inactiveStaff', staff.id));
    fetchAllStaff();
  };

  const deleteStaff = async (staff, source) => {
    await setDoc(doc(db, 'deletedStaffArchive', staff.id), {
      ...staff,
      status: 'deleted',
      deletedAt: Timestamp.now(),
      deletedBy: currentUserEmail,
    });
    await deleteDoc(doc(db, source, staff.id));
    fetchAllStaff();
  };

  const renderStaffTable = (list, type) => (
    <table className="staff-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Team</th>
          <th>FTE</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list.map((staff) => (
          <tr key={staff.id}>
            <td>
  <button
    className="link-button"
    onClick={() => onEditStaff(staff)}
    style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}
  >
    {staff.fullName || `${staff.firstName} ${staff.lastName}`}
  </button>
</td>
            <td>{staff.position || staff.positionTitle}</td>
            <td>{staff.schedulingTeam}</td>
            <td>{staff.fte}</td>
            <td>
              {type === 'active' && (
                <>
                  <button onClick={() => deactivateStaff(staff)}>Deactivate</button>
                  <button onClick={() => deleteStaff(staff, 'staff')}>Archive</button>
                </>
              )}
              {type === 'inactive' && (
                <>
                  <button onClick={() => reactivateStaff(staff)}>Reactivate</button>
                  <button onClick={() => deleteStaff(staff, 'inactiveStaff')}>Archive</button>
                </>
              )}
              {type === 'archived' && (
                <span style={{ fontSize: '12px' }}>
                  Archived by {staff.deletedBy || 'unknown'}<br />
                  on {staff.deletedAt?.toDate().toLocaleDateString()}
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>
          {view === 'active' && 'Active Staff'}
          {view === 'inactive' && 'Inactive Staff'}
          {view === 'deleted' && 'Archived Staff'}
        </h2>

        {view === 'active' && (
          <button onClick={() => {
            setSelectedStaff(null);
            setShowForm(true);
          }}>
            + Add New Staff
          </button>
        )}
      </div>

      {view === 'active' && renderStaffTable(activeStaff, 'active')}
      {view === 'inactive' && renderStaffTable(inactiveStaff, 'inactive')}
      {view === 'deleted' && renderStaffTable(archivedStaff, 'archived')}

      {showForm && (
        <StaffForm
          onClose={() => {
            setShowForm(false);
            fetchAllStaff(); // Refresh list after save
          }}
          existingStaff={selectedStaff}
        />
      )}
    </div>
  );
}
