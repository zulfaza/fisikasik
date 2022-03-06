import Link from '@components/_shared/Link';
import { SliceType } from '@core/prismic/client';
import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';

const Annountment = ({ slice }: { slice: SliceType }) => {
	const primary: {
		cta_text: string;
		cta_url: string;
		description: RichTextBlock[];
		title: RichTextBlock[];
	} = slice.primary;

	return (
		<div className="md:max-w-md w-full mb-6 border-4 border-primary rounded-xl">
			<div className="border-b border-primary">
				<div className="px-3 py-2 text-2xl font-semibold">
					{RichText.asText(primary.title)}
				</div>
			</div>
			<div className="p-3">
				{RichText.render(primary.description)}
				{primary.cta_url && primary.cta_text && (
					<div className="mt-2">
						<Link
							className="px-4 py-1 hover:bg-blue-900 bg-primary text-white rounded-md"
							href={primary.cta_url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{primary.cta_text}
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Annountment;
