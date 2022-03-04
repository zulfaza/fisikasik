import { db } from '@core/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

const GetPopup = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		materiId,
		videoId,
		uid,
	}: {
		materiId: string;
		videoId: string;
		uid: string;
	} = req.body;

	const UserRef = db.collection('Users').doc(uid);
	const MateriRef = UserRef.collection('Materi').doc(materiId);
	const VideoRef = MateriRef.collection('Videos').doc(videoId);

	const VideoDoc = await VideoRef.get();
	let data: string[] = [];
	if (VideoDoc.exists) data = VideoDoc.data()?.answered_popup ?? [];

	return res.json({
		status: 'success',
		popups: data,
	});
};

export default GetPopup;
