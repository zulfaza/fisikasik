import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';

interface Props {
	slice: SliceType;
}

const SimpleHeading = ({ slice }: Props): JSX.Element => {
	const title: RichTextBlock[] = slice.primary.title;
	return (
		<section className="my-10 bg-white w-full">
			<div className="container">
				<h2 className="text-center font-bold text-4xl text-black">
					{RichText.asText(title)}
				</h2>
			</div>
		</section>
	);
};

export default SimpleHeading;
