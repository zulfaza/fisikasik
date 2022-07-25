import { auth, db } from '@core/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
	const { uid, data } = req.body;

	return auth
		.updateUser(uid, data)
		.then((userRecord) => {
			return db.collection('Users').doc(userRecord.uid).set(data);
		})
		.then(() => {
			return res.status(200).json({
				status: 'success',
				message: 'Successfully created new user',
			});
		})
		.catch((err) => {
			console.log('Error creating new user:', err);
			return res.status(500).json(err);
		});
};

export default updateUser;

