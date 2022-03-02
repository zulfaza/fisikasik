import { SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';

const Paragraph = ({ slice }: { slice: SliceType }) => {
	const primary: {
		content: RichTextBlock[];
	} = slice.primary;
	return (
		<div className="w-full my-5">
			<div className="container text-black">{RichText.render(primary.content)}</div>
		</div>
	);
};

export default Paragraph;
