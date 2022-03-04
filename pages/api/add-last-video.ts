import { db } from '@core/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		materiId,
		videoId,
		uid,
		isLastVideo,
	}: {
		materiId: string;
		videoId: string;
		uid: string;
		isLastVideo?: boolean;
	} = req.body;

	const UserRef = db.collection('Users').doc(uid);
	const MateriRef = UserRef.collection('Materi').doc(materiId);
	const data: {
		last_video: string;
		isLastVideo?: boolean;
	} = {
		last_video: videoId,
	};
	if (isLastVideo) data.isLastVideo = true;
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
