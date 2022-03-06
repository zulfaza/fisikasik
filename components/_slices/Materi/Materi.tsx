import Link from '@components/_shared/Link';
import { useAuth } from '@core/contexts/firebase/AuthContext';
import { MateriDoc, SliceType } from '@core/prismic/client';
import axios from 'axios';
import { RichText } from 'prismic-reactjs';
import React, { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

const Materi = ({ slice }: { slice: SliceType }) => {
	const { currentUser } = useAuth();
	const [FinishedMateri, setFinishedMateri] = useState<string[]>([]);
	useEffect(() => {
		const promises = [];
		slice.items.forEach((materi) => {
			promises.push(
				axios.post('/api/firebase/get-materi', {
					materiId: materi.id,
					uid: currentUser.uid,
				})
			);
		});

		Promise.all(promises).then((apiResult) => {
			const finishedMateriArr: string[] = [];
			apiResult.forEach(({ data }) => {
				const materi = data?.data?.data?.materi ?? {};
				if (materi.isSubmitKuis) {
					finishedMateriArr.push(materi.id);
				}
			});
			setFinishedMateri(finishedMateriArr);
		});
	}, [slice]);

	return (
		<section className="w-full">
			<h3 className="font-bold text-2xl text-black mb-5">Materi Saya</h3>
			<div className="w-full flex flex-col md:flex-row flex-wrap">
				{slice.items.map((item: MateriDoc) => (
					<div
						key={item.id}
						className="md:max-w-[263px] group w-full h-[218px] bg-primary hover:bg-slate-600 flex flex-col justify-between py-6 px-4 rounded-lg"
					>
						<h4 className="text-4xl text-white">
							<Link className="w-full block" href={`/materi/${item.uid}`}>
								{RichText.asText(item.data.title)}
							</Link>
						</h4>
						<div className="w-full flex justify-end">
							{FinishedMateri.includes(item.id) && (
								<AiOutlineCheck className="text-white text-4xl" />
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Materi;
