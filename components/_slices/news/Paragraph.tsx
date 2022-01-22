import React from 'react';
import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';

interface Props {
	slice: SliceType;
}

const Paragraph = ({ slice }: Props): JSX.Element => {
	return (
		<div className="paragraph max-w-3xl mx-auto">{RichText.render(slice.primary.body1)}</div>
	);
};

export default Paragraph;
