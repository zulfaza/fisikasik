import React from 'react';
import { ImageType, SliceType } from '@core/prismic/client';
import Link from '@components/_shared/Link';
import { RichText, RichTextBlock } from 'prismic-reactjs';

interface Props {
	slice: SliceType;
}

type wisatasType = {
	background: ImageType;
	title: RichTextBlock[];
	url: string;
};

const WisataList = ({ slice }: Props): JSX.Element => {
	const wisatas: wisatasType[] = slice.items;

	return (
		<section className="container mx-auto my-10 w-full max-w-6xl">
			{wisatas.map((wisata, index) => {
				return (
					<div
						key={index}
						className="overflow-hidden h-64 first:rounded-t-xl last:rounded-b-xl"
						style={{
							background: `url(${wisata.background.url})`,
							backgroundRepeat: 'no-repeat',
							backgroundAttachment: 'fixed',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					>
						<Link href={wisata.url} className="full">
							<div className="relative flex-cc z-20 w-full h-full">
								<h2
									className="text-4xl font-bold text-white uppercase drop-shadow-xl md:text-6xl"
									style={{ textShadow: '0 0 32px #0005' }}
								>
									{RichText.asText(wisata.title)}
								</h2>
							</div>
						</Link>
					</div>
				);
			})}
		</section>
	);
};

export default WisataList;
