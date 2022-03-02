import DynamicLayout from '@components/_layouts/DynamicLayout';
import OverlayLoading from '@components/_shared/OverlayLoading';
import OverlayPopup from '@components/_shared/OverlayPopup';
import UserOnlyRoute from '@core/customRoute/UserOnlyRoute';
import {
	LayoutContentType,
	PopupType,
	queryLayout,
	queryVideoBySlug,
	VideoDoc,
} from '@core/prismic/client';
import axios from 'axios';
import { GetServerSidePropsResult } from 'next';
import { RichText } from 'prismic-reactjs';
import React, { useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { useAuth } from '@core/contexts/firebase/AuthContext';
import Link from 'next/link';

export interface PopupTypeTimestampChanged extends PopupType {
	timestampSecond: number;
	loaded: boolean;
	popupId: string;
	materiId: string;
	videoId: string;
}

const Video = ({ videoDoc, layout_content }: serverProps) => {
	const content = useMemo(() => videoDoc.data, [videoDoc]);
	const { currentUser } = useAuth();
	const [Played, setPlayed] = useState(0);
	const [Seeking, setSeeking] = useState(false);
	const [Player, setPlayer] = useState<any>(null);
	const [IsLoading, setIsLoading] = useState(true);
	const [Popups, setPopups] = useState<PopupTypeTimestampChanged[]>([]);
	const [Duration, setDuration] = useState<number>(0);
	const [Playing, setPlaying] = useState(false);
	const [CurrentPopUp, setCurrentPopUp] = useState<PopupTypeTimestampChanged>(null);
	const [ShowNext, setShowNext] = useState(false);
	const [NextUrl, setNextUrl] = useState('/');

	useEffect(() => {
		const data: {
			materiId: string;
			videoId: string;
			uid: string;
			isLastVideo?: boolean;
		} = {
			materiId: content.materi.id,
			videoId: videoDoc.id,
			uid: currentUser.uid,
		};
		if (content.next_video.uid) {
			switch (content.next_video.type) {
				case 'pages':
					setNextUrl(`/${content.next_video.uid}`);
					data.isLastVideo = true;
					break;
				default:
					setNextUrl(`/video/${content.next_video.uid}`);
					break;
			}
		}
		axios.post('/api/add-last-video', data).then(() => {
			console.log('Sukses update history');
		});
	}, []);

	useEffect(() => {
		async function GetPopUp() {
			const { popup_group } = content;
			const promises = [];

			popup_group.forEach((item) => {
				promises.push(axios.post('/api/prismic/get-by-id', { id: item.popup.id }));
			});

			const videoDocument = await axios.post('/api/prismic/get-by-id', { id: videoDoc.id });

			const videoId = videoDoc.id;
			const materiId = videoDocument.data.materi.id;
			const answeredPopups: string[] = await axios
				.post('/api/get-popup', {
					materiId,
					videoId,
					uid: currentUser.uid,
				})
				.then((res) => res?.data?.popups);

			const popups: PopupTypeTimestampChanged[] = [];

			const result = await Promise.all(promises);

			result.forEach((item: { data: PopupType }, index) => {
				const popupId = popup_group[index].popup.id;
				let timestampinSecond = 0;

				item.data.timestamp
					.split(':')
					.reverse()
					.forEach((time, index) => {
						timestampinSecond += parseInt(time) * Math.pow(60, index);
					});

				popups.push({
					...item.data,
					timestampSecond: timestampinSecond,
					loaded: answeredPopups.includes(popupId),
					popupId,
					videoId: videoDoc.id,
					materiId: content.materi.id,
				});
			});
			setPopups(popups);
			setIsLoading(false);
		}
		GetPopUp();
	}, [content]);

	function onProgress(data: {
		loaded: number;
		loadedSeconds: number;
		played: number;
		playedSeconds: number;
	}) {
		const selectedPopup = Popups.filter(
			(popup) => popup.timestampSecond < data.playedSeconds && !popup.loaded
		).sort((a, b) => a.timestampSecond - b.timestampSecond);

		if (selectedPopup.length > 0) {
			setCurrentPopUp(selectedPopup[0]);
			setPlaying(false);
		}

		if (Duration * (1 - data.played) < 10) setShowNext(true);

		if (!Seeking) setPlayed(data.played);
	}

	const handleSeekMouseDown = () => {
		setSeeking(true);
	};

	const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPlayed(parseFloat(e.target.value));
	};

	const handleSeekMouseUp = (e: any) => {
		setSeeking(false);
		Player.seekTo(parseFloat(e.target.value));
	};

	return (
		<UserOnlyRoute>
			<DynamicLayout content={layout_content} title={RichText.asText(content.title)}>
				<OverlayLoading loading={IsLoading} />
				<OverlayPopup
					setPopups={setPopups}
					setPlaying={setPlaying}
					popupData={CurrentPopUp}
					setPopup={setCurrentPopUp}
				/>
				<div className="w-full my-5">
					<div className="container">
						<h1 className="text-left my-20 font-bold text-4xl text-black">
							{RichText.asText(content.title)}
						</h1>
						<div>
							{Played && <span>{Played * Duration}</span>}
							<input
								type="range"
								min={0}
								max={0.999999}
								step="any"
								value={Played}
								onMouseDown={handleSeekMouseDown}
								onChange={handleSeekChange}
								onMouseUp={handleSeekMouseUp}
							/>
							<ReactPlayer
								controls={true}
								playing={Playing}
								onPlay={() => setPlaying(true)}
								onPause={() => setPlaying(false)}
								ref={(c) => setPlayer(c)}
								onProgress={onProgress}
								onDuration={(d) => setDuration(d)}
								url={content.video_url}
								width="100%"
								height="720px"
							/>
						</div>
						<div className="my-10">
							{ShowNext && (
								<Link href={NextUrl}>
									<a className="bg-primary px-5 py-3 rounded text-white">Next</a>
								</Link>
							)}
						</div>
					</div>
				</div>
			</DynamicLayout>
		</UserOnlyRoute>
	);
};

export interface serverProps {
	videoDoc: VideoDoc;
	layout_content: LayoutContentType;
}

export const getServerSideProps = async (
	context
): Promise<GetServerSidePropsResult<serverProps>> => {
	const props: serverProps = {
		videoDoc: null,
		layout_content: null,
	};
	const { slug }: { slug: string } = context.params;
	props.videoDoc = await queryVideoBySlug(slug);

	if (!props.videoDoc) return { notFound: true };

	props.layout_content = await queryLayout('dashboard-layout');

	return {
		props,
	};
};

export default Video;
