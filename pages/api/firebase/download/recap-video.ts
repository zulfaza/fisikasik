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
	const promisesUser: any[] = [];
	const promisesPopupData: any[] = [];

	querySnapshot.docs.forEach((doc, index) => {
		const tempData: any = {
			...doc.data(),
			no: index + 1,
		};
		promisesUser.push(
			db
				.collection('Users')
				.doc(tempData.uid)
				.get()
				.then((res) => ({
					...res.data(),
					...tempData,
					user_id: tempData.uid,
				}))
		);

		promisesPopupData.push(
			db
				.collection('Users')
				.doc(tempData.uid)
				.collection('Materi')
				.doc(tempData.materiId)
				.collection('Videos')
				.doc(doc.id)
				.collection('Answer')
				.orderBy('timestamp', 'asc')
				.get()
				.then((snapshot) => {
					const result = {
						uid: tempData.uid,
						data: [],
					};
					snapshot.docs.forEach((doc) => {
						const temp = doc.data();
						const containInColumn = sheet.columns.find((data) => data.key === doc.id);

						if (!containInColumn) {
							const columnTemp = {
								header: temp.title,
								key: doc.id,
							};
							sheet.columns = [...sheet.columns, columnTemp];
						}

						if (!result[temp.uid]) result[temp.uid] = [];

						result.data.push({
							...temp,
							id: doc.id,
						});
					});
					return result;
				})
		);

		// data.push(tempData);
	});
	const popups = await Promise.all(promisesPopupData);
	const users = await Promise.all(promisesUser);

	users.forEach((item) => {
		if (item.recap_point === undefined) item.recap_point = 0;

		const popupArr = popups.find((data) => data.uid === item.user_id);

		if (popupArr) {
			popupArr.data.forEach((popup: any) => {
				item[popup.id] = popup.value;
			});
		}
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
	// return res.json(dataVideo);
};

export default RecapVideo;
