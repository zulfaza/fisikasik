import DynamicLayout from '@components/_layouts/DynamicLayout';
import RenderSlice from '@components/_slices/_renderslice';
import {
	LayoutContentType,
	NewsType,
	queryAllWisata,
	queryLayout,
	queryWisata,
} from '@core/prismic/client';
import { GetStaticPropsResult } from 'next';
import React from 'react';
import Image from 'next/image';

const CustomPage = ({ content, layout_content }: StaticProps): JSX.Element => {
	const thumbnail = content.thumbnail;
	const title = content.html_title;

	return (
		<DynamicLayout content={layout_content} title={content.html_title}>
			<div className="shadow-[-4px_-3px_8px_rgb(0,0,0,0.1)] py-12 w-full">
				<div className="container">
					<h1 className="mt-10 mb-20 w-full text-2xl font-bold text-center text-black md:text-6xl">
						{title}
					</h1>
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
	const content = await queryWisata(slug);

	const layout_content = await queryLayout('main-layout');

	return {
		props: { content, layout_content },
	};
};

interface StaticPaths {
	paths: { params: { slug: string } }[];
	fallback: false;
}

export const getStaticPaths = async (): Promise<StaticPaths> => {
	const docs = await queryAllWisata();

	const paths = docs.map((item) => {
		return { params: { slug: item.uid } };
	});

	return {
		paths: paths,
		fallback: false,
	};
};

export default CustomPage;
