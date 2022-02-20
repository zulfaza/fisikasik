import { ImageType, SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';
const Developer = ({ slice }: { slice: SliceType }) => {
	const primary: {
		description: RichTextBlock[];
		title: RichTextBlock[];
		id: string;
	} = slice.primary;

	return (
		<section className="w-full my-5">
			<div className="container w-full flex-ss flex-col">
				<h2
					id={primary?.id?.length > 0 ? primary.id : null}
					className="font-bold text-4xl mb-5 text-primary-text"
				>
					{RichText.asText(primary.title)}
				</h2>
				<div className=" max-w-2xl w-full">{RichText.render(primary.description)}</div>
			</div>
			<div className="container flex flex-col md:flex-row justify-center items-center md:justify-evenly my-5 gap-10">
				{slice.items.map(
					(
						item: {
							github: string | null;
							instagram: string | null;
							linkedin: string | null;
							name: RichTextBlock[];
							photo: ImageType;
							title: RichTextBlock[];
							youtube: string | null;
						},
						index: number
					) => (
						<div key={index} className="mr-5 rounded-2xl overflow-hidden shadow-lg">
							<div>
								<img
									className="h-[231px] object-cover w-[238px] overflow-hidden"
									src={item.photo.url}
									alt={item.photo.alt}
								/>
							</div>
							<div className="bg-white py-5 px-3 flex-cc flex-col">
								<div className="flex-cc flex-col h-full">
									<h4 className="text-primary-text font-bold">
										{RichText.asText(item.name)}
									</h4>
									<h5 className="text-sm">{RichText.asText(item.title)}</h5>
								</div>
								<div className="mt-3 flex">
									{item.github && (
										<a
											href={item.github}
											target="_blank"
											rel="noopener noreferrer"
										>
											<AiFillGithub className="text-secondary text-2xl" />
										</a>
									)}
									{item.instagram && (
										<a
											href={item.instagram}
											target="_blank"
											rel="noopener noreferrer"
										>
											<AiFillInstagram className="text-secondary text-2xl" />
										</a>
									)}
									{item.linkedin && (
										<a
											href={item.linkedin}
											target="_blank"
											rel="noopener noreferrer"
										>
											<AiFillLinkedin className="text-secondary text-2xl" />
										</a>
									)}
									{item.youtube && (
										<a
											href={item.youtube}
											target="_blank"
											rel="noopener noreferrer"
										>
											<AiFillYoutube className="text-secondary text-2xl" />
										</a>
									)}
								</div>
							</div>
						</div>
					)
				)}
			</div>
		</section>
	);
};

export default Developer;
