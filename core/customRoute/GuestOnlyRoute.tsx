import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@core/contexts/firebase/AuthContext';

const GuestOnlyRoute = ({
	children,
	redirect = '/dashboard',
}: {
	children: React.ReactNode;
	redirect?: string;
}): JSX.Element => {
	const { currentUser } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (currentUser) router.push(redirect);
	}, [currentUser]);

	return <>{!currentUser && children}</>;
};

export default GuestOnlyRoute;
