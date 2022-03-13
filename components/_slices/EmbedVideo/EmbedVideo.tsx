import { SliceType } from '@core/prismic/client';
import React from 'react';
import ReactPlayer from 'react-player';

const EmbedVideo = ({ slice }: { slice: SliceType }) => {
	const primary: {
		video_url: string;
	} = slice.primary;

	return (
		<div className="w-full max-w-6xl">
			<ReactPlayer controls={true} url={primary.video_url} width="100%" height={'720px'} />
		</div>
	);
};

export default EmbedVideo;
