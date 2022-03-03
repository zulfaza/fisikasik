import { getApps, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCTLNmhn-e0Y8sjTtaFeUPj6lSQqj-hfj4',
	authDomain: 'fisikasik-64abe.firebaseapp.com',
	projectId: 'fisikasik-64abe',
	storageBucket: 'fisikasik-64abe.appspot.com',
	messagingSenderId: '861609599305',
	appId: '1:861609599305:web:8dcb18592660018f4e7a98',
};
if (getApps().length <= 0) initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

export const loginByEmailPassword = async (
	email: string,
	password: string
): Promise<UserCredential> => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const Logout = () => {
	return signOut(auth);
};
