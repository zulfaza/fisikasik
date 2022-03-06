import { db } from '@core/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

const SubmitForm = async (req: NextApiRequest, res: NextApiResponse) => {
	const { uid, materiId, type } = req.body;
	const UserRef = db.collection('Users').doc(uid);
	const MateriRef = UserRef.collection('Materi').doc(materiId);

	const data: any = {
		materiId,
		uid,
	};
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
			console.log(err);

			return res.status(500).json({
				status: 'error',
			});
		});
};

export default SubmitForm;
