import { SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';

const About = ({ slice }: { slice: SliceType }) => {
	const primary: {
		content: RichTextBlock[];
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
				<div className=" max-w-2xl w-full">{RichText.render(primary.content)}</div>
			</div>
		</section>
	);
};

export default About;
