import { credential } from 'firebase-admin';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const credFirebase = {
	projectId: process.env.FIREBASE_PROJECT_ID,
	privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (getApps().length <= 0)
	initializeApp({
		credential: credential.cert(credFirebase),
	});

export const db = getFirestore();

export const auth = getAuth();
