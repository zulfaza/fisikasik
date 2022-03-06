import { db } from '@core/firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';
import ExcelJS from 'exceljs';
import client from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';

const RecapVideo = async (req: NextApiRequest, res: NextApiResponse) => {
	const videoId = req.query.videoId as string;
	if (!videoId)
		return res.status(400).json({
			status: 'error',
			message: 'missiing videoId',
		});
	const querySnapshot = await db.collectionGroup('Videos').where('videoId', '==', videoId).get();

	const workbook = new ExcelJS.Workbook();
	const sheet = workbook.addWorksheet('My Sheet');
	sheet.columns = [
		{
			header: 'No',
			key: 'no',
		},
		{
			header: 'Name',
			key: 'displayName',
		},
		{
			header: 'Email',
			key: 'email',
		},
		{
			header: 'Benar',
			key: 'recap_point',
		},
	];
	const dataVideo = await client.getByID(videoId).then((result) => result.data);
	const promises: any[] = [];

	querySnapshot.docs.forEach((doc, index) => {
		const tempData: any = {
			...doc.data(),
			no: index + 1,
		};
		promises.push(
			db
				.collection('Users')
				.doc(tempData.uid)
				.get()
				.then((res) => ({
					...res.data(),
					...tempData,
				}))
		);
		// data.push(tempData);
	});
	return Promise.all(promises).then((result) => {
		result.forEach((item) => {
			sheet.addRow(item);
		});
		res.setHeader(
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		);
		res.setHeader(
			'Content-Disposition',
			`attachment; filename=${RichText.asText(dataVideo.title)}-${new Date().toString()}.xlsx`
		);
		return workbook.xlsx.write(res).then(() => {
			return res.end();
		});
	});
	// return res.json(dataVideo);
};

export default RecapVideo;
