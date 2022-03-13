import { useAuth } from '@core/contexts/firebase/AuthContext';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
interface Props {
	children: React.ReactNode;
}
const AdminOnlyComponent = ({ children }: Props) => {
	const { currentUser, IsAdmin } = useAuth();

	const router = useRouter();

	if (currentUser) return <Fragment>{children}</Fragment>;
	router.push('/404');
	return <></>;
};

export default AdminOnlyComponent;
