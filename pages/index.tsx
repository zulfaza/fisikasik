import React from 'react';
import Link from '@components/_shared/Link';
import {
	LayoutContentType,
	NewsDoc,
	queryAllNews,
	queryLayout,
	queryPageByRoute,
} from '@core/prismic/client';
import CustomPage, { StaticProps } from './[...customs]';
import { GetStaticPropsResult } from 'next';
import DynamicLayout from '@components/_layouts/DynamicLayout';
import { useRouter } from 'next/router';
import { ArrowIcon } from './artikel';
import { BeritaItem } from '@components/_slices/news/BeritaLain';
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css';

const Index = ({ layout_content }: StaticProps): JSX.Element => {
	const router = useRouter();
	const news = [];
	return (
		<DynamicLayout content={layout_content} key={router.asPath}>
			<div className="bg-[#CACACA] my-5 h-0.5 relative before:bg-flower before:absolute before:left-1/2 before:-bottom-10 before:w-20 before:h-20 before:bg-no-repeat before:z-10 after:bg-white after:w-32 after:h-20 after:absolute after:-ml-6 after:left-1/2 after:-bottom-10 before:bg-contain" />
			<section className="my-3 py-10 bg-white w-full">
				<div className="flex flex-col-reverse md:flex-row items-center max-w-4xl mx-auto my-10">
					<div className="md:mr-20">
						<h2 className="font-bold text-4xl text-black mb-5">Tentang Kami</h2>
						<p>
							Sikunang adalah sebuah desa yang terletak di kecamatan Kejajar,
							kabupaten Wonosobo, Jawa Tengah, Indonesia. Lorem Ipsum adalah contoh
							teks atau dummy dalam industri percetakan dan penataan huruf atau
							typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun
							1500an, saat s
						</p>
					</div>
					<img src="/images/bunga-2.svg" alt="" />
				</div>
			</section>
			<section className="my-3 py-10 bg-white w-full">
				<div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto my-10">
					<img className="md:mr-20" src="/images/bunga-3.svg" alt="" />
					<div>
						<h2 className="font-bold text-4xl text-black mb-5">Sambutan Kepala Desa</h2>
						<p>
							Sikunang adalah sebuah desa yang terletak di kecamatan Kejajar,
							kabupaten Wonosobo, Jawa Tengah, Indonesia. Lorem Ipsum adalah contoh
							teks atau dummy dalam industri perc
						</p>
					</div>
				</div>
			</section>
		</DynamicLayout>
	);
};

export const getStaticProps = async (): Promise<GetStaticPropsResult<StaticProps>> => {
	const content = await queryPageByRoute('/');
	const layout_content = await queryLayout('main-layout');
	return {
		props: { layout_content, content },
	};
};

export default CustomPage;
