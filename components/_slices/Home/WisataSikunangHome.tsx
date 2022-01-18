import React from 'react';
import { SliceType } from '@core/prismic/client';
import Link from '@components/_shared/Link';

interface Props {
	slice: SliceType;
}

const Wisatas = [
	{
		thumbnail: '/images/cover-wisata.png',
		route: '/',
		title: 'Desa Wisata dan Budaya',
	},
	{
		thumbnail: '/images/cover-wisata.png',
		route: '/',
		title: 'Gunung Bismo',
	},
	{
		thumbnail: '/images/cover-wisata.png',
		route: '/',
		title: 'Batu Lik Lik',
	},
	{
		thumbnail: '/images/cover-wisata.png',
		route: '/',
		title: 'Andha Budha',
	},
	{
		thumbnail: '/images/cover-wisata.png',
		route: '/',
		title: 'Pakis Jangan',
	},
	{
		thumbnail: '/images/cover-wisata.png',
		route: '/',
		title: 'Telaga Silewek',
	},
	{
		thumbnail: '/images/cover-wisata.png',
		route: '/',
		title: 'Bukit Sarinah',
	},
	{
		thumbnail: '/images/cover-wisata.png',
		route: '/',
		title: 'Pengumben',
	},
];

const WisataSikunangHome = ({ slice }: Props): JSX.Element => {
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
