import DynamicLayout from '@components/_layouts/DynamicLayout';
import { LayoutContentType, NewsDoc, queryAllNews, queryLayout } from '@core/prismic/client';
import { GetStaticPropsResult } from 'next';
import React from 'react';
import format from 'date-fns/format';
import { id } from 'date-fns/locale';
import Link from '@components/_shared/Link';
import { RichText } from 'prismic-reactjs';
import Image from 'next/image';

const Index = ({ news, layout_content }: StaticProps): JSX.Element => {
	return (
		<DynamicLayout content={layout_content} title={'Berita Sikunang'}>
			<h1 className="my-10 text-2xl md:text-4xl font-bold text-center text-black">
				Artikel dan Berita
			</h1>
			<div className="container flex max-w-5xl flex-col">
				{news.map((berita) => (
					<BeritaItem berita={berita} key={berita.uid} />
				))}
			</div>
		</DynamicLayout>
	);
};

export const ArrowIcon = ({ className = '' }) => (
	<svg
		className={className}
		width="20"
		height="18"
		viewBox="0 0 20 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M1.50879 8.9022H17.8094M17.8094 8.9022L11.5399 2.0058M17.8094 8.9022L11.5399 15.7986"
			stroke="white"
			strokeWidth="2.50778"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const BeritaItem = ({ berita }: { berita: NewsDoc }) => {
	const content = berita.data;
	const createdAt = new Date(content.created_at);
	const dateLabel = format(createdAt, 'd MMMM yyyy', { locale: id });
	return (
		<div className="w-full">
			<div className="bg-white border h-[346px] shadow-md flex flex-col md:flex-row rounded-xl overflow-hidden mb-10">
				<div className="md:max-w-[50%] lg:max-w-[455px] h-full w-full relative flex-shrink-0">
					<Image
						className="w-full h-full"
						src={content.thumbnail.url}
						alt={content.thumbnail.alt}
						objectFit="cover"
						layout="fill"
					/>
				</div>
				<div className="p-8 sm:p-9 md:p-7 xl:p-9 flex flex-col justify-between">
					<div className="mb-4">
						<h3>
							<Link
								href={`/artikel/${berita.uid}`}
								className="font-bold text-black text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary"
							>
								{content.html_title}
							</Link>
						</h3>
						<div className="ringkasan">{RichText.render(content.ringkasan)}</div>
					</div>
					<div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center">
						<Link
							href={`/artikel/${berita.uid}`}
							className="bg-black hover:bg-gray-900 text-white group py-3 px-8 rounded-lg flex w-full sm:w-max items-center"
						>
							Baca Artikel
							<ArrowIcon className="transform group-hover:translate-x-2 translate-x-3 transition-transform" />
						</Link>
						<span className="mb-3 sm:mb-0">{dateLabel}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export interface StaticProps {
	layout_content: LayoutContentType;
	news: NewsDoc[];
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<StaticProps>> => {
	const news = await queryAllNews();
	const layout_content = await queryLayout('main-layout');

	return {
		props: { news, layout_content },
	};
};

export default Index;
