import { SliceType } from '@core/prismic/client';
import Link from 'next/link';
import React from 'react';

const SimpleButton = ({ slice }: { slice: SliceType }) => {
	const primary: {
		cta_text: string;
		cta_url: string;
		position: string;
	} = slice.primary;

	return (
		<div className="w-full my-5">
			<div className={`container text-${primary.position}`}>
				<Link href={primary.cta_url}>
					<a className="bg-primary px-5 py-3 hover:bg-opacity-80 rounded-md text-white">
						{primary.cta_text}
					</a>
				</Link>
			</div>
		</div>
	);
};

export default SimpleButton;
