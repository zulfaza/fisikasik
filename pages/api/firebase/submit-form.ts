import { auth, db } from '@core/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { uid, materiId, type } = req.body;
	const UserRef = db.collection('Users').doc(uid);
	const MateriRef = UserRef.collection('Materi').doc(materiId);

	const data: any = {};
	switch (type) {
		case 'kesimpulan':
			data.isSubmitKesimpulan = true;
			break;
		case 'kuis':
			data.isSubmitKuis = true;
			break;

		default:
			break;
	}

	return MateriRef.set(data, { merge: true })
		.then(() => {
			return res.json({
				status: 'success',
			});
		})
		.catch((err) => {
			return res.status(500).json({
				status: 'error',
			});
		});
};
