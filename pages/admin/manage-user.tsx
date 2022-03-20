import AdminOnlyComponent from '@components/_layouts/AdminOnlyComponent';
import DynamicLayout from '@components/_layouts/DynamicLayout';
import TableUser from '@components/_shared/admin/TableUser';
import ModalAddUser from '@components/_shared/ModalAddUser';
import { LayoutContentType, queryLayout } from '@core/prismic/client';
import axios from 'axios';
import { GetServerSidePropsResult } from 'next';
import React, { useEffect, useState } from 'react';

const ManageUser = ({ layout_content }: serverProps) => {
	const [ShowModalUser, setShowModalUser] = useState(false);
	const [Kelas, setKelas] = useState('X MIPA 5');
	const [Users, setUsers] = useState([]);

	useEffect(() => {
		if (Kelas) {
			axios.post('/api/firebase/get-users', { kelas: Kelas }).then((result) => {
				const users = result.data.data;
				setUsers(
					users.map((user) => ({
						name: user.displayName,
						email: user.email,
						uid: user.uid,
						kelas: user.kelas,
					}))
				);
			});
		}
	}, [Kelas]);

	return (
		<AdminOnlyComponent>
			<DynamicLayout content={layout_content} title={'Manage User'}>
				<ModalAddUser show={ShowModalUser} closeModal={() => setShowModalUser(false)} />
				<div className="container">
					<h1 className="text-left my-20 font-bold text-4xl text-black">Manage User</h1>
					<div className="flex w-full justify-end">
						<select
							onChange={(e) => setKelas(e.target.value)}
							defaultValue={Kelas}
							className="px-5 py-2 border-primary border rounded-xl mr-4"
						>
							{Array(4)
								.fill(1)
								.map((_, index) => (
									<option key={index} value={`X MIPA ${index + 5}`}>
										X MIPA {index + 5}
									</option>
								))}
							{Array(2)
								.fill(1)
								.map((_, index) => (
									<option key={index} value={`XI MIPA ${index + 6}`}>
										XI MIPA {index + 6}
									</option>
								))}
							{Array(4)
								.fill(1)
								.map((_, index) => (
									<option key={index} value={`XII MIPA ${index + 5}`}>
										XII MIPA {index + 5}
									</option>
								))}
						</select>
						<button
							onClick={() => setShowModalUser(true)}
							className="bg-primary px-5 py-2 rounded-xl text-white hover:bg-opacity-80 transition-all"
						>
							Add User
						</button>
					</div>
					{Users.length > 0 && <TableUser users={Users} />}
				</div>
			</DynamicLayout>
		</AdminOnlyComponent>
	);
};

export interface serverProps {
	layout_content: LayoutContentType;
}

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<serverProps>> => {
	const props: serverProps = {
		layout_content: null,
	};

	props.layout_content = await queryLayout('dashboard-layout');

	return {
		props,
	};
};

export default ManageUser;
