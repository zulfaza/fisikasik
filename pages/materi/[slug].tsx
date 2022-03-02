import DynamicLayout from '@components/_layouts/DynamicLayout';
import Link from '@components/_shared/Link';
import { useAuth } from '@core/contexts/firebase/AuthContext';
import UserOnlyRoute from '@core/customRoute/UserOnlyRoute';
import {
	LayoutContentType,
	MateriDoc,
	MateriType,
	queryAllMateri,
	queryLayout,
	queryMateriBySlug,
	VideoDoc,
	VideoType,
} from '@core/prismic/client';
import axios from 'axios';
import { GetStaticPropsResult } from 'next';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React, { useEffect, useMemo, useState } from 'react';

interface CardType {
	title: string;
	description: RichTextBlock[];
	cta_text: string;
	cta_url: string;
	disabled: boolean;
}

const MateriPage = ({ MateriDoc, layout_content }: StaticProps): JSX.Element => {
	const content = useMemo(() => MateriDoc.data, [MateriDoc]);
	const [Cards, setCards] = useState<CardType[]>([]);
	const { currentUser } = useAuth();

	useEffect(() => {
		const materiId = MateriDoc.id;
		const uid = currentUser.uid;
		const data = {
			materiId,
			uid,
		};

		axios.post('/api/firebase/get-materi', data).then((res) => {
			const videoDoc: VideoDoc = res.data.data;
			const data = videoDoc.data;
			let MateriUrl: string;

			if (data.materi.isLastVideo && !data.materi.isSubmitKesimpulan) {
				MateriUrl = `/${content.kesimpulan_url.uid}`;
			} else if (data.materi.last_video) {
				MateriUrl = `/video/${videoDoc.uid}`;
			} else if (content.first_materi_url?.uid) {
				MateriUrl = `/video/${content.first_materi_url.uid}`;
			} else {
				MateriUrl = '';
			}

			const cards: CardType[] = [
				{
					title: 'Overview',
					description: content.overview_description,
					cta_text: 'simak',
					cta_url: content.overview_url,
					disabled: false,
				},
				{
					title: 'Materi Video',
					description: content.materi_description,
					cta_text: 'Mulai',
					cta_url: MateriUrl,
					disabled: false,
				},
				{
					title: 'Latihan Soal',
					description: content.quiz_description,
					cta_text: 'Kerjain Kuis',
					cta_url: content.quiz_url,
					disabled: true,
				},
			];
			setCards(cards);
		});
	}, [MateriDoc]);

	return (
		<UserOnlyRoute>
			<DynamicLayout content={layout_content} title={RichText.asText(content.title)}>
				<section className="w-full my-5">
					<div className="container">
						<h1 className="text-left my-20 font-bold text-4xl text-black">
							Menu Materi: {RichText.asText(content.title)}
						</h1>
						<div className="md:my-20 my-10 flex items-center justify-between flex-col md:flex-row">
							{Cards.map((item: CardType, index: number) => (
								<div
									key={index}
									className={`bg-primary ${
										item.disabled ? 'opacity-50' : ''
									} flex flex-col justify-between mb-5 w-full md:w-64 h-80 rounded-lg p-7 pt-4`}
								>
									<div>
										<h4 className="text-4xl mb-3 text-white">{item.title}</h4>
										<div className="text-white text-sm clamp-2">
											{RichText.render(item.description)}
										</div>
									</div>
									<div>
										<Link
											className={`bg-white ${
												item.disabled ? 'pointer-events-none' : ''
											} hover:bg-gray-100 transition-all rounded-md text-primary font-semibold px-5 py-2`}
											href={item.disabled ? '' : item.cta_url}
										>
											{item.cta_text}
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</DynamicLayout>
		</UserOnlyRoute>
	);
};

export interface StaticProps {
	MateriDoc?: MateriDoc;
	layout_content: LayoutContentType;
}

export const getStaticProps = async (context): Promise<GetStaticPropsResult<StaticProps>> => {
	const { slug } = context.params;
	const MateriDoc = await queryMateriBySlug(slug);
	const layout_content = await queryLayout('dashboard-layout');

	return {
		props: { MateriDoc, layout_content },
	};
};

interface StaticPaths {
	paths: { params: { slug: string | string[] } }[];
	fallback: false;
}

export const getStaticPaths = async (): Promise<StaticPaths> => {
	const docs = await queryAllMateri();

	const paths = docs.map((doc) => {
		const slug = doc.uid;
		return { params: { slug } };
	});

	return {
		paths: paths,
		fallback: false,
	};
};

export default MateriPage;
