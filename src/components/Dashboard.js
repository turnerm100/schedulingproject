import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Dashboard.css';

export default function Dashboard() {
  const [todayVisits, setTodayVisits] = useState([]);
  const [staffToday, setStaffToday] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayData = async () => {
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

      const visitsRef = collection(db, 'visits');
      const staffRef = collection(db, 'staffSchedules');

      const visitQuery = query(visitsRef, where('date', '==', today));
      const staffQuery = query(staffRef, where('date', '==', today));

      const [visitSnap, staffSnap] = await Promise.all([
        getDocs(visitQuery),
        getDocs(staffQuery),
      ]);

      setTodayVisits(visitSnap.docs.map(doc => doc.data()));
      setStaffToday(staffSnap.docs.map(doc => doc.data()));
      setLoading(false);
    };

    fetchTodayData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="analytics-cards">
            <div className="card">Visits Today: {todayVisits.length}</div>
            <div className="card">Staff Scheduled: {staffToday.length}</div>
          </div>

          <h2>Today's Visits</h2>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Time</th>
                <th>Staff</th>
                <th>Visit Type</th>
              </tr>
            </thead>
            <tbody>
              {todayVisits.map((visit, index) => (
                <tr key={index}>
                  <td>{visit.patientName}</td>
                  <td>{visit.time}</td>
                  <td>{visit.assignedStaff}</td>
                  <td>{visit.type}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Staff On Duty</h2>
          <ul>
            {staffToday.map((staff, index) => (
              <li key={index}>
                {staff.name} – {staff.role} ({staff.shiftStart}–{staff.shiftEnd})
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
