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
		<section className="container max-w-6xl w-full mx-auto my-10">
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
							<Link href={wisata.url}>
								<h2 className="text-white font-bold uppercase text-4xl drop-shadow-xl md:text-6xl">
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
