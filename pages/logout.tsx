import { Logout } from '@core/firebase/public';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const logout = () => {
	const router = useRouter();

	useEffect(() => {
		Logout().then(() => router.push('/login'));
	}, []);

	return <></>;
};

export default logout;
