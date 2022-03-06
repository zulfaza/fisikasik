import React from 'react';
import { BsFillVolumeDownFill, BsFillVolumeOffFill, BsFillVolumeUpFill } from 'react-icons/bs';

const DynamicVolumeIcon = ({ volume }: { volume: number }) => {
	if (volume > 0.75) return <BsFillVolumeUpFill />;
	else if (volume > 0.25) return <BsFillVolumeDownFill />;
	else return <BsFillVolumeOffFill />;
};

export default DynamicVolumeIcon;
