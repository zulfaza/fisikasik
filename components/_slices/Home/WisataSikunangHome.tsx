import React from 'react';
import { SliceType, WisataDoc } from '@core/prismic/client';
import Link from '@components/_shared/Link';

interface Props {
	slice: SliceType;
}

const WisataSikunangHome = ({ slice }: Props): JSX.Element => {
	console.log(slice);
	const Wisatas = slice.items.map((wisata: WisataDoc) => {
		const { thumbnail, html_title } = wisata.data;
		return {
			thumbnail: thumbnail.url,
			route: '/wisata' + wisata.uid,
			title: html_title,
		};
	});
	return (
		<section className="my-3 py-10 bg-topografi-pattern w-full">
			<div className="container">
				<h2 className="text-center text-black font-bold text-4xl mb-10">
					Jelajahi 8 Wisata Sikunang
				</h2>
				<div className="flex mx-auto gap-10 max-w-5xl flex-wrap">
					{Wisatas.map((data, index) => {
						return (
							<div key={index} className="w-full md:w-[220px]">
								<img
									className="w-full mb-5 object-cover rounded-xl overflow-hidden h-[220px]"
									src={data.thumbnail}
									alt=""
								/>
								<Link href={data.route}>
									<h4 className="text-center text-2xl">{data.title}</h4>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default WisataSikunangHome;
