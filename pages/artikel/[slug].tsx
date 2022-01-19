import DynamicLayout from '@components/_layouts/DynamicLayout';
import RenderSlice from '@components/_slices/_renderslice';
import {
	LayoutContentType,
	NewsType,
	queryAllNews,
	queryLayout,
	queryNews,
} from '@core/prismic/client';
import { GetStaticPropsResult } from 'next';
import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import { id } from 'date-fns/locale';
import Image from 'next/image';

const CustomPage = ({ content, layout_content }: StaticProps): JSX.Element => {
	const thumbnail = content.thumbnail;
	const title = content.html_title;
	const createdAt = new Date(content.created_at);
	const author = content.author;
	const today = new Date();
	// console.log(content);

	const dateLabel = formatDistance(createdAt, today, { addSuffix: true, locale: id });

	return (
		<DynamicLayout content={layout_content} title={content.html_title}>
			<div className="shadow-[-4px_-3px_8px_rgb(0,0,0,0.1)] py-12 w-full">
				<div className="container">
					{thumbnail && (
						<div className="w-full h-[616px] rounded-xl overflow-hidden relative">
							<Image
								layout="fill"
								objectFit="cover"
								src={thumbnail.url}
								alt={thumbnail.alt}
							/>
						</div>
					)}
					<h1 className="font-bold text-2xl md:text-6xl text-black mb-3">{title}</h1>
					<div className="flex md:text-lg text-black text-opacity-40 items-center">
						{dateLabel}
						<svg
							className="mx-4"
							width="10"
							height="10"
							viewBox="0 0 10 10"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="5" cy="5" r="5" fill="#C4C4C4" />
						</svg>
						{author}
					</div>
					<hr className="border-[#C4C4C4] my-6" />
					<article>
						{content.body.map((slice, i) => (
							<RenderSlice slice={slice} key={i} />
						))}
					</article>
				</div>
			</div>
		</DynamicLayout>
	);
};

export interface StaticProps {
	content: NewsType;
	layout_content: LayoutContentType;
}

export const getStaticProps = async ({
	params: { slug },
}): Promise<GetStaticPropsResult<StaticProps>> => {
	const content = await queryNews(slug);

	const layout_content = await queryLayout(content.layout.uid);

	return {
		props: { content, layout_content },
	};
};

interface StaticPaths {
	paths: { params: { slug: string } }[];
	fallback: false;
}

export const getStaticPaths = async (): Promise<StaticPaths> => {
	const docs = await queryAllNews();

	const paths = docs.map((item) => {
		return { params: { slug: item.uid } };
	});

	return {
		paths: paths,
		fallback: false,
	};
};

export default CustomPage;
