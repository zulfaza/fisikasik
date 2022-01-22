import React from 'react';
import { ImageType, SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';

interface Props {
	slice: SliceType;
}

const Image = ({ slice }: Props): JSX.Element => {
	const image: ImageType = slice.primary.body1;
	const description = slice.primary.description;
	return (
		<div className="flex-cc mb-10">
			<div>
				<img src={image.url} alt={image.alt} />
				<p className="text-xs md:text-sm my-3 text-[#6C6C6C]">
					{RichText.asText(description)}
				</p>
			</div>
		</div>
	);
};

export default Image;
