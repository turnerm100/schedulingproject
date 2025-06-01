import { db } from '../firebase/config';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// 🔹 Fetch all active staff
export async function getAllStaff() {
  const staffCollection = collection(db, 'staff');
  const snapshot = await getDocs(staffCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// 🔹 Get a specific staff member by ID
export async function getStaffById(staffId) {
  const staffDoc = doc(db, 'staff', staffId);
  const snapshot = await getDoc(staffDoc);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

// 🔹 Add a new staff member
export async function createStaff(staffData) {
  const staffCollection = collection(db, 'staff');
  const docRef = await addDoc(staffCollection, staffData);
  return docRef.id;
}

// 🔹 Update an existing staff member
export async function updateStaff(staffId, updates) {
  const staffDoc = doc(db, 'staff', staffId);
  await updateDoc(staffDoc, updates);
}

// 🔹 Delete a staff member (soft delete recommended in production)
export async function deleteStaff(staffId) {
  const staffDoc = doc(db, 'staff', staffId);
  await deleteDoc(staffDoc);
}

export async function getActiveStaff() {
  const q = query(collection(db, 'staff'), where('active', '==', true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getDeactivatedStaff() {
  const q = query(collection(db, 'staff'), where('active', '==', false));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deactivateStaff(staffId) {
  const ref = doc(db, 'staff', staffId);
  await updateDoc(ref, { active: false });
}
