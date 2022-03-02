import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@core/contexts/firebase/AuthContext';

const UserOnlyRoute = ({
	children,
	redirect = '/login',
}: {
	children: React.ReactNode;
	redirect?: string;
}): JSX.Element => {
	const { currentUser } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!currentUser) router.push(redirect);
	}, [currentUser]);

	return <>{currentUser && children}</>;
};

export default UserOnlyRoute;
