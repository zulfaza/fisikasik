import { Image, SliceType } from '@core/prismic/client';
import React from 'react';
import Flickity from 'react-flickity-component';
import parse from 'html-react-parser';
import { RichText } from 'prismic-reactjs';
interface Props {
	slice: SliceType;
}

const HomeCarousel = ({ slice }: Props): JSX.Element => {
	const items = slice.items;

	return (
		<section className="bg-white w-full py-16">
			<div>
				<Flickity
					className={' focus:outline-none overflow-hidden'}
					options={{
						pageDots: false,
						adaptiveHeight: true,
						freeScroll: false,
						prevNextButtons: false,
					}}
				>
					{items.map(
						(item: { embed: string | null; image: Image | null }, index: number) => {
							if (item.embed)
								return (
									<div
										key={index}
										className=" px-2 md:w-max w-full md:h-[530px] text-white cursor-pointer"
									>
										{parse(item.embed)}
									</div>
								);

							return (
								<div
									key={index}
									className=" px-2 md:w-max w-full md:h-[530px] text-white cursor-pointer"
								>
									<img
										className="w-full h-full object-cover rounded-xl overflow-hidden"
										src={item.image.url}
										alt={item.image.alt}
									/>
								</div>
							);
						}
					)}
				</Flickity>
			</div>
			<div className="container flex-cc mt-10">
				<div className="text-center text-2xl max-w-[845px]">
					{RichText.render(slice.primary.desc)}
				</div>
			</div>
		</section>
	);
};

export default HomeCarousel;