import React from 'react';
import { SliceType } from '@core/prismic/client';

interface Props {
	slice: SliceType;
}

const Separator = ({ slice }: Props): JSX.Element => {
	return (
		<section className="my-10 bg-white w-full">
			<div className="container">
				<div className="bg-[#CACACA] h-0.5 relative before:bg-flower before:absolute before:left-1/2 before:-bottom-10 before:w-20 before:h-20 before:bg-no-repeat before:z-10 after:bg-white after:w-32 after:h-20 after:absolute after:-ml-6 after:left-1/2 after:-bottom-10 before:bg-contain" />
			</div>
		</section>
	);
};

export default Separator;
