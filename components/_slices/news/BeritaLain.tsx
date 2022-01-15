import React from 'react';
import { NewsDoc, SliceType } from '@core/prismic/client';
import Link from '@components/_shared/Link';
import formatDistance from 'date-fns/formatDistance';
import { id } from 'date-fns/locale';
interface Props {
	slice: SliceType;
}

const BeritaItem = ({ berita }: { berita: NewsDoc }): JSX.Element => {
	const content = berita.data;
	const createdAt = new Date(content.created_at);
	const author = content.author;
	const today = new Date();
	const dateLabel = formatDistance(createdAt, today, { addSuffix: true, locale: id });
	return (
		<div className="md:max-w-[270px] w-full group mb-10">
			<Link href={`/artikel/${berita.uid}`}>
				<img
					className="overflow-hidden transform scale-100 group-hover:scale-105 transition-transform rounded-lg w-full md:h-44 object-cover"
					src={berita.data.thumbnail.url}
					alt={berita.data.thumbnail.url}
				/>
			</Link>
			<div className="my-2 md:my-4">
				<Link
					className="font-bold group-hover:underline transition-all"
					href={`/artikel/${berita.uid}`}
				>
					{berita.data.html_title}
				</Link>
			</div>
			<div className="flex items-center text-sm">
				{dateLabel.replace('sekitar ', '').replace('yang', '')}
				<svg
					className="mx-4"
					width="8"
					height="8"
					viewBox="0 0 10 10"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="5" cy="5" r="5" fill="#C4C4C4" />
				</svg>
				{author}
			</div>
		</div>
	);
};

const BeritaLain = ({ slice }: Props): JSX.Element => {
	const Beritas: NewsDoc[] = slice.items;

	return (
		<>
			<hr className="border-[#C4C4C4] my-6" />
			<section className="container w-full">
				<h2 className="font-bold text-black text-2xl mb-8">Berita Lainnya</h2>
				<div className="flex flex-col md:flex-row justify-between items-center">
					{Beritas.map((berita) => (
						<BeritaItem berita={berita} key={berita.id} />
					))}
				</div>
			</section>
		</>
	);
};

export default BeritaLain;
