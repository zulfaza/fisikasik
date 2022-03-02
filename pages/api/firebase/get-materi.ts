import { db } from '@core/firebase/admin';
import client from '@core/prismic/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		materiId,
		uid,
	}: {
		materiId: string;
		uid: string;
	} = req.body;

	const UserRef = db.collection('Users').doc(uid);
	const MateriRef = UserRef.collection('Materi').doc(materiId);

	const materiDoc = await MateriRef.get();
	let data: any = {};

	if (materiDoc.exists) {
		const materiData = materiDoc.data();
		const videoId = materiData.last_video;
		data = await client.getByID(videoId);
		data.data.materi = {
			...data.data.materi,
			...materiData,
		};
	}

	return res.json({
		status: 'success',
		data: data,
	});
};
