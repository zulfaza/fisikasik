import { getApps, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDKXg9l7-qwiCkhqlCghIUpuGklHJmER6w',
	authDomain: 'fisikasik-beta.firebaseapp.com',
	projectId: 'fisikasik-beta',
	storageBucket: 'fisikasik-beta.appspot.com',
	messagingSenderId: '645735217671',
	appId: '1:645735217671:web:b1aa92aafff0019359c8a2',
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
