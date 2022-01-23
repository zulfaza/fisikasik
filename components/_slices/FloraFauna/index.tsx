import React from 'react';
import { ImageType, SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';

interface Props {
	slice: SliceType;
}

const FloraFauna = ({ slice }: Props): JSX.Element => {
	const primary: {
		position: string;
		image: ImageType;
		title: RichTextBlock[];
		desc: RichTextBlock[];
	} = slice.primary;

	return (
		<section className="my-10 bg-white w-full">
			<div className="container">
				<div
					className={`flex flex-col ${
						primary.position === 'Left' ? 'md:flex-row' : 'md:flex-row-reverse'
					}`}
				>
					<div
						className={`flex-shrink-0 flex-cc mb-10 md:mb-0 ${
							primary.position === 'Left' ? 'md:mr-10' : 'md:ml-10'
						}`}
					>
						<img
							className="max-w-[288px] max-h-72 overflow-hidden rounded-full object-cover w-full h-full"
							src={primary.image.url}
							alt={primary.image.alt}
						/>
					</div>
					<div>
						<div>
							<h3 className="font-bold mb-5 text-black text-4xl">
								{RichText.asText(primary.title)}
							</h3>
						</div>
						<div className="text-black">{RichText.render(primary.desc)}</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FloraFauna;
