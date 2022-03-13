import { auth, db } from '@core/firebase/admin';
import kelas from '@core/utils/kelas';
import type { NextApiRequest, NextApiResponse } from 'next';

const AddUserBulk = (req: NextApiRequest, res: NextApiResponse) => {
	const { type = '12' } = req.body;
	const dataUser = kelas(type);

	const promises = [];
	dataUser.forEach((user) => {
		promises.push(
			auth
				.createUser({
					email: user.email,
					emailVerified: true,
					password: user.password,
					displayName: user.nama,
					photoURL: `https://avatars.dicebear.com/api/miniavs/${user.email}.svg`,
					disabled: false,
				})
				.then((userRecord) => {
					console.log('Successfully created new user:', userRecord.email);
					return db.collection('Users').doc(userRecord.uid).set({
						uid: userRecord.uid,
						displayName: userRecord.displayName,
						photoURL: userRecord.photoURL,
						email: userRecord.email,
						kelas: user.kelas,
					});
				})
				.catch((err) => {
					console.log(err);
					console.log('failed created new user:', user.email);
					return null;
				})
		);
	});

	return Promise.all(promises)
		.then(() => {
			return res.status(200).json({
				status: 'success',
				message: `Successfully created ${promises.length} new user`,
			});
		})
		.catch((err) => {
			console.log('Error creating new user:', err);
			return res.status(500).json(err);
		});
};

export default AddUserBulk;
