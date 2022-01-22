import React from 'react';
import { ImageType, SliceType } from '@core/prismic/client';
import Link from '@components/_shared/Link';
import { RichText, RichTextBlock } from 'prismic-reactjs';

interface Props {
	slice: SliceType;
}

const WisataList = ({ slice }: Props): JSX.Element => {
	const wisatas: {
		background: ImageType;
		title: RichTextBlock[];
		url: string;
	}[] = slice.items;

	return (
		<section className="container mx-auto my-10 w-full max-w-6xl">
			{wisatas.map((wisata, index) => {
				return (
					<div
						key={index}
						className="relative overflow-hidden h-64 first:rounded-t-xl last:rounded-b-xl"
					>
						<img
							className="absolute object-cover top-0 left-0 z-10 w-full h-full"
							src={wisata.background.url}
							alt=""
						/>
						<div className="relative flex-cc z-20 w-full h-full">
							<Link href={wisata.url}>
								<h2 className="text-4xl font-bold text-white uppercase drop-shadow-xl md:text-6xl">
									{RichText.asText(wisata.title)}
								</h2>
							</Link>
						</div>
					</div>
				);
			})}
		</section>
	);
};

export default WisataList;
