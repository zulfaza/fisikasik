import { auth, db } from '@core/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

const DeleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		uid,
	}: {
		uid: string;
	} = req.body;

	let UsersRef = db.collection('Users').doc(uid);
	return auth
		.deleteUser(uid)
		.then(() => UsersRef.delete())
		.then(() =>
			res.json({
				status: 'success',
				message: 'Successfully delete user',
			})
		)
		.catch((err) =>
			res.status(500).json({
				status: 'error',
				error: err,
			})
		);
};

export default DeleteUser;
