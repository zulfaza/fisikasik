import axios from 'axios';
import React, { useState } from 'react';

interface Props {
	users: {
		name: string;
		email: string;
		uid: string;
		kelas: string;
	}[];
}

const TableUser = ({ users }: Props) => {
	const [IsDeleteUser, setIsDeleteUser] = useState(false);
	const [UserList, setUserList] = useState(users);
	function handleDeleteUser(uid: string) {
		setIsDeleteUser(true);
		axios
			.post('/api/firebase/delete_user', { uid })
			.then((res) => {
				console.log(res);
				setUserList((prev) => prev.filter((user) => user.uid !== uid));
			})
			.catch((err) => {
				console.log('err : ', err);
				console.log('response : ', err.response);
			})
			.finally(() => {
				setIsDeleteUser(false);
			});
	}
	return (
		<table className="w-full text-md bg-white shadow-md rounded my-4">
			<tbody>
				<tr className="border-b">
					<th className="text-left p-3 px-5">Name</th>
					<th className="text-left p-3 px-5">Email</th>
					<th className="text-left p-3 px-5">Kelas</th>
					<th></th>
				</tr>
				{UserList.map((user) => (
					<tr key={user.uid} className="border-b hover:bg-orange-100 bg-gray-100">
						<td className="p-3 px-5">{user.name}</td>
						<td className="p-3 px-5">{user.email}</td>
						<td className="p-3 px-5">{user.kelas}</td>
						<td className="p-3 px-5 flex justify-end">
							<button
								onClick={() => handleDeleteUser(user.uid)}
								disabled={IsDeleteUser}
								type="button"
								className="text-sm disabled:opacity-50 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default TableUser;
