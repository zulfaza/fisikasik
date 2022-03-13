import { ImageType, SliceType } from '@core/prismic/client';
import React from 'react';

const Image = ({ slice }: { slice: SliceType }) => {
	const primary: {
		content: ImageType;
	} = slice.primary;

	return (
		<>
			<img
				className="w-full h-auto max-w-5xl"
				src={primary.content.url}
				alt={primary.content.alt}
			/>
		</>
	);
};

export default Image;
