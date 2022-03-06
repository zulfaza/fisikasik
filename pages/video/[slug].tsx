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
import React, { useEffect, useMemo, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useAuth } from '@core/contexts/firebase/AuthContext';
import {
	BsFillPlayFill,
	BsFillStopFill,
	BsFillVolumeMuteFill,
	BsFullscreen,
	BsFullscreenExit,
} from 'react-icons/bs';
import DynamicVolumeIcon from '@components/_shared/DynamicVolumeIcon';

export interface PopupTypeTimestampChanged extends PopupType {
	timestampSecond: number;
	loaded: boolean;
	popupId: string;
	materiId: string;
	videoId: string;
}

const Video = ({ videoDoc, layout_content }: serverProps) => {
	const content = useMemo(() => videoDoc.data, [videoDoc]);
	const { currentUser, IsAdmin } = useAuth();
	const [Played, setPlayed] = useState(0);
	const [MaxPlayed, setMaxPlayed] = useState(0);
	const [Seeking, setSeeking] = useState(false);
	const [Player, setPlayer] = useState<any>(null);
	const [IsLoading, setIsLoading] = useState(true);
	const [Popups, setPopups] = useState<PopupTypeTimestampChanged[]>([]);
	const [Duration, setDuration] = useState<number>(0);
	const [Playing, setPlaying] = useState(false);
	const [CurrentPopUp, setCurrentPopUp] = useState<PopupTypeTimestampChanged>(null);
	const [ShowNext, setShowNext] = useState(false);
	const [NextUrl, setNextUrl] = useState('/');
	const [IsFinished, setIsFinished] = useState(false);
	const [Volume, setVolume] = useState(0.5);
	const [Muted, setMuted] = useState(false);
	const [Fullscreen, setFullscreen] = useState(false);
	const PlayerWrapperRef = useRef(null);

	useEffect(() => {
		if (currentUser) {
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
			axios.post('/api/firebase/get-materi', data).then((apiResult) => {
				const materi = apiResult.data?.data?.data?.materi ?? {};
				if (materi.isSubmitKuis) setIsFinished(true);
			});
		}
	}, []);

	useEffect(() => {
		function ResetState() {
			setIsLoading(true);
			setShowNext(false);
			if (content.next_video.uid) {
				switch (content.next_video.type) {
					case 'pages':
						setNextUrl(`/${content.next_video.uid}`);
						break;
					default:
						setNextUrl(`/video/${content.next_video.uid}`);
						break;
				}
			}
		}

		ResetState();
	}, [content]);

	useEffect(() => {
		async function GetPopUp() {
			if (!currentUser) return;
			const { popup_group } = content;
			const promises = [];

			popup_group.forEach((item) => {
				promises.push(
					axios
						.post('/api/prismic/get-by-id', { id: item.popup.id })
						.then((res) => res.data.data)
				);
			});

			const videoDocument = await axios
				.post('/api/prismic/get-by-id', { id: videoDoc.id })
				.then((res) => res.data.data);

			const videoId = videoDoc.id;
			const materiId = videoDocument.materi.id;
			const answeredPopups: string[] = await axios
				.post('/api/get-popup', {
					materiId,
					videoId,
					uid: currentUser.uid,
				})
				.then((res) => res?.data?.popups);

			const popups: PopupTypeTimestampChanged[] = [];

			const result = await Promise.all(promises);

			result.forEach((item: PopupType, index) => {
				const popupId = popup_group[index].popup.id;
				let timestampinSecond = 0;

				item.timestamp
					.split(':')
					.reverse()
					.forEach((time, index) => {
						timestampinSecond += parseInt(time) * Math.pow(60, index);
					});

				popups.push({
					...item,
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

		if (!Seeking && data.played > MaxPlayed) setMaxPlayed(data.played);
	}

	const handleSeekMouseDown = () => {
		setSeeking(true);
	};

	const handleSeekMouseUp = (e: any) => {
		setSeeking(false);
		const value = e.target.valueAsNumber;

		if (value < MaxPlayed || IsAdmin) {
			Player.seekTo(parseFloat(value));
			setPlayed(parseFloat(e.target.value));
		}
	};

	function formatSeconds(second: number) {
		const secondInString = second.toString();
		const secondToInt = parseInt(secondInString);
		if (secondToInt < 3600) return new Date(secondToInt * 1000).toISOString().substr(14, 5);
		return new Date(secondToInt * 1000).toISOString().substr(11, 8);
	}

	const handleVolumeChange = (e: any) => {
		setVolume(e.target.value);
	};

	function handleFullScreen() {
		const doc: any = window.document;
		const docEl = PlayerWrapperRef.current.requestFullscreen();

		const requestFullScreen =
			docEl.requestFullscreen ||
			docEl.mozRequestFullScreen ||
			docEl.webkitRequestFullScreen ||
			docEl.msRequestFullscreen;
		const cancelFullScreen =
			doc.exitFullscreen ||
			doc.mozCancelFullScreen ||
			doc.webkitExitFullscreen ||
			doc.msExitFullscreen;

		if (
			!doc.fullscreenElement &&
			!doc.mozFullScreenElement &&
			!doc.webkitFullscreenElement &&
			!doc.msFullscreenElement
		) {
			requestFullScreen?.call(docEl);
			setFullscreen(true);
		} else {
			cancelFullScreen.call(doc);
			setFullscreen(false);
		}
	}

	return (
		<UserOnlyRoute>
			<DynamicLayout content={layout_content} title={RichText.asText(content.title)}>
				<OverlayLoading loading={IsLoading} />
				<div className="w-full my-5">
					<div className="container">
						<h1 className="text-left my-20 font-bold text-4xl text-black">
							{RichText.asText(content.title)}
						</h1>
						<div ref={PlayerWrapperRef} className=" overflow-hidden relative group">
							<OverlayPopup
								setPopups={setPopups}
								setPlaying={setPlaying}
								popupData={CurrentPopUp}
								setPopup={setCurrentPopUp}
							/>
							<ReactPlayer
								controls={false}
								playing={Playing}
								onPlay={() => setPlaying(true)}
								onPause={() => setPlaying(false)}
								ref={(c) => setPlayer(c)}
								onProgress={onProgress}
								onDuration={(d) => setDuration(d)}
								url={content.video_url}
								width="100%"
								height={Fullscreen ? '100%' : '720px'}
								muted={Muted}
								volume={Volume}
								config={{
									youtube: {
										playerVars: {
											fs: 0,
											rel: 0,
										},
									},
								}}
							/>
							<div className="flex flex-col w-full absolute bottom-0 lg:-bottom-full group-hover:bottom-0 transition-all p-5 bg-black bg-opacity-50">
								<input
									type="range"
									min={0}
									max={0.999999}
									step="any"
									value={Played}
									onMouseDown={handleSeekMouseDown}
									onChange={handleSeekMouseUp}
									onMouseUp={handleSeekMouseUp}
								/>
								<div className="flex flex-col md:flex-row justify-between">
									<div className="flex items-center">
										<button
											className="text-white text-2xl"
											onClick={() => setPlaying((prev) => !prev)}
										>
											{Playing ? <BsFillStopFill /> : <BsFillPlayFill />}
										</button>
										<div className="flex items-center ml-5">
											<button
												onClick={() => setMuted((prev) => !prev)}
												className="text-2xl text-white"
											>
												{Muted ? (
													<BsFillVolumeMuteFill />
												) : (
													<DynamicVolumeIcon volume={Volume} />
												)}
											</button>
											<input
												type="range"
												min={0}
												max={1}
												step="any"
												value={Volume}
												onChange={handleVolumeChange}
											/>
										</div>
									</div>
									<div className="flex items-center">
										<div className="mr-5">
											<span className="text-white">
												{formatSeconds(Played * Duration)}
											</span>
											<span className="mx-2 text-white">/</span>
											<span className="text-white">
												{formatSeconds(Duration)}
											</span>
										</div>
										<button
											onClick={handleFullScreen}
											className="text-white text-2xl"
										>
											{Fullscreen ? <BsFullscreenExit /> : <BsFullscreen />}
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="my-10">
							<div
								className={`w-full flex ${
									IsFinished ? 'justify-between' : 'justify-end'
								}`}
							>
								{IsFinished && (
									<a
										href={`/materi/${content.materi.uid}`}
										className="bg-primary px-5 py-3 rounded text-white"
									>
										Prev
									</a>
								)}
								{ShowNext && (
									<a
										href={NextUrl}
										className="bg-primary px-5 py-3 rounded text-white"
									>
										Next
									</a>
								)}
							</div>
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
