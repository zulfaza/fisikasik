import { auth } from '@core/firebase/public';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext(null);

interface Props {
	children: React.ReactNode;
}

type Context = {
	currentUser: User;
	IsAdmin: boolean;
	AuthLoading: boolean;
	Jabatan: string | null;
};

const AuthProvider = ({ children }: Props): JSX.Element => {
	const [currentUser, setCurrentUser] = useState<User>(null);
	const [AuthLoading, setAuthLoading] = useState(true);
	const [IsAdmin, setIsAdmin] = useState<boolean>(false);
	const [Jabatan, setJabatan] = useState<string | null>(null);

	useEffect(() => {
		const unsubcribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				user.getIdTokenResult().then((res) => {
					const { admin, jabatan } = res.claims;
					if (admin) setIsAdmin(true);
					if (jabatan && typeof jabatan === 'string') setJabatan(jabatan);
					setCurrentUser(user);
					setAuthLoading(false);
				});
			} else {
				setCurrentUser(null);
				setIsAdmin(false);
				setAuthLoading(false);
			}
		});

		return unsubcribe;
	}, []);

	const value = {
		currentUser,
		IsAdmin,
		AuthLoading,
		Jabatan,
	};

	return <AuthContext.Provider value={value}>{!AuthLoading && children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = (): Context => useContext(AuthContext);

