import React from 'react';
import DynamicLayout from '@components/_layouts/DynamicLayout';
import { queryAllProduk, queryLayout } from '@core/prismic/client';
import { GetStaticPropsResult } from 'next/types';
import Link from '@components/_shared/Link';

const ProdukEtalase = ({ layout_content, produkList }) => {
	return (
		<DynamicLayout content={layout_content} title={'Berita Sikunang'}>
			<div className="grid grid-cols-3 mt-8">
				{produkList.map((produk, i) => (
					<Link
						href={`/produk/${produk.uid}`}
						className="overflow-hidden w-64 h-96 rounded-lg border shadow-lg border-px"
						key={i}
					>
						<div className="w-full bg-gray-300 aspect-square">
							<img src={produk.data.thumbnail.url} alt="" className="full" />
						</div>
						<div className="flex-bs col px-4 py-3 font-medium">
							<p className="text-lg">{produk.data.html_title}</p>
							<button className="px-4 py-3 mt-2 text-white bg-black rounded-lg">
								Lihat Produk
							</button>
						</div>
					</Link>
				))}
			</div>
		</DynamicLayout>
	);
};

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
	const layout_content = await queryLayout('main-layout');
	const produkList = await queryAllProduk();

	return {
		props: { layout_content, produkList },
	};
};

export default ProdukEtalase;