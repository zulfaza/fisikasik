import { useAuth } from '@core/contexts/firebase/AuthContext';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
interface Props {
	children: React.ReactNode;
}
const AuthComponent = ({ children }: Props) => {
	const { currentUser } = useAuth();

	const router = useRouter();

	if (currentUser) return <Fragment>{children}</Fragment>;
	router.push('/login');
	return <></>;
};

export default AuthComponent;
