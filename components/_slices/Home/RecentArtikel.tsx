import React from 'react';
import { SliceType } from '@core/prismic/client';
import { BeritaItem } from '../news/BeritaLain';

interface Props {
	slice: SliceType;
}

const RecentArtikel = ({ slice }: Props): JSX.Element => {
	const news = slice.items;
	return (
		<section className="my-3 py-10 bg-white w-full shadow-[-4px_-3px_8px_rgb(0,0,0,0.1)]">
			<div className="container">
				<h2 className="text-center text-black font-bold text-4xl mb-10">Artikel Terbaru</h2>
				<div className="flex mx-auto gap-10 max-w-5xl flex-wrap">
					{news.map((data) => (
						<BeritaItem berita={data} key={data.id} />
					))}
				</div>
			</div>
		</section>
	);
};

export default RecentArtikel;
