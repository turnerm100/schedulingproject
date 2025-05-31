import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function createEvent(eventData) {
  await addDoc(collection(db, 'staffEvents'), eventData);
}

export async function getEventsForMonth(monthStart, monthEnd) {
  const q = query(
    collection(db, 'staffEvents'),
    where('startDate', '<=', monthEnd),
    where('endDate', '>=', monthStart)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}
