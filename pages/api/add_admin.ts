import { auth } from '@core/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

const AddAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
	const { email, jabatan = null } = req.body;

	return auth
		.getUserByEmail(email)
		.then((userRecord) => auth.setCustomUserClaims(userRecord.uid, { admin: true, jabatan }))
		.then(() =>
			res.status(200).json({
				status: 'success',
				message: 'Successfully add new admin',
			})
		)
		.catch((err) => {
			console.log('Error creating new user:', err);
			return res.status(500).json(err);
		});
};

export default AddAdmin;

