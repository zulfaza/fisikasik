import React from 'react';
import { NewsType, SliceType } from '@core/prismic/client';

interface Props {
	slice: SliceType;
}

const BeritaLain = ({ slice }: Props): JSX.Element => {
	const Beritas = [
		{
			html_title: 'News Title Lorem Ipsum Dolor Sit Amet',
			route: '/',
			created_at: '2022-01-14T17:00:00+0000',
			thumbnail: {
				url: 'https://images.prismic.io/desa-sikunang/0b958e99-8200-44d6-88ab-34f2302ac0e3_IMG_7009+1.png?auto=compress,format',
				alt: 'hehe',
				copyright: null,
				dimensions: {
					width: 200,
					height: 200,
				},
			},
			author: 'hehehe',
			layout: { uid: 'laksdflasjda' },
		},
		{
			html_title: 'News Title Lorem Ipsum Dolor Sit Amet',
			route: '/',
			created_at: '2022-01-14T17:00:00+0000',
			thumbnail: {
				url: 'https://images.prismic.io/desa-sikunang/0b958e99-8200-44d6-88ab-34f2302ac0e3_IMG_7009+1.png?auto=compress,format',
				alt: 'hehe',
				copyright: null,
				dimensions: {
					width: 200,
					height: 200,
				},
			},
			author: 'hehehe',
			layout: { uid: 'laksdflasjda' },
		},
	];
	return (
		<section className="container w-full">
			<hr className="border-[#C4C4C4] my-6" />
			<h2 className="font-bold text-black text-2xl">Berita Lainnya</h2>
			<div>
				{/* {Beritas.map((berita,index)=>{
					<div>

					</div>
				})} */}
			</div>
		</section>
	);
};

export default BeritaLain;
