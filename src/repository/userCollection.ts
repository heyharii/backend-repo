import { db } from '../config/firebaseConfig';

export const updateUserData = async (userId: string, data: Record<string, any>): Promise<void> => {
  await db.collection('USERS').doc(userId).set(data, { merge: true });
};

export const fetchUserData = async (userId: string): Promise<Record<string, any> | undefined> => {
  const doc = await db.collection('USERS').doc(userId).get();
  return doc.data();
};