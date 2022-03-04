import { auth, db } from '@core/firebase/admin';
import client, { PopupDoc, PopupType, VideoDoc, VideoType } from '@core/prismic/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.body;
	const popupPrismicData = await client.getByID(id);

	return res.json(popupPrismicData);
};
