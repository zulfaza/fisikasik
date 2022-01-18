import DynamicLayout from '@components/_layouts/DynamicLayout';
import Link from '@components/_shared/Link';
import { LayoutContentType, queryLayout } from '@core/prismic/client';
import { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
const Index = ({ layout_content }: StaticProps): JSX.Element => {
	const router = useRouter();
	const wisatas = [
		{
			title: 'Wisata Desa',
			background: {
				url: '/images/image 11.png',
			},
		},
		{
			title: 'GUNUNG BISMO',
			background: {
				url: '/images/bismo.png',
			},
		},
		{
			title: 'BATU LIK-LIK',
			background: {
				url: '/images/IMG_7806 2.png',
			},
		},
	];
	return (
		<DynamicLayout content={layout_content} key={router.asPath}>
			<div className="container max-w-6xl w-full mx-auto my-10">
				{wisatas.map((wisata, index) => {
					return (
						<div
							key={index}
							className="relative h-64 overflow-hidden first:rounded-t-xl last:rounded-b-xl"
						>
							<img
								className="top-0 left-0 absolute object-cover w-full h-full z-10"
								src={wisata.background.url}
								alt=""
							/>
							<div className="w-full h-full flex-cc relative z-20">
								<Link href="/">
									<h2 className="text-white font-bold uppercase text-4xl drop-shadow-xl md:text-6xl">
										{wisata.title}
									</h2>
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		</DynamicLayout>
	);
};

export interface StaticProps {
	layout_content: LayoutContentType;
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<StaticProps>> => {
	const layout_content = await queryLayout('main-layout');
	return {
		props: { layout_content },
	};
};

export default Index;
