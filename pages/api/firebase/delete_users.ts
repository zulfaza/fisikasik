import { auth, db } from '@core/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

const DeleteUsers = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		uid,
	}: {
		uid: string;
	} = req.body;
	// const arrKelas = Array(4)
	// 	.fill(1)
	// 	.map((_, index) => `X MIPA ${index + 5}`);

	// const arrKelas = ['X MIPA 6'];

	const usersRef = db.collection('Users').where('kelas', '==', 'X MIPA 6');
	const batch = db.batch();
	const docs = await usersRef.get().then((snapshop) => snapshop.docs);

	docs.forEach((doc) => {
		batch.delete(doc.ref);
	});

	await batch.commit();

	return auth.deleteUsers(docs.map((doc) => doc.id)).then(() =>
		res.json({
			status: 'success',
		})
	);
};

export default DeleteUsers;
