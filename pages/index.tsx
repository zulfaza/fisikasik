import React from 'react';
import Link from '@components/_shared/Link';
import { LayoutContentType, NewsDoc, queryAllNews, queryLayout } from '@core/prismic/client';
import { GetStaticPropsResult } from 'next';
import DynamicLayout from '@components/_layouts/DynamicLayout';
import { useRouter } from 'next/router';
import { ArrowIcon } from './artikel';
import { BeritaItem } from '@components/_slices/news/BeritaLain';
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css';
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

const Index = ({ layout_content, news }: StaticProps): JSX.Element => {
	const router = useRouter();

	return (
		<DynamicLayout content={layout_content} key={router.asPath}>
			<section className="bg-white w-full">
				<div>
					<Flickity
						className={' focus:outline-none overflow-hidden'}
						options={{
							pageDots: false,
							adaptiveHeight: true,
							freeScroll: false,
							prevNextButtons: false,
						}}
					>
						<div className=" px-2 md:w-max w-full md:h-[530px] text-white cursor-pointer">
							<img
								className="w-full h-full object-cover rounded-xl overflow-hidden"
								src={'/images/image 5.png'}
								alt={''}
							/>
						</div>
						<div className=" px-2 md:w-max w-full md:h-[530px] text-white cursor-pointer">
							<img
								className="w-full h-full object-cover rounded-xl overflow-hidden"
								src={'/images/bismo.png'}
								alt={''}
							/>
						</div>
						<div className=" px-2 md:w-max w-full md:h-[530px] text-white cursor-pointer">
							<img
								className="w-full h-full object-cover rounded-xl overflow-hidden"
								src={'/images/image 6.png'}
								alt={''}
							/>
						</div>
					</Flickity>
				</div>
				<div className="container py-16 flex-cc">
					<p className="text-center text-2xl max-w-[845px]">
						<b>Sikunang</b> berasal dari kata “kunang-kunang”. Kecil namun kuat, menjadi
						filosofi nama desa yang indah ini.
					</p>
				</div>
			</section>
			<section className="bg-topografi-pattern w-full overflow-hidden relative">
				<img
					className=" absolute -bottom-40 hidden md:block right-0 max-w-[444px]"
					src="/images/flora-bottom-right.svg"
					alt="flora"
				/>
				<div className="container max-w-5xl items-center flex-col md:flex-row flex py-10">
					<div className="relative">
						<img src="/images/maps.svg" alt="map sikunang" />
						<span className="text-[#A8A8A8] text-3xl md:text-6xl absolute left-0 bottom-0 whitespace-nowrap">
							109.8965°BT -7.239637°LS
						</span>
					</div>
					<div>
						<p className="max-w-[505px] text-2xl">
							Desa <b>Sikunang</b> terletak di ketinggian <b>2.339</b> MDPL dan
							terdiri dari <b>3</b> Dusun yaitu Sikunang, Ngandam, dan Siterus.
						</p>
					</div>
				</div>
			</section>
			<section className="bg-white w-full shadow-md">
				<div className="container flex-col lg:flex-row flex-cc py-10">
					<img
						className="md:mr-10 flex-grow-0"
						src="/images/gn-bismo.png"
						alt="asdfasf"
					/>
					<div className="h-72 flex flex-col justify-between flex-shrink-0">
						<div>
							<h2 className="font-bold text-4xl text-black mb-2">Pendakian Bismo</h2>
							<h3 className="text-4xl">via Sikunang</h3>
						</div>
						<h4 className="italic text-3xl max-w-[305px]">
							“Nanjak minimal view maksimal”
						</h4>
						<div>
							<Link
								href={`/artikel/`}
								className="bg-black hover:bg-gray-900 text-white group py-3 px-8 rounded-lg flex w-full sm:w-max items-center"
							>
								Pesan Tiket Bismo
								<ArrowIcon className="transform group-hover:translate-x-2 translate-x-3 transition-transform" />
							</Link>
						</div>
					</div>
				</div>
			</section>
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
			<section className="my-3 py-10 bg-white w-full shadow-[-4px_-3px_8px_rgb(0,0,0,0.1)]">
				<div className="container">
					<h2 className="text-center text-black font-bold text-4xl mb-10">
						Artikel Terbaru
					</h2>
					<div className="flex mx-auto gap-10 max-w-5xl flex-wrap">
						{news.map((data) => (
							<BeritaItem berita={data} key={data.id} />
						))}
					</div>
					<div className="bg-[#CACACA] my-5 h-0.5 relative before:bg-flower before:absolute before:left-1/2 before:-bottom-10 before:w-20 before:h-20 before:bg-no-repeat before:z-10 after:bg-white after:w-32 after:h-20 after:absolute after:-ml-6 after:left-1/2 after:-bottom-10 before:bg-contain" />
					<div className="flex flex-col-reverse md:flex-row items-center max-w-4xl mx-auto my-10">
						<div className="md:mr-20">
							<h2 className="font-bold text-4xl text-black mb-5">Tentang Kami</h2>
							<p>
								Sikunang adalah sebuah desa yang terletak di kecamatan Kejajar,
								kabupaten Wonosobo, Jawa Tengah, Indonesia. Lorem Ipsum adalah
								contoh teks atau dummy dalam industri percetakan dan penataan huruf
								atau typesetting. Lorem Ipsum telah menjadi standar contoh teks
								sejak tahun 1500an, saat s
							</p>
						</div>
						<img src="/images/bunga-2.svg" alt="" />
					</div>
					<div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto my-10">
						<img className="md:mr-20" src="/images/bunga-3.svg" alt="" />
						<div>
							<h2 className="font-bold text-4xl text-black mb-5">
								Sambutan Kepala Desa
							</h2>
							<p>
								Sikunang adalah sebuah desa yang terletak di kecamatan Kejajar,
								kabupaten Wonosobo, Jawa Tengah, Indonesia. Lorem Ipsum adalah
								contoh teks atau dummy dalam industri perc
							</p>
						</div>
					</div>
				</div>
			</section>
		</DynamicLayout>
	);
};

export interface StaticProps {
	layout_content: LayoutContentType;
	news: NewsDoc[];
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<StaticProps>> => {
	const layout_content = await queryLayout('main-layout');
	const news = await queryAllNews();
	return {
		props: { layout_content, news },
	};
};

export default Index;
