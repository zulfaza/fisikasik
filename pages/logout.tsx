import { Logout } from '@core/firebase/public';
import React, { useEffect } from 'react';

const LogoutPage = () => {
	useEffect(() => {
		console.log(window.location);
		Logout().then(() => {
			window.location.href = window.location.origin + '/login';
		});
	}, []);

	return <></>;
};

export default LogoutPage;
