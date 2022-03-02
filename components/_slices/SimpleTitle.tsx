import { SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';

const SimpleTitle = ({ slice }: { slice: SliceType }) => {
	const primary: {
		text_align: string;
		title: RichTextBlock[];
	} = slice.primary;

	return (
		<div className="w-full mt-10 mb-5">
			<div className="container">
				<h1 className={`text-${primary.text_align} font-bold text-4xl text-black`}>
					{RichText.asText(primary.title)}
				</h1>
			</div>
		</div>
	);
};

export default SimpleTitle;
