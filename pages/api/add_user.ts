import { auth, db } from '@core/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

const AddUser = (req: NextApiRequest, res: NextApiResponse) => {
	const { email, password, name } = req.body;

	return auth
		.createUser({
			email: email,
			emailVerified: true,
			password: password,
			displayName: name,
			photoURL: `https://avatars.dicebear.com/api/miniavs/${password}.svg`,
			disabled: false,
		})
		.then((userRecord) => {
			console.log('Successfully created new user:', userRecord.uid);
			return db.collection('Users').doc(userRecord.uid).set({
				uid: userRecord.uid,
				displayName: userRecord.displayName,
				photoURL: userRecord.photoURL,
				email,
			});
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

export default AddUser;
