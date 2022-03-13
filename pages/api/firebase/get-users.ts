import { db } from '@core/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

const GetUsers = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		kelas,
		lastDocId = null,
	}: {
		kelas: string;
		lastDocId?: string;
	} = req.body;

	let UsersRef = db.collection('Users').where('kelas', '==', kelas);
	if (lastDocId) {
		const lastDoc = await db.collection('Users').doc(lastDocId).get();
		UsersRef = UsersRef.startAfter(lastDoc);
	}

	UsersRef = UsersRef.orderBy('displayName', 'asc');

	const UserDocs = await UsersRef.get().then((snapshot) =>
		snapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
	);

	return res.json({
		status: 'success',
		data: UserDocs,
	});
};

export default GetUsers;
