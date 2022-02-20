import Link from '@components/_shared/Link';
import { SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';

const Hero = ({ slice }: { slice: SliceType }) => {
	const primary: {
		cta_text: string;
		cta_url: string;
		subtitle: RichTextBlock[];
		title: RichTextBlock[];
	} = slice.primary;

	return (
		<div className="w-full h-full bg-no-repeat bg-contain">
			<div className="w-full bg-primary text-white">
				<div className="container py-10 max-w-2xl flex-cc flex-col">
					<h1 className="text-white mb-10 text-center font-bold text-6xl">
						{primary.title && RichText.asText(primary.title)}
					</h1>
					<h2>{primary.subtitle && RichText.asText(primary.subtitle)}</h2>
					<div className="mt-6">
						<Link
							className="bg-secondary transition-all hover:bg-red-500 hover:rounded rounded-md py-4 px-5"
							href={primary.cta_url}
						>
							{primary.cta_text}
						</Link>
					</div>
				</div>
			</div>
			<svg viewBox="0 1 1440 156" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M0 0.388672H1440V0.388672C1440 0.389507 1440 0.39021 1440 0.390306L111.562 155.016C52.1528 161.931 0 115.497 0 55.6867V0.388672Z"
					fill="#4A5781"
				/>
			</svg>
		</div>
	);
};

export default Hero;
