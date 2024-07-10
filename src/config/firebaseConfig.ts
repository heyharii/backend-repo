import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const isEmulator = !!process.env.FIRESTORE_EMULATOR_HOST;

if (!isEmulator) {
  const requiredEnvVars = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
}

try {
  if (isEmulator) {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  } else {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }

  if (isEmulator) {
    admin.firestore().settings({
      host: process.env.FIRESTORE_EMULATOR_HOST,
      ssl: false,
    });
  }

  console.log('Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
  process.exit(1);
}

export const db = admin.firestore();