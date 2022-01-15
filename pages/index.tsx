import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import Link from '@components/_shared/Link';
import { LayoutContentType, queryLayout } from '@core/prismic/client';
import { GetStaticPropsResult } from 'next';
import DynamicLayout from '@components/_layouts/DynamicLayout';
import { useRouter } from 'next/router';
import { ArrowIcon } from './artikel';

const Index = ({ layout_content }: StaticProps): JSX.Element => {
	const router = useRouter();
	return (
		<DynamicLayout content={layout_content} title={'Berita Sikunang'} key={router.asPath}>
			<section className="bg-white w-full">
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
				<div className="container max-w-5xl items-center flex py-10">
					<div className="relative">
						<img src="/images/maps.svg" alt="map sikunang" />
						<span className="text-[#A8A8A8] text-6xl absolute left-0 bottom-0 whitespace-nowrap">
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
			<section className="bg-white w-fulll">
				<div className="container flex-cc py-10">
					<div className="h-72 flex flex-col justify-between">
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
