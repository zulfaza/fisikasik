import { useAuth } from '@core/contexts/firebase/AuthContext';
import { PopupTypeTimestampChanged } from '@pages/video/[slug]';
import axios from 'axios';
import { RichText } from 'prismic-reactjs';
import React, { useState } from 'react';

interface Props {
	popupData: PopupTypeTimestampChanged | null;
	setPopup: (arg0: any) => void;
	setPopups: (arg0: any) => void;
	setPlaying: (arg0: any | ((prev: any) => any)) => void;
}

const OverlayPopup = ({ popupData, setPopup, setPopups, setPlaying }: Props) => {
	const { currentUser } = useAuth();
	const [IsLoading, setIsLoading] = useState(false);

	if (!popupData) return <></>;

	const SetContinue = () => {
		setPopups((prev: any) => {
			const newValue = prev.map((data) => {
				if (data.popupId === popupData.popupId) data.loaded = true;
				return data;
			});
			return newValue;
		});
		setPopup(null);
		setPlaying(true);
	};

	const handleSelectOption = async (optvalue: string, popup = popupData) => {
		setIsLoading(true);
		const data = {
			materiId: popup.materiId,
			videoId: popup.videoId,
			popupId: popup.popupId,
			value: optvalue,
			uid: currentUser.uid,
			title: RichText.asText(popup.title),
			timestamp: popup.timestampSecond,
		};

		return axios
			.post('/api/submit-popup-value', data)
			.then(() => {
				// console.log(res);
				SetContinue();
			})
			.catch((err) => {
				// console.log(err.response);
				if (err.response.status) {
					SetContinue();
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div className="fixed z-50 top-0 left-0 h-screen w-screen flex-cc bg-black bg-opacity-40">
			<div className="w-full max-w-md bg-white rounded-lg p-5">
				<h3 className="font-bold text-center text-black">
					{RichText.asText(popupData.questions)}
				</h3>
				<div className="flex-cc flex-col mt-5">
					{popupData.options.map((option) => (
						<button
							disabled={IsLoading}
							onClick={() => handleSelectOption(option.value)}
							key={option.value}
							className="bg-primary disabled:opacity-50 hover:bg-opacity-90 transition-colors w-full text-white text-center rounded-lg p-3 mb-2"
						>
							{option.label}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default OverlayPopup;
