import { Logout } from '@core/firebase/public';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const LogoutPage = () => {
	useEffect(() => {
		Logout().then(() => {
			window.location.href = window.location.hostname + '/login';
		});
	}, []);

	return <></>;
};

export default LogoutPage;
