import { auth } from '@core/firebase/public';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext(null);

interface Props {
	children: React.ReactNode;
}
const AuthProvider = ({ children }: Props): JSX.Element => {
	const [currentUser, setCurrentUser] = useState<User>(null);
	const [AuthLoading, setAuthLoading] = useState(true);
	const [IsAdmin, setIsAdmin] = useState<boolean>(false);

	useEffect(() => {
		const unsubcribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				user.getIdTokenResult().then((res) => {
					if (res.claims.admin) setIsAdmin(true);
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
	};

	return <AuthContext.Provider value={value}>{!AuthLoading && children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = (): {
	currentUser: User;
	IsAdmin: boolean;
} => useContext(AuthContext);
