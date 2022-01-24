import DynamicLayout from '@components/_layouts/DynamicLayout';
import { LayoutContentType, NewsDoc, queryAllNews, queryLayout } from '@core/prismic/client';
import { GetStaticPropsResult } from 'next';
import React, { useCallback, useEffect, useState } from 'react';
import format from 'date-fns/format';
import { id } from 'date-fns/locale';
import Link from '@components/_shared/Link';
import { RichText } from 'prismic-reactjs';
import Image from 'next/image';
import { publicArtikelIndex } from '@core/algolia';
import debounce from '@core/utils/debounce';

const Index = ({ layout_content }: StaticProps): JSX.Element => {
	const [News, setNews] = useState([]);
	const [Query, setQuery] = useState('');
	const [PrevQuery, setPrevQuery] = useState('');
	const [IsLoading, setIsLoading] = useState(false);
	const [PageNumber, setPageNumber] = useState(0);
	const [MaxPageNumber, setMaxPageNumber] = useState(0);

	useEffect(() => {
		console.log('PrevQuery', PrevQuery);
		console.log('Query', Query);

		publicArtikelIndex
			.search(Query, {
				hitsPerPage: 10,
				page: PageNumber,
			})
			.then((res) => {
				setMaxPageNumber(res.nbPages - 1);
				setNews((prev) => (PrevQuery === Query ? prev.concat(res.hits) : res.hits));
				setIsLoading(false);
			});
	}, [Query, PageNumber]);

	const debounceQuery = useCallback(
		debounce((event: React.ChangeEvent<HTMLInputElement>) => {
			setPageNumber(0);
			setQuery(event.target.value);
		}),
		[]
	);

	const debounceLoadMore = useCallback(
		debounce((target: HTMLButtonElement) => {
			setPrevQuery(Query);
			setPageNumber((prev) => prev + 1);
			target.disabled = false;
		}),
		[]
	);

	const LoadMore = (event: any) => {
		const target: HTMLButtonElement = event.target;
		target.disabled = true;

		debounceLoadMore(event);
	};

	function handleQueryInput(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value === PrevQuery) setIsLoading(false);
		setPrevQuery(Query);
		debounceQuery(event);
		if (event.target.value !== PrevQuery) setIsLoading(true);
	}

	return (
		<DynamicLayout content={layout_content} title={'Berita Sikunang'}>
			<h1 className="my-10 text-2xl md:text-4xl font-bold text-center text-black">
				Artikel dan Berita
			</h1>
			<div className="w-full mb-10 container max-w-4xl">
				<input
					onChange={handleQueryInput}
					type="text"
					placeholder="Cari artikel"
					className="w-full h-full shadow border rounded-md px-5 py-3"
				/>
			</div>
			<div className="container flex max-w-5xl flex-col">
				{IsLoading ? (
					<div className="w-full flex-cc my-5">
						<svg
							className="animate-spin -ml-1 mr-3 h-10 w-10 text-black"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					</div>
				) : News.length > 0 ? (
					News.map((berita) => <BeritaItem berita={berita} key={berita.uid} />)
				) : (
					<div className="flex-cc capitalize">
						<h4 className="font-bold text-xl text-gray-400">tidak ada artikel</h4>
					</div>
				)}
				{MaxPageNumber > PageNumber && (
					<div>
						<button
							onClick={LoadMore}
							className="text-center rounded font-bold border w-full py-3 disabled:opacity-50"
						>
							Load More
						</button>
					</div>
				)}
			</div>
		</DynamicLayout>
	);
};

export const ArrowIcon = ({ className = '' }) => (
	<svg
		className={className}
		width="20"
		height="18"
		viewBox="0 0 20 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M1.50879 8.9022H17.8094M17.8094 8.9022L11.5399 2.0058M17.8094 8.9022L11.5399 15.7986"
			stroke="white"
			strokeWidth="2.50778"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const BeritaItem = ({ berita }: { berita: NewsDoc }) => {
	const content = berita.data;
	const createdAt = new Date(content.created_at);
	const dateLabel = format(createdAt, 'd MMMM yyyy', { locale: id });
	return (
		<div className="w-full">
			<div className="bg-white border  shadow-md flex flex-col md:flex-row rounded-xl overflow-hidden mb-10">
				<div className="md:max-w-[50%] h-[346px] lg:max-w-[455px] w-full relative flex-shrink-0">
					<Image
						className="w-full h-full"
						src={content.thumbnail.url}
						alt={content.thumbnail.alt}
						objectFit="cover"
						layout="fill"
					/>
				</div>
				<div className="p-8 sm:p-9 md:p-7 xl:p-9 flex flex-col justify-between">
					<div className="mb-4">
						<h3>
							<Link
								href={`/artikel/${berita.uid}`}
								className="font-bold text-black text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary"
							>
								{content.html_title}
							</Link>
						</h3>
						<div className="ringkasan">{RichText.render(content.ringkasan)}</div>
					</div>
					<div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center">
						<Link
							href={`/artikel/${berita.uid}`}
							className="bg-black hover:bg-gray-900 text-white group py-3 px-8 rounded-lg flex w-full sm:w-max items-center"
						>
							Baca Artikel
							<ArrowIcon className="transform group-hover:translate-x-2 translate-x-3 transition-transform" />
						</Link>
						<span className="mb-3 sm:mb-0">{dateLabel}</span>
					</div>
				</div>
			</div>
		</div>
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
