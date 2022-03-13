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
			<div className={`container simple-title text-${primary.text_align}`}>
				{RichText.render(primary.title)}
			</div>
		</div>
	);
};

export default SimpleTitle;
