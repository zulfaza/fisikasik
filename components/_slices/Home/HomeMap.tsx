import React from 'react';
import { ImageType, SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';

interface Props {
	slice: SliceType;
}

const HomeMap = ({ slice }: Props): JSX.Element => {
	const primary: {
		coordinat: RichTextBlock[];
		desc: RichTextBlock[];
		image: ImageType;
	} = slice.primary;

	return (
		<section className="bg-topografi-pattern w-full overflow-hidden relative">
			<img
				className=" absolute -bottom-40 hidden md:block right-0 max-w-[444px]"
				src="/images/flora-bottom-right.svg"
				alt="flora"
			/>
			<div className="container max-w-5xl items-center flex-col md:flex-row flex py-10">
				<div className="relative">
					<img src={primary.image.url} alt={primary.image.alt} />
					<span className="text-[#A8A8A8] text-3xl md:text-6xl absolute left-0 bottom-0 whitespace-nowrap">
						{RichText.asText(primary.coordinat)}
					</span>
				</div>
				<div>
					<div className="max-w-[505px] text-2xl">{RichText.render(primary.desc)}</div>
				</div>
			</div>
		</section>
	);
};

export default HomeMap;
