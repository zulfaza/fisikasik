import { db } from '@core/firebase/admin';
import client, { PopupDoc } from '@core/prismic/client';
import { FieldValue } from 'firebase-admin/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

const SubmitPopupValue = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		materiId,
		videoId,
		popupId,
		value,
		uid,
		title,
		timestamp,
	}: {
		materiId: string;
		videoId: string;
		popupId: string;
		value: string;
		uid: string;
		title: string;
		timestamp: string;
	} = req.body;

	const popupData: PopupDoc = await client.getByID(popupId);
	const answer = popupData.data.answer_value;

	const UserRef = db.collection('Users').doc(uid);
	const MateriRef = UserRef.collection('Materi').doc(materiId);
	const VideoRef = MateriRef.collection('Videos').doc(videoId);
	const AnswerRef = VideoRef.collection('Answer').doc(popupId);

	const VideoDoc = await VideoRef.get();
	const videoData = VideoDoc.data();

	if (
		videoData &&
		Array.isArray(videoData.answered_popup) &&
		videoData.answered_popup.includes(popupId)
	)
		return res.status(400).json({
			status: 'error',
			message: 'Jawaban sudah tersimpan',
		});

	const data: {
		recap_point?: FieldValue;
		answered_popup: FieldValue;
		materiId: string;
		videoId: string;
		uid: string;
	} = {
		materiId,
		videoId,
		uid,
		answered_popup: FieldValue.arrayUnion(popupId),
	};

	if (answer === value) data.recap_point = FieldValue.increment(1);

	VideoRef.set(data, { merge: true });

	return AnswerRef.set({
		materiId,
		videoId,
		popupId,
		value,
		uid,
		title,
		timestamp,
	})
		.then(() => {
			return res.json({
				status: 'success',
				message: 'Successfully add document',
			});
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
};

export default SubmitPopupValue;
