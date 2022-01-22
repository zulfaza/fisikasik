import React from 'react';
import { ImageType, SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';

interface Props {
	slice: SliceType;
}

const SimpleParagraph = ({ slice }: Props): JSX.Element => {
	const primary: {
		body1: RichTextBlock[];
		title: RichTextBlock[];
		image: ImageType;
		type: string;
	} = slice.primary;
	const type = primary.type;
	return (
		<section className="my-3 bg-white w-full">
			<div className="container">
				<div
					className={` ${
						type === 'Left'
							? 'flex-col-reverse md:flex-row'
							: 'flex-col-reverse md:flex-row-reverse'
					} flex items-center max-w-4xl mx-auto my-10`}
				>
					<div className={type === 'Left' ? 'md:mr-20' : 'md:ml-20'}>
						<h2 className="font-bold text-4xl text-black mb-5">
							{RichText.asText(primary.title)}
						</h2>
						{RichText.render(primary.body1)}
					</div>
					<img
						className="mb-10 md:mb-0"
						src={primary.image.url}
						alt={primary.image.alt}
					/>
				</div>
			</div>
		</section>
	);
};

export default SimpleParagraph;
