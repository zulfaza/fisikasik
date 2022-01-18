import React from 'react';
import { Image, SliceType } from '@core/prismic/client';
import Link from '@components/_shared/Link';
import { ArrowIcon } from '@pages/artikel';
import { RichText, RichTextBlock } from 'prismic-reactjs';

interface Props {
	slice: SliceType;
}

const HomeGunungBismo = ({ slice }: Props): JSX.Element => {
	const primary: {
		cta_text: string;
		cta_url: string;
		image: Image;
		quotes: RichTextBlock[];
		title: RichTextBlock[];
	} = slice.primary;

	return (
		<section className="bg-white w-full shadow-md">
			<div className="container flex-col lg:flex-row flex-cc py-10">
				<img className="md:mr-10 flex-grow-0" src="/images/gn-bismo.png" alt="asdfasf" />
				<div className="h-72 flex flex-col justify-between flex-shrink-0">
					<div className="text-4xl text-black">{RichText.render(primary.title)}</div>
					<div className="italic text-3xl max-w-[305px]">
						{RichText.render(primary.quotes)}
					</div>
					<div>
						<Link
							href={primary.cta_url}
							className="bg-black hover:bg-gray-900 text-white group py-3 px-8 rounded-lg flex w-full sm:w-max items-center"
						>
							{primary.cta_text}
							<ArrowIcon className="transform group-hover:translate-x-2 translate-x-3 transition-transform" />
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeGunungBismo;
