import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function getSchedulesForMonth(monthStart, monthEnd) {
  const q = query(
    collection(db, 'staffSchedules'),
    where('date', '>=', monthStart),
    where('date', '<=', monthEnd)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}
