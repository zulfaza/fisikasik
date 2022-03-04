import client from '@core/prismic/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const GetByID = async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.body;
	const popupPrismicData = await client.getByID(id);

	return res.json(popupPrismicData);
};

export default GetByID;
